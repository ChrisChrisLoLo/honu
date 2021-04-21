from kame_code.game import Game, Tile, Player, Position, Direction, Flag
from kame_code.functions import create_game

# k = Game([[Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY]],
#           Player(Direction.EAST,Position(0,0)),
#           [Flag(Position(2,2))])

# k.down()
# k.down()
# k.right()
# k.write_below(Tile.PURPLE)

# k.debug_print()

create_game()