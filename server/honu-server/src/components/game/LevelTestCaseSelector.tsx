import React from 'react';
import { MetaGame } from '../../types/MetaGame';
import LevelTestCase from './LevelTestCase';

interface StateProps {
  metaGameState: MetaGame
  testCasesPassed: number []
  setTestCasesPassed: Function
  runCode: Function
}

export default function LevelTestCaseSelector(props:StateProps) {

  const testCaseComponenets = []
  for (const [i,testCase] of props.metaGameState.testCases.entries()){
    testCaseComponenets.push(
      <LevelTestCase 
        testCaseData={testCase}
        hasPassed={props.testCasesPassed.includes(i)}
        testIndex={i}
        runCode={props.runCode}
        key={i}
      />
    )
  }

  return (
    <div>
      {testCaseComponenets}
    </div>
  )
}