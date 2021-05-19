import { TileType } from './TileType';
import { Player, Flag } from './Entities';

export interface LevelData {
  level: TileType[][]
  player: Player
  flags?: Flag[]
}