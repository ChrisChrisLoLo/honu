import { CloseButton, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
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

  const [tileToDraw, setTileToDraw] = useState(TileType.GREY)

  function handleDimChange(valString: string, isWidth: boolean) {
    const newDim = parseInt(valString)
    const newTestCase = { ...props.testCase }
    const currWidth = newTestCase.levelData.level[0].length
    const currHeight = newTestCase.levelData.level.length
    if (isWidth) {
      const newWidth = newDim
      const shouldExpand: boolean = newWidth > currWidth;
      for (let rowI = 0; rowI < currHeight; rowI++) {
        for (let i = 0; i < Math.abs(currWidth - newWidth); i++) {
          const row = newTestCase.levelData.level[rowI]
          shouldExpand ? row.push(TileType.WHITE) : row.pop()
        }
      }
    } else {
      const newHeight = newDim
      const shouldExpand: boolean = newHeight > currHeight;
      for (let i = 0; i < Math.abs(currHeight - newHeight); i++) {
        const level = newTestCase.levelData.level
        shouldExpand ? level.push(Array(currWidth).fill(TileType.WHITE)) : level.pop()
      }
    }
    props.setTestCase(newTestCase)
  }

  function handleTileToDraw(e: any) {
    setTileToDraw(e.target.value)
  }

  return (
    <>
      <HStack>
        <FormControl>
          <FormLabel>Level Width</FormLabel>
          <NumberInput min={1} value={props.testCase.levelData.level[0].length} name="width" onChange={(valueString) => handleDimChange(valueString, true)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Level Height</FormLabel>
          <NumberInput min={1} value={props.testCase.levelData.level.length} name="height" onChange={(valueString) => handleDimChange(valueString, false)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>Tile Color</FormLabel>
        <Select value={tileToDraw} onChange={handleTileToDraw}>
          {Object.keys(TileType).map(key =>
            <option key={key} value={(TileType as any)[key]}>
              {(TileType as any)[key]}
            </option>)
          }
        </Select>
        <FormHelperText>Click on the tiles to color them</FormHelperText>
      </FormControl>

      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedTileType={tileToDraw} isExpectedOutput={props.isExpectedOutput}></GameCanvas>
    </>
  )
}