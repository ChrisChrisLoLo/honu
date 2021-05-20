import { CloseButton, FormControl, FormLabel, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';



interface PropType {
  testCases: TestCase[]
  setTestCases: Function
}

export default function LevelCreationForm(props: PropType) {

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

  function handleTestCaseTitleChange(e: any, testCase: TestCase, i: number) {
    const newArr = [...props.testCases]
    newArr[i].name = e.target.value
    props.setTestCases(newArr)
  }

  return (
    <Tabs variant="enclosed">
      <TabList>
        {props.testCases.map((testCase, i) =>
          <Tab key={i}>
            {testCase.name}
            <svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => props.setTestCases(props.testCases.filter((el) => el !== testCase))}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Tab>)}
        <Tab onClick={() => props.setTestCases([...props.testCases, defaultTestCase])}>Add</Tab>
      </TabList>

      <TabPanels>
        {props.testCases.map((testCase, i) =>
          <TabPanel key={i}>
            <Stack>
              <FormControl>
                <FormLabel>Test Case Description</FormLabel>
                <Input value={testCase.name} name="name" onChange={(e) => handleTestCaseTitleChange(e, testCase, i)} />
              </FormControl>
            </Stack>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}
