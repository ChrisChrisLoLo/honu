from honu.honu import HonuTest
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

ht = HonuTest('/home/chriz/Documents/kameCodePython/scrap/level.json', enable_display=True)

@ht.test
def run_code(h):
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