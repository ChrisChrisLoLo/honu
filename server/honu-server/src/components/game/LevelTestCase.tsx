import React from 'react';
import { TestCase } from '../../types/TestCase';

interface StateProps {
  testCaseData: TestCase
  hasPassed: boolean
  testIndex: number
  runCode: Function
}

export default function LevelTestCase(props:StateProps) {

  return (
    <div className="bg-green-300 my-2">
      <div className="flex flex-row p-1">
        <h4 className="mr-1">{props.testCaseData.name}</h4>
        <button onClick={()=>props.runCode(props.testIndex)} className="bg-green-400 hover:bg-green-500 disabled:bg-gray-600 disabled:opacity-40 text-white hover:text-gray-100 w-7 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex flex-row p-1">
        {props.hasPassed ? "passed": "failed"}
      </div>
    </div>
  )
}