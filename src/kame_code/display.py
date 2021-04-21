from graphics import GraphWin, Rectangle, Point
from kame_code.game import Tile
from math import floor
from typing import List, Tuple, TYPE_CHECKING
from time import sleep

if TYPE_CHECKING:
    from kame_code.game import Game

# Size of the sprites used in pixels
SPRITE_IMAGE_PX = 1

class TileGraphic():
    def __init__(self,win,start_x,start_y,end_x,end_y,fill):
        self.fill = fill
        self.win = win
        self.rect = Rectangle(Point(start_x,start_y),Point(end_x,end_y))
        self.rect.setFill(fill)
        self.rect.draw(self.win)
    
    def set_fill(self,fill):
        self.fill = fill
        self.rect.setFill(fill)
class Display():
    def __init__(self, game: 'Game', width=800, height=600) -> None:
        game._add_observer(self)
        self.width = width
        self.height = height
        self.game = game

        self.level_height = len(self.game.level)
        if self.level_height == 0:
            raise Exception('The level cannot be empty!')
        self.level_width = len(self.game.level[0])

        self.tile_scale = self.calc_tile_scale()
        self.tile_size_px = self.tile_scale * SPRITE_IMAGE_PX

        self.level_offset_x, self.level_offset_y = self.calc_level_offset()

        self.win = GraphWin('Kame Code', width, height)

        self.tile_graphics = self.map_tiles_to_graphics()

    def calc_level_offset(self) -> Tuple[int, int]:
        y_offset = (self.height-self.level_height*self.tile_size_px)/2
        x_offset = (self.width-self.level_width*self.tile_size_px)/2
        return x_offset, y_offset

    def map_tiles_to_graphics(self) -> List[List[Rectangle]]:
        mapped_graphics: List[List[Rectangle]] = []
        for i, row in enumerate(self.game.level):
            mapped_row: List[Rectangle] = []
            for j, tile in enumerate(row):
                start_x = j*self.tile_size_px+self.level_offset_x
                start_y = i*self.tile_size_px+self.level_offset_y
                end_x = start_x + self.tile_size_px
                end_y = start_y + self.tile_size_px
                print(tile)
                fill = tile.value
                tile_graphic = TileGraphic(self.win, start_x, start_y, end_x,end_y, fill)
                mapped_row.append(tile_graphic)
            mapped_graphics.append(mapped_row)
        return mapped_graphics

    # def draw_frame(self) -> None:
    #     level_height = len(self.game.level)
    #     if level_height == 0:
    #         raise Exception('The level cannot be empty!')
    #     level_width = len(self.game.level[0])

    #     tile_scale = self.calc_tile_scale(level_height, level_width)
    #     tile_scale_px = tile_scale * SPRITE_IMAGE_PX

    def calc_tile_scale(self) -> int:
        """
        Calculates the scaling factor of the sprites
        """
        return max(1,
                   floor(min(self.width/self.level_width, self.height /
                         self.level_height)/SPRITE_IMAGE_PX)
                   )

    def update(self, observable_game: 'Game') -> None:
        for i in range(len(self.tile_graphics)):
            for j in range(len(self.tile_graphics[i])):
                tile: TileGraphic = self.tile_graphics[i][j]
                if tile.fill != observable_game.level[i][j].value:
                    tile.set_fill(observable_game.level[i][j].value)
