from honu.game import Game, Tile, Player, Flag
from honu.honu import Honu
# k = Game([[Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY],
#           [Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY,Tile.EMPTY]],
#           Player((0,0)),
#           [Flag(Position(2,2))])

# k.down()
# k.down()
# k.right()
# k.write_below(Tile.PURPLE)

# k.debug_print()

honu = Honu(enable_display=True,game_width=15,game_height=15)
h = honu.create_game()
h.write_below(Tile.RED)
h.right()
h.right()
h.write_below(Tile.YELLOW)
h.down()
h.down()
h.debug_print()

# k2 = create_game()
# k2.write_below(Tile.RED)
# k2.right()
# k2.right()
# k2.write_below(Tile.YELLOW)
# k2.down()
# k2.down()
# k2.debug_print()