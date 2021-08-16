import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { DirectionType } from '../../types/Directions';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import LevelCanvasEditor from './LevelCavasEditor';



interface PropType {
  testCase: TestCase
  winCondition: WinCondType
  setTestCase: Function
  // Determines if the component should be rendered.
  // This is done as we need to reload the pixi instance in the event that
  // there are too many WebGL instances. Otherwise some tabs will have dead pixis.
  isActive: boolean
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
          const expectedRow = newTestCase.expectedLevel[rowI]
          shouldExpand ? row.push(TileType.WHITE) : row.pop()
          shouldExpand ? expectedRow.push(TileType.WHITE) : expectedRow.pop()
        }
      }
    } else {
      const newHeight = newDim
      const shouldExpand: boolean = newHeight > currHeight;
      for (let i = 0; i < Math.abs(currHeight - newHeight); i++) {
        const level = newTestCase.levelData.level
        const expectedLevel = newTestCase.expectedLevel
        shouldExpand ? level.push(Array(currWidth).fill(TileType.WHITE)) : level.pop()
        shouldExpand ? expectedLevel.push(Array(currWidth).fill(TileType.WHITE)) : expectedLevel.pop()
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
    const outputStr: string = e.target.value
    const newTestCase = { ...props.testCase }
    const output = Number.isInteger(outputStr) ? parseInt(outputStr) : outputStr
    newTestCase.expectedOutput = output
    props.setTestCase(newTestCase)
  }

  const width = props.testCase.levelData.level[0].length
  const height = props.testCase.levelData.level.length
  const testCase = props.testCase

  return (
    <>
      {
        props.isActive &&
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Test Case Description</Form.Label>
              <Form.Control value={testCase.name} name="name" onChange={(e) => handleTestCaseTitleChange(e)} />
            </Form.Group>
            <div>
              <Form.Group>
                <Form.Label>Level Width</Form.Label>
                <Form.Control type="number" min={1} value={width} name="width" onChange={(e) => handleDimChange(e.target.value, true)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Level Height</Form.Label>
                <Form.Control type="number" min={1} value={height} name="height" onChange={(e) => handleDimChange(e.target.value, false)}/>
              </Form.Group>
            </div>
            <div>
              <Form.Group>
                <Form.Label>Turtle X</Form.Label>
                <Form.Control type="number" min={0} max={width - 1} value={testCase.levelData.player.pos.x} onChange={(e) => handleCoordChange(e.target.value, true)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Turtle Y</Form.Label>
                <Form.Control type="number" min={0} max={height - 1} value={testCase.levelData.player.pos.y} onChange={(e) => handleCoordChange(e.target.value, false)}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Turtle Dir</Form.Label>
                <Form.Select value={testCase.levelData.player.dir} onChange={handleDirChange}>
                  {Object.keys(DirectionType).map(key =>
                    <option key={key} value={(DirectionType as any)[key]}>
                      {(DirectionType as any)[key]}
                    </option>)
                  }
                </Form.Select>
              </Form.Group>
            </div>
            <LevelCanvasEditor testCase={testCase} winCondition={props.winCondition} setTestCase={props.setTestCase} isExpectedOutput={false} />
            {
              props.winCondition === WinCondType.CALC_OUTPUT &&
              <Form.Group>
                <Form.Label>Expected output</Form.Label>
                <Form.Control value={testCase.expectedOutput} name="output" onChange={handleOutputChange} />
                <p>Can be an integer or a string</p>
              </Form.Group>
            }
            {
              props.winCondition === WinCondType.MODIFY_BOARD &&
              <>
                <p>Expected Output</p>
                <LevelCanvasEditor testCase={testCase} winCondition={props.winCondition} setTestCase={props.setTestCase} isExpectedOutput={true} />
              </>
            }
          </Form>
        </div>
      }
    </>
  )
}
