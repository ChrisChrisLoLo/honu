import { TestCase } from "./TestCase";
import { WinCondType } from "./WinCondType";

export interface MetaGame{
  id: number
  title: string
  description: string
  difficulty: number
  levelSchemaVersion: string
  tags: string[]
  winCondition: WinCondType
  testCases: TestCase[]
}