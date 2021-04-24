from typing import Callable

from honu.game import Game, Tile, Player, Position, Direction, Flag
from honu.display import Display


class Honu():
    def __init__(self):
        self = self

    @staticmethod
    def create_game(enable_display: bool = True):
        # Load game
        # Run Code
        game = Game([[Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY],
                    [Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY, Tile.EMPTY]],
                    Player(Direction.SOUTH, Position(0, 0)),
                    [Flag(Position(2, 2))])
        if enable_display:
            display = Display(game, height=800, width=600, sleep_time=0.2)
        return game

    # @staticmethod
    # def run_test(path_to_json: str, enable_display: bool = False):
    #     pass
    @staticmethod
    def run_test(code: Callable):
        # Load json
        # Load game
        # Run code
        # code(game)
        # Evaluate
        # assert(game)
        pass
