from typing import Callable

from honu.game import Game, Tile, Player, Position, Direction, Flag
from honu.display import Display

# Base class
class Honu():
    """
    Factory

    The class that can be used to spin up a game instance, similar to that of the turtle library.
    Controls the construction of the game and the display.

    This class manages more than it should in an OOP context.
    The hope however, is to make a very simple API to work with that can be configured
    via parameters instead of through the construction of the classes within this library.
    """
    def __init__(self, enable_display: bool = True, game_width: int = 15, game_height:int = 15):
        self.enable_display = enable_display
        self.screen_height = 800
        self.screen_width = 600
        self.sleep_time = 0.2
        
        self.game_tiles = [[Tile.EMPTY for i in range(game_width)] for j in range(game_height)]  

        self.player_start_i = game_width//2
        self.player_start_j = game_width//2
        self.player_start_dir = Direction.SOUTH



    def create_game(self):
        # Load game
        game = Game(self.game_tiles,
            Player(self.player_start_dir, Position(self.player_start_i, self.player_start_j)),
            [])
        # Run Code
        if self.enable_display:
            display = Display(game, height=self.screen_height, width=self.screen_width, sleep_time=self.sleep_time)
        return game


class HonuTest():
    def __init__(self, enable_display:bool = False):
        self.enable_display = enable_display

    @staticmethod
    def run_test(code: Callable):
        # Load json
        # Load game
        # Run code
        # code(game)
        # Evaluate
        # assert(game)
        pass