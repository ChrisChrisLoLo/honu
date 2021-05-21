import { FormControl, FormHelperText, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import LevelCanvasEditor from './LevelCavasEditor';



interface PropType {
  testCase: TestCase
  winCondition: WinCondType
  setTestCase: Function
}

export default function LevelTab(props: PropType) {

  function handleTestCaseTitleChange(e: any) {
    const newTestCase = { ...props.testCase }
    newTestCase.name = e.target.value
    props.setTestCase(newTestCase)
  }

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

  function handleCoordChange(valString: string, isX: boolean) {
    const newCoord = parseInt(valString)
    const newTestCase = { ...props.testCase }

    isX ? newTestCase.levelData.player.pos.x = newCoord : newTestCase.levelData.player.pos.y = newCoord
    props.setTestCase(newTestCase)
  }

  function handleDirChange(e: any) {
    const dirString: DirectionType = e.target.value
    const newTestCase = { ...props.testCase }
    newTestCase.levelData.player.dir = dirString
    props.setTestCase(newTestCase)

  }
  
  function handleOutputChange(e: any) {
    const outputStr:string = e.target.value
    const newTestCase = { ...props.testCase }
    const output = Number.isInteger(outputStr) ? parseInt(outputStr) : outputStr
    newTestCase.expectedOutput = output
    props.setTestCase(newTestCase)
  }

  const width = props.testCase.levelData.level[0].length
  const height = props.testCase.levelData.level.length
  const testCase = props.testCase

  return (
    <Stack>
      <FormControl>
        <FormLabel>Test Case Description</FormLabel>
        <Input value={testCase.name} name="name" onChange={(e) => handleTestCaseTitleChange(e)} />
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Level Width</FormLabel>
          <NumberInput min={1} value={width} name="width" onChange={(valueString) => handleDimChange(valueString, true)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Level Height</FormLabel>
          <NumberInput min={1} value={height} name="height" onChange={(valueString) => handleDimChange(valueString, false)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
      <HStack>
        <FormControl>
          <FormLabel>Turtle X</FormLabel>
          <NumberInput min={0} max={width - 1} onChange={(valueString) => handleCoordChange(valueString, true)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Turtle Y</FormLabel>
          <NumberInput min={0} max={height - 1} onChange={(valueString) => handleCoordChange(valueString, false)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Turtle Dir</FormLabel>
          <Select value={testCase.levelData.player.dir} onChange={handleDirChange}>
            {Object.keys(DirectionType).map(key =>
              <option key={key} value={(DirectionType as any)[key]}>
                {(DirectionType as any)[key]}
              </option>)
            }
          </Select>
        </FormControl>
      </HStack>
      <LevelCanvasEditor testCase={testCase} winCondition={props.winCondition} setTestCase={props.setTestCase}/>
      {
        props.winCondition === WinCondType.CALC_OUTPUT &&
        <FormControl>
          <FormLabel>Expected output</FormLabel>
          <Input value={testCase.expectedOutput} name="output" onChange={handleOutputChange} />
          <FormHelperText>Can be an integer or a string</FormHelperText>
        </FormControl>
      }
      {
        props.winCondition === WinCondType.CALC_OUTPUT &&
        <FormControl>
          <FormLabel>Expected output</FormLabel>
          <Input value={testCase.expectedOutput} name="output" onChange={handleOutputChange} />
          <FormHelperText>Can be an integer or a string</FormHelperText>
        </FormControl>
      }
    </Stack>
  )
}
