import { Button, CloseButton, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { EntityType } from '../../types/EntityType';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import GameCanvas from './GameCanvas';



interface PropType {
  testCase: TestCase
  winCondition: WinCondType
  setTestCase: Function
  isExpectedOutput: boolean
}

export default function LevelCanvasEditor(props: PropType) {
  // just draw and control the tiles

  const [tileToDraw, setTileToDraw] = useState<TileType | EntityType>(TileType.GREY)

  function handleTileToDraw(e: any) {
    setTileToDraw(e.target.value)
  }

  function copyFromInitLevel(){
    const newTestCase = {...props.testCase}
    // deep copy
    newTestCase.expectedLevel = JSON.parse(JSON.stringify(props.testCase.levelData.level))
    props.setTestCase(newTestCase)
  }

  const width = props.testCase.levelData.level[0].length
  const height = props.testCase.levelData.level.length

  return (
    <>
      <HStack>
        <FormControl>
          <FormLabel>Tile Type</FormLabel>
          <Select value={tileToDraw} onChange={handleTileToDraw}>
            {!props.isExpectedOutput &&
              Object.keys(EntityType).map(key =>
                <option key={key} value={(EntityType as any)[key]}>
                  {`* ${(EntityType as any)[key]}`}
                </option>)
            }
            {Object.keys(TileType).map(key =>
              <option key={key} value={(TileType as any)[key]}>
                {(TileType as any)[key]}
              </option>)
            }
          </Select>
          <FormHelperText>Click on the tiles to color them</FormHelperText>
        </FormControl>
        {props.isExpectedOutput &&
          <Button onClick={copyFromInitLevel}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </Button>
        }
      </HStack>
      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedDrawType={tileToDraw} isExpectedOutput={props.isExpectedOutput}></GameCanvas>
    </>
  )
}
