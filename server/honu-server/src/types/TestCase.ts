import { LevelData } from "./LevelData";
import { TileType } from "./TileType";

export interface TestCase{
  // Index of the current test case being used.
  // This is to reference what test case should be reloaded from
  levelData: LevelData
  name: string
  // Optionally outputted, though for the sake of simplicity of the application,
  // this attribute is mandatory (though may not be used!)
  expectedLevel: TileType[][]
  expectedOutput?: number | string
}