import { LevelData } from "./LevelData";
import { TileType } from "./TileType";

export interface TestCase{
  // Index of the current test case being used.
  // This is to reference what test case should be reloaded from
  levelData: LevelData
  name: string
  expectedLevel?: TileType[][]
  expectedOutput?: number | string
}