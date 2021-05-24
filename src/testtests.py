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
  h.left()