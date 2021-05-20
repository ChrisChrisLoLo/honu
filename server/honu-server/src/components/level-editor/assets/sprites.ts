import turtle from '../../../../../../src/honu/static/sprites/turtle.png'
import flag from '../../../../../../src/honu/static/sprites/flag.png'
import tileBlack from '../../../../../../src/honu/static/sprites/tile_black.png'
import tileBlue from '../../../../../../src/honu/static/sprites/tile_blue.png'
import tileEmpty from '../../../../../../src/honu/static/sprites/tile_empty.png'
import tileGreen from '../../../../../../src/honu/static/sprites/tile_green.png'
import tileGrey from '../../../../../../src/honu/static/sprites/tile_grey.png'
import tilePurple from '../../../../../../src/honu/static/sprites/tile_purple.png'
import tileRed from '../../../../../../src/honu/static/sprites/tile_red.png'
import tileWhite from '../../../../../../src/honu/static/sprites/tile_white.png'
import tileYellow from '../../../../../../src/honu/static/sprites/tile_yellow.png'
import tileOrange from '../../../../../../src/honu/static/sprites/tile_orange.png'
import { TileType } from '../../../types/TileType'
import { DirectionType } from '../../../types/Directions'

export const sprites = {
  turtle,
  flag,
  tileBlack,
  tileBlue,
  tileEmpty,
  tileGreen,
  tileGrey,
  tilePurple,
  tileRed,
  tileWhite,
  tileYellow,
  tileOrange
}

export const tileSpriteEnumMap = new Map<TileType, string>([
  [TileType.BLACK, tileBlack],
  [TileType.BLUE, tileBlue],
  [TileType.EMPTY, tileEmpty],
  [TileType.GREEN, tileGreen],
  [TileType.GREY, tileGrey],
  [TileType.PURPLE, tilePurple],
  [TileType.RED, tileRed],
  [TileType.WHITE, tileWhite],
  [TileType.YELLOW, tileYellow],
  [TileType.ORANGE, tileOrange]
])

export const turtleAngleDirMap = new Map<DirectionType, number>([
  [DirectionType.NORTH, 180],
  [DirectionType.EAST, 270],
  [DirectionType.SOUTH, 0],
  [DirectionType.WEST, 90],
])