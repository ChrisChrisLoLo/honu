import { CloseButton, FormControl, FormLabel, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import GameCanvas from './GameCanvas';
import LevelCanvasEditor from './LevelCavasEditor';



interface PropType {
  metagame: MetaGame
  setTestCases: Function
}

export default function LevelCreationForm(props: PropType) {

  const testCases: TestCase[] = props.metagame.testCases;

  const defaultTestCase: TestCase = {
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

  function handleTestCaseTitleChange(e: any, i: number) {
    const newArr = [...testCases]
    newArr[i].name = e.target.value
    props.setTestCases(newArr)
  }

  function createSetTestCase(i: number) {
    return function setTestCaseNoInd(newTestCase: TestCase) {
      const newTestCases = [...testCases]
      newTestCases[i] = newTestCase
      props.setTestCases(newTestCases)
    }
  }

  return (
    <Tabs variant="enclosed">
      <TabList>
        {testCases.map((testCase, i) =>
          <Tab key={i}>
            {testCase.name}
            <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => props.setTestCases(testCases.filter((el) => el !== testCase))}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Tab>)}
        <Tab onClick={() => props.setTestCases([...testCases, defaultTestCase])}>Add</Tab>
      </TabList>

      <TabPanels>
        {testCases.map((testCase, i) =>
          <TabPanel key={i}>
            <Stack>
              <FormControl>
                <FormLabel>Test Case Description</FormLabel>
                <Input value={testCase.name} name="name" onChange={(e) => handleTestCaseTitleChange(e, i)} />
              </FormControl>
            </Stack>
            <LevelCanvasEditor testCase={testCase} winCondition={props.metagame.winCondition} setTestCase={createSetTestCase(i)} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}