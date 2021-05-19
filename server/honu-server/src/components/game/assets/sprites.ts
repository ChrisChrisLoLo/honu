import turtle from './turtle.png'
import flag from './flag.png'
import tileBlack from './tile_black.png'
import tileBlue from './tile_blue.png'
import tileEmpty from './tile_empty.png'
import tileGreen from './tile_green.png'
import tileGrey from './tile_grey.png'
import tilePurple from './tile_purple.png'
import tileRed from './tile_red.png'
import tileWhite from './tile_white.png'
import tileYellow from './tile_red.png'
import { TileType } from '../../../types/TileType'
import { DirectionType } from '../../../types/Directions'

export const sprites = {
  turtle: turtle,
  flag: flag,
  tileBlack: tileBlack,
  tileBlue: tileBlue,
  tileEmpty: tileEmpty,
  tileGreen: tileGreen,
  tileGrey: tileGrey,
  tilePurple: tilePurple,
  tileRed: tileRed,
  tileWhite: tileWhite,
  tileYellow: tileYellow
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
  [TileType.YELLOW, tileYellow]
])

export const turtleAngleDirMap = new Map<DirectionType, number>([
  [DirectionType.NORTH, 180],
  [DirectionType.EAST, 270],
  [DirectionType.SOUTH, 0],
  [DirectionType.WEST, 90],
])