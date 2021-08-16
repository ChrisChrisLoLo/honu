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
        <div>
          <h2>Test Case Description</h2>
          <p>{props.testCase.name}</p>
          <GameCanvas testCase={props.testCase} selectedDrawType={null} setTestCase={() => { }} readOnly={true} isExpectedOutput={false} />
          {
            props.winCondition === WinCondType.CALC_OUTPUT &&
            <>
              <p>Expected output</p>
              <p>{props.testCase.expectedOutput}</p>
            </>
          }
          {
            props.winCondition === WinCondType.MODIFY_BOARD &&
            <>
              <p>Expected Output</p>
              <GameCanvas testCase={props.testCase} selectedDrawType={null} setTestCase={() => { }} readOnly={true} isExpectedOutput={true} />
            </>
          }
        </div>
      }
    </>
  )
}
