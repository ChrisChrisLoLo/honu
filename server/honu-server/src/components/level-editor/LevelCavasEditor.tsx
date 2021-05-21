import { CloseButton, FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useProps } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import GameCanvas from './GameCanvas';



interface PropType {
  testCase: TestCase
  winCondition: WinCondType
  setTestCase: Function
}

export default function LevelCanvasEditor(props: PropType) {
  // just draw and control the tiles

  const [tileToDraw, setTileToDraw] = useState(TileType.GREY)

  function handleTileToDraw(e: any) {
    setTileToDraw(e.target.value)
  }

  const width = props.testCase.levelData.level[0].length
  const height = props.testCase.levelData.level.length

  return (
    <>
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
      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedTileType={tileToDraw}></GameCanvas>
    </>
  )
}
