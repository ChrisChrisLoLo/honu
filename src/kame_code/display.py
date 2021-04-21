from graphics import GraphWin, Image
from math import floor
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from kame_code.game import Game

# Size of the sprites used in pixels
SPRITE_IMAGE_PX = 1

class Display():
    def __init__(self, game: 'Game', width=800,height=600) -> None:
        game.register_observer(self)
        self.width = width
        self.height = height
        self.win = GraphWin('Kame Code', width, height)
        self.game = Game

        # self.win.getMouse() # pause for click in window
        # self.win.close()
    # def open_window(self):
    def draw_frame(self) -> None:
        level_height = len(self.game.level)
        if level_height == 0:
            raise Exception('The level cannot be empty!')
        level_width = len(self.game.level[0])

        tile_scale = self.calc_tile_scale(level_height, level_width)
        tile_scale_px = tile_scale * SPRITE_IMAGE_PX
    
    """
    Calculates the scaling factor of the sprites
    """
    def calc_tile_scale(self, level_width:int, level_height:int) -> int:
        return max(1,
            floor(min(self.width/level_width,self.height/level_height)/SPRITE_IMAGE_PX)
        )    

    def update(self, observable_game: 'Game') -> None:
        pass
