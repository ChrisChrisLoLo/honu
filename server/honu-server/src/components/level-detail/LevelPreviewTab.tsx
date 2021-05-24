import { Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TestCase } from '../../types/TestCase';
import { WinCondType } from '../../types/WinCondType';
import GameCanvas from '../level-editor/GameCanvas';



interface PropType {
  testCase: TestCase
  winCondition: WinCondType
  isActive: boolean
}

export default function LevelPreviewTab(props: PropType) {
  return (
    <>
      {

        props.isActive &&
        <Stack>
          <Text>Test Case Description</Text>
          <Text>{props.testCase.name}</Text>
          <GameCanvas testCase={props.testCase} selectedDrawType={null} setTestCase={() => { }} readOnly={true} isExpectedOutput={false} />
          {
            props.winCondition === WinCondType.CALC_OUTPUT &&
            <>
              <Text>Expected output</Text>
              <Text>{props.testCase.expectedOutput}</Text>
            </>
          }
          {
            props.winCondition === WinCondType.MODIFY_BOARD &&
            <>
              <Text>Expected Output</Text>
              <GameCanvas testCase={props.testCase} selectedDrawType={null} setTestCase={() => { }} readOnly={true} isExpectedOutput={true} />
            </>
          }
        </Stack>
      }
    </>
  )
}
