from honu.game import Game, Tile, Player, Position, Direction, Flag
from honu.honu import Honu
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

k = Honu.create_game()
k.write_below(Tile.RED)
k.right()
k.right()
k.write_below(Tile.YELLOW)
k.down()
k.down()
k.debug_print()

# k2 = create_game()
# k2.write_below(Tile.RED)
# k2.right()
# k2.right()
# k2.write_below(Tile.YELLOW)
# k2.down()
# k2.down()
# k2.debug_print()