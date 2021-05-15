from typing import List, Tuple, TYPE_CHECKING
from enum import Enum
from time import sleep

if TYPE_CHECKING:
    from honu.display import Display

# Used for postions
X = 0
Y = 1

class Direction(Enum):
    NORTH = "N"
    EAST = "E"
    SOUTH = "S"
    WEST = "W"


# used to calculate rotations
direction_array = [Direction.NORTH, Direction.EAST,
                   Direction.SOUTH, Direction.WEST]


class WinCondition(Enum):
    GET_ALL_FLAGS = 'get_all_flags'
    CALC_OUTPUT = 'calculate_output'
    MODIFY_BOARD = 'modify_board'


class Tile(Enum):
    EMPTY = 'grey'

    WHITE = 'white'
    BLACK = 'black'
    GREY = 'grey'
    RED = 'red'
    ORANGE = 'orange'
    YELLOW = 'yellow'
    GREEN = 'green'
    BLUE = 'blue'
    PURPLE = 'purple'
    BROWN = 'brown'

class Player():
    def __init__(self, dir: Direction, pos: Tuple[int,int]):
        self.dir = dir
        self.pos = pos


class Flag():
    def __init__(self, pos: Tuple[int,int]):
        self.pos = pos


class Game():
    def __init__(self, level: List[List[Tile]], player: Player, flags: List[Flag]):
        self.level = level
        self.width = len(level)
        self.height = len(level[0]) if len(level) > 0 else 0
        self.player = player
        self.flags = flags
        # Clear flags if present
        self.__remove_flags_if_below()
        self._observers: List['Display'] = []
        # Used by the user to output values
        self.output = None

    def debug_print(self):
        for row in self.level:
            tile_string = []
            for tile in row:
                tile_string.append(tile.value)
            print(tile_string)
        print(f'player: {self.player.pos[X]},{self.player.pos[Y]}')
        print(
            f'flags: {", ".join([",".join([str(flag.pos[X]), str(flag.pos[Y])]) for flag in self.flags])}')

    def __remove_flags_if_below(self) -> None:
        for flag in self.flags:
            if flag.pos[X] == self.player.pos[X] and flag.pos[Y] == self.player.pos[Y]:
                self.flags.remove(flag)

    def _add_observer(self, observer: 'Display') -> None:
        self._observers.append(observer)

    def update_display(self) -> None:
        for observer in self._observers:
            observer.update(self)

    def write_below(self, tile: Tile) -> None:
        self.level[self.player.pos[Y]][self.player.pos[X]] = tile
        self.update_display()

    def read_below(self) -> Tile:
        return self.level[self.player.pos[Y]][self.player.pos[X]]
    
    def get_pos(self) -> Tuple[int, int]:
        return self.player.pos

    def up(self) -> bool:
        if self.player.pos[Y] > 0:
            old_pos = self.player.pos
            self.player.pos = (old_pos[X], old_pos[Y]-1)
            self.__remove_flags_if_below()
            self.update_display()
            return True
        else:
            return False

    def down(self) -> bool:
        if self.player.pos[Y] < self.height-1:
            old_pos = self.player.pos
            self.player.pos = (old_pos[X], old_pos[Y]+1)
            self.__remove_flags_if_below()
            self.update_display()
            return True
        else:
            return False

    def left(self) -> bool:
        if self.player.pos[X] > 0:
            old_pos = self.player.pos
            self.player.pos = (old_pos[X]-1, old_pos[Y])
            self.__remove_flags_if_below()
            self.update_display()
            return True
        else:
            return False

    def right(self) -> bool:
        if self.player.pos[X] < self.width-1:
            old_pos = self.player.pos
            self.player.pos = (old_pos[X]+1, old_pos[Y])
            self.__remove_flags_if_below()
            self.update_display()
            return True
        else:
            return False
