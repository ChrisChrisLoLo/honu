import argparse
import importlib
import sys
import os
from honu import HonuTest


def honutest():
    parser = argparse.ArgumentParser(
        description='Test Honu code for a given level.')

    parser.add_argument('level', metavar='level', type=str,
                        help='The level to run the code on, either a number or a filename')

    parser.add_argument('code', metavar='code', type=str,
                        help='The Honu code python file to run')

    args = parser.parse_args()
    print(args.level)
    if args.level.isdigit():
        # do the thing
        level_path = "/home/chriz/Documents/kameCodePython/src/honu/static/levels/0.json"
    else:
        level_path = ""
    
    import_name = prepare_import(args.code)

    __import__(import_name)
    module = sys.modules[import_name]
    
    ht: HonuTest = find_best_honu_test(module)

    ht.path_to_test = level_path
    ht.run_test()
    # ht.load_tests_from_json
    print(dir(module))


    # spec = importlib.util.spec_from_file_location("honu_user_code", "/home/chriz/Documents/kameCodePython/src/testtests.py")
    # # spec = importlib.util.spec_from_file_location("honu_user_code", args.code)

    # module = importlib.util.module_from_spec(spec)
    # sys.modules["honu_user_code"] = module
    # # spec.loader.exec_module(module)
    # print(module.__package__)
    # print(dir(module))
    # honu_user_code = __import__('honu_user_code')
    # print(honu_user_code)
    # honu_user_code.s
    # print(module.__dict__.keys())
    # ht = module.run_code
    # print(ht)

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
        "Could not find a honu test instance in the file"
    )

if __name__ == '__main__':
    honutest()
