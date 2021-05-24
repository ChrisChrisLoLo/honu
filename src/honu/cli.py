import pkg_resources
import sys
import os
import re

import click

from honu import HonuTest


@click.group()
def cli():
    pass


@cli.command()
@click.argument('code_file')
@click.option('-l','--level','level')
def test(level:str, code_file:str):
    """
    Level is optional, useful for overriding the file set in test files
    """

    ht: HonuTest = import_honu_test_from_file(code_file)

    # Override level to test
    if level:
        ht.level = level

    ht.run_test()

def import_honu_test_from_file(path: str) -> HonuTest:
    import_name = prepare_import(path)

    __import__(import_name)
    module = sys.modules[import_name]

    return find_best_honu_test(module)


def prepare_import(path: str) -> str:
    """Given a filename this will try to calculate the python path, add it
    to the search path and return the actual module name that is expected.
    Taken from the Flask repo
    """
    path = os.path.realpath(path)

    fname, ext = os.path.splitext(path)
    if ext == ".py":
        path = fname

    if os.path.basename(path) == "__init__":
        path = os.path.dirname(path)

    module_name = []

    # move up until outside package structure (no __init__.py)
    while True:
        path, name = os.path.split(path)
        module_name.append(name)

        if not os.path.exists(os.path.join(path, "__init__.py")):
            break

    if sys.path[0] != path:
        sys.path.insert(0, path)

    return ".".join(module_name[::-1])


def find_best_honu_test(module) -> HonuTest:
    """Given a module instance this tries to find the best possible
    application in the module or raises an exception.
    Taken from the Flask repo and modified
    """

    # Search for the most common names first.
    for attr_name in ("h", "ht", "honu"):
        game = getattr(module, attr_name, None)

        if isinstance(game, HonuTest):
            return game

    # Otherwise find the only object that is a Flask instance.
    matches = [v for v in module.__dict__.values() if isinstance(v, HonuTest)]

    if len(matches) == 1:
        return matches[0]
    elif len(matches) > 1:
        raise Exception(
            "Detected multiple honu test instances in module"
        )
    raise Exception(
        "Could not find a honu test instance in the file! Did you create a HonuTest() instance?"
    )
