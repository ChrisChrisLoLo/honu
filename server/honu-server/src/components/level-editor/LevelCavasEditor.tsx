import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Tile Type</Form.Label>
            <Form.Select value={tileToDraw} onChange={handleTileToDraw}>
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
            </Form.Select>

          </Form.Group>
          <Form.Group>
            <Form.Text>Click on the tiles to color them</Form.Text>
          </Form.Group>
        </Form>
        {props.isExpectedOutput &&
          <Button onClick={copyFromInitLevel}><i className="bi bi-clipboard"></i></Button>
        }
      </div>
      <GameCanvas testCase={props.testCase} setTestCase={props.setTestCase} selectedDrawType={tileToDraw} isExpectedOutput={props.isExpectedOutput} readOnly={false}></GameCanvas>
    </>
  )
}
