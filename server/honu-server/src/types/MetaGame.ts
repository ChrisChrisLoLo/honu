import { TestCase } from "./TestCase";
import { WinCondType } from "./WinCondType";

export interface MetaGame{
  winCondition: WinCondType
  testCases: TestCase[]
}