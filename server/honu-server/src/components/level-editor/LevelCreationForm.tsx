import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { DirectionType } from '../../types/Directions';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import LevelImportExport from './LevelImportExport';
import LevelTabs from './LevelTabs';

export default function LevelCreationForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [metagame, setMetagame] = useState<MetaGame>(
    {
      "levelId": 0,
      "title": "hello_world",
      "shortDescription": "a starting template",
      "markdownDescription": "# Can you start the test?",
      "difficulty": 1,
      "supportedLibVersion": "0.0.0",
      "levelSchemaVersion": "1.0.0",
      "tags": [],
      "winCondition": WinCondType.GET_ALL_FLAGS,
      "testCases": [
        {
          "name": "First Test",
          "levelData": {
            "level": [
              [TileType.WHITE, TileType.WHITE, TileType.WHITE],
              [TileType.WHITE, TileType.WHITE, TileType.WHITE],
              [TileType.WHITE, TileType.WHITE, TileType.WHITE]
            ],
            "player": {
              "pos": { "x": 0, "y": 0 },
              "dir": DirectionType.SOUTH
            },
            "flags": []
          }, "expectedLevel": [
            [TileType.WHITE, TileType.WHITE, TileType.WHITE],
            [TileType.WHITE, TileType.WHITE, TileType.WHITE],
            [TileType.WHITE, TileType.WHITE, TileType.WHITE]
          ]
        }
      ]
    }
  )

  function setTestCases(testCases: TestCase[]) {
    setMetagame({
      ...metagame,
      testCases
    })
  }

  function handleTagInput(e: any) {
    const tag_string: string = e.target.value
    const tags = tag_string.split(',').map((tag) => tag.toLowerCase().trim().replaceAll(' ', '_')).filter((tag) => tag.length > 0)
    console.log(tags)
    setMetagame({
      ...metagame,
      tags
    })
  }

  function handleDifficultyInput(difficulty_string: string) {
    const difficulty = parseInt(difficulty_string)
    setMetagame({
      ...metagame,
      difficulty
    })
  }

  function handleIdInput(id_string: string) {
    const levelId = parseInt(id_string)
    setMetagame({
      ...metagame,
      levelId
    })
  }

  function handleMetagameChange(e: any) {
    const value = e.target.value;
    setMetagame({
      ...metagame,
      [e.target.name]: value
    });
  }

  return (
    <>
      <div>
          <div>
            <Form>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" value={metagame.levelId} name="levelId" onChange={(e) => handleIdInput(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={metagame.title} name="title" onChange={handleMetagameChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Short Description</Form.Label>
                <Form.Control value={metagame.shortDescription} name="shortDescription" onChange={handleMetagameChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Markdown Description</Form.Label>
                <Button onClick={handleShow}>Preview</Button>
                <Form.Control type="textarea" value={metagame.markdownDescription} name="markdownDescription" onChange={handleMetagameChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Difficulty</Form.Label>
                <Form.Control type="number" min={1} max={5} value={metagame.difficulty} name="difficulty" onChange={(e) => handleDifficultyInput(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Level Schema Version</Form.Label>
                <Form.Control value={metagame.levelSchemaVersion} name="levelSchemaVersion" onChange={handleMetagameChange} />
                <p>Leave as is if unsure</p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Supported Library Version</Form.Label>
                <Form.Control value={metagame.supportedLibVersion} name="supportedLibVersion" onChange={handleMetagameChange} />
                <p>Leave as is if unsure</p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Tags (words seperated by ',')</Form.Label>
                <Form.Control name="tags" onChange={handleTagInput} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Win Condition</Form.Label>
                <Form.Select value={metagame.winCondition} name="winCondition" onChange={handleMetagameChange}>
                  <option value={WinCondType.CALC_OUTPUT}>{WinCondType.CALC_OUTPUT}</option>
                  <option value={WinCondType.GET_ALL_FLAGS}>{WinCondType.GET_ALL_FLAGS}</option>
                  <option value={WinCondType.MODIFY_BOARD}>{WinCondType.MODIFY_BOARD}</option>
                </Form.Select>
              </Form.Group>
            </Form>
            <LevelImportExport metagame={metagame} setMetagame={setMetagame}/>
          </div>
        <div>
          <LevelTabs metagame={metagame} setTestCases={setTestCases} />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          Modal Title
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown>{metagame.markdownDescription}</ReactMarkdown>
        </Modal.Body>
      </Modal>
    </>
  )
}
