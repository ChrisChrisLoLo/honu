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
@click.argument('level')
@click.argument('code_file')
def test(level:str, code_file:str):
    level_json_path = get_numbered_level_path(
        level) if level.isdigit() else level

    ht: HonuTest = import_honu_test_from_file(code_file)

    ht.run_test(level_json_path)


def get_numbered_level_path(level_num: str):
    for file_name in pkg_resources.resource_listdir('honu.static.levels', ''):
        if is_valid_test_file(file_name, level_num):
            return pkg_resources.resource_filename('honu.static.levels', file_name)
    raise Exception(
        f'Level {level_num} does not exist! Is the honu package up to date?')

def is_valid_test_file(file_path:str, level_num: str) -> bool:
    file_re = re.compile(f'^{level_num}:[\w\-]+.json$')
    return file_re.match(file_path) is not None

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
