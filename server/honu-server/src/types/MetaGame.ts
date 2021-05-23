import { TestCase } from "./TestCase";
import { WinCondType } from "./WinCondType";

export interface MetaGame{
  // Used as an id for both the website and library
  levelId: number
  title: string
  // Short description. Used to give a brief description of the level
  shortDescription: string
  // Markdown description. Used to elaborate what is expected. Explains the rules and testcases
  markdownDescription: string
  // Scale of 1-5 of how hard the level is
  difficulty: number
  // Semantic versioning of what library version can support the test
  supportedLibVersion: string
  // Semantic versioning of the level schema
  levelSchemaVersion: string
  // Tags to search on. Used in the website
  tags: string[]
  // How the player can win
  winCondition: WinCondType
  // Test cases
  testCases: TestCase[]
}