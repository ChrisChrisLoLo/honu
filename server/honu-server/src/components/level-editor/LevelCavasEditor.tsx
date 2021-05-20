import { CloseButton, FormControl, FormLabel, Input, Select, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useProps } from '@chakra-ui/react';
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
}

export default function LevelCanvasEditor(props: PropType) {
  // just draw and control the tiles

  const [tileToDraw, setTileToDraw] = useState(TileType.GREY)

  function handleTileToDraw(e: any){
    setTileToDraw(e.target.value)
  }

  return (
    <>
      <Select value={tileToDraw} onChange={handleTileToDraw}>
        {Object.keys(TileType).map(key =>
          <option key={key} value={(TileType as any)[key]}>
            {(TileType as any)[key]}
          </option>)
        }
      </Select>
      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedTileType={tileToDraw}></GameCanvas>
    </>
  )
}
