from honu import HonuTest, Tile

ht = HonuTest(enable_display=True,level="1")

@ht.code
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