import { Box, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import LevelTabs from './LevelTabs';

export default function LevelCreationForm() {
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [difficulty, setDifficulty] = useState(1)
  // const [levelSchemaVersion, setLevelSchemaVersion] = useState('1.0.0')
  // const [tags, setTags] = useState<string[]>([])
  // const [winCondition, setWinCondition] = useState<WinCondType>(WinCondType.GET_ALL_FLAGS)
  // const [testCases, setTestCases] = useState<TestCase[]>([])

  const [metagame, setMetagame] = useState<MetaGame>(
    {
      "id": 0,
      "title": "hello_world",
      "description": "a starting template",
      "difficulty": 1,
      "levelSchemaVersion": "1.0.0",
      "tags": [],
      "winCondition": WinCondType.GET_ALL_FLAGS,
      "testCases": [
        {
          "name": "can you start the game?",
          "levelData": {
            "level": [
              [TileType.WHITE, TileType.WHITE, TileType.WHITE],
              [TileType.WHITE, TileType.WHITE, TileType.WHITE],
              [TileType.WHITE, TileType.WHITE, TileType.WHITE]
            ],
            "player": {
              "pos": { "x": 0, "y": 0 },
              "dir": DirectionType.SOUTH
            },
            "flags": []
          }
        }
      ]
    }
  )

  function setTestCases(testCases: TestCase[]){
    setMetagame({
      ...metagame,
      testCases
    })
  }

  function handleTagInput(e: any) {
    const tag_string: string = e.target.value
    const tags = tag_string.split(',').map((tag) => tag.toLowerCase().trim().replaceAll(' ', '_')).filter((tag) => tag.length > 0)
    console.log(tags)
    setMetagame({
      ...metagame,
      tags
    })
  }

  function handleDifficultyInput(difficulty_string: string) {
    const difficulty = parseInt(difficulty_string)
    setMetagame({
      ...metagame,
      difficulty
    })
  }

  function handleIdInput(id_string: string) {
    const id = parseInt(id_string)
    setMetagame({
      ...metagame,
      id
    })
  }

  function handleMetagameChange(e: any) {
    const value = e.target.value;
    setMetagame({
      ...metagame,
      [e.target.name]: value
    });
  }

  return (
    <>
      <Flex>
        <Box>
          <Stack>
            <FormControl>
              <FormLabel>Id</FormLabel>
              <NumberInput min={0} value={metagame.id} name="id" onChange={(valueString) => handleIdInput(valueString)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={metagame.title} name="title" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input value={metagame.description} name="description" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Difficulty</FormLabel>
              <NumberInput min={1} max={5} value={metagame.difficulty} name="difficulty" onChange={(valueString) => handleDifficultyInput(valueString)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Level Schema Version</FormLabel>
              <Input value={metagame.levelSchemaVersion} name="levelSchemaVersion" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Tags (words seperated by ',')</FormLabel>
              <Input name="tags" onChange={handleTagInput} />
            </FormControl>
            <FormControl>
              <FormLabel>Win Condition</FormLabel>
              <Select value={metagame.winCondition} name="winCondition" onChange={handleMetagameChange}>
                <option value={WinCondType.CALC_OUTPUT}>{WinCondType.CALC_OUTPUT}</option>
                <option value={WinCondType.GET_ALL_FLAGS}>{WinCondType.GET_ALL_FLAGS}</option>
                <option value={WinCondType.MODIFY_BOARD}>{WinCondType.MODIFY_BOARD}</option>
              </Select>
            </FormControl>
          </Stack>
        </Box>

        <Box>
          <LevelTabs metagame={metagame} setTestCases={setTestCases}/>
        </Box>
      </Flex>
    </>
  )
}
