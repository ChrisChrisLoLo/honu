from graphics import *
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from kame_code.game import Game

class Display():
    def __init__(self, observable_game: 'Game') -> None:
        observable_game.register_observer(self)

    def open_window(self):
        win = GraphWin('Face', 200, 150) # give title and dimensions


    def update(self, observable_game: 'Game') -> None:
        pass
    
