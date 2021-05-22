import { CopyIcon } from '@chakra-ui/icons';
import { FormControl, FormHelperText, FormLabel, HStack, IconButton, Select} from '@chakra-ui/react';
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
          <IconButton aria-label={'Copy from level'} icon={<CopyIcon/>} onClick={copyFromInitLevel} />
        }
      </HStack>
      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedDrawType={tileToDraw} isExpectedOutput={props.isExpectedOutput}></GameCanvas>
    </>
  )
}
