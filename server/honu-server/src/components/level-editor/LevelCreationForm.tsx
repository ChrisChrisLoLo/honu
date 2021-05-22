import { Box, Button, CSSReset, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { DirectionType } from '../../types/Directions';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import { WinCondType } from '../../types/WinCondType';
import LevelImportExport from './LevelImportExport';
import LevelTabs from './LevelTabs';

export default function LevelCreationForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [metagame, setMetagame] = useState<MetaGame>(
    {
      "id": 0,
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
    const id = parseInt(id_string)
    setMetagame({
      ...metagame,
      id
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
      <Flex>
        <Box>
          <Stack>
            <FormControl>
              <FormLabel>Id</FormLabel>
              <NumberInput min={0} value={metagame.id} name="id" onChange={(valueString) => handleIdInput(valueString)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input value={metagame.title} name="title" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Short Description</FormLabel>
              <Input value={metagame.shortDescription} name="shortDescription" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Markdown Description</FormLabel>
              <Button onClick={onOpen}>Preview</Button>
              <Textarea value={metagame.markdownDescription} name="markdownDescription" onChange={handleMetagameChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Difficulty</FormLabel>
              <NumberInput min={1} max={5} value={metagame.difficulty} name="difficulty" onChange={(valueString) => handleDifficultyInput(valueString)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Level Schema Version</FormLabel>
              <Input value={metagame.levelSchemaVersion} name="levelSchemaVersion" onChange={handleMetagameChange} />
              <FormHelperText>Leave as is if unsure</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Supported Library Version</FormLabel>
              <Input value={metagame.supportedLibVersion} name="supportedLibVersion" onChange={handleMetagameChange} />
              <FormHelperText>Leave as is if unsure</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Tags (words seperated by ',')</FormLabel>
              <Input name="tags" onChange={handleTagInput} />
            </FormControl>
            <FormControl>
              <FormLabel>Win Condition</FormLabel>
              <Select value={metagame.winCondition} name="winCondition" onChange={handleMetagameChange}>
                <option value={WinCondType.CALC_OUTPUT}>{WinCondType.CALC_OUTPUT}</option>
                <option value={WinCondType.GET_ALL_FLAGS}>{WinCondType.GET_ALL_FLAGS}</option>
                <option value={WinCondType.MODIFY_BOARD}>{WinCondType.MODIFY_BOARD}</option>
              </Select>
            </FormControl>
            <LevelImportExport metagame={metagame} setMetagame={setMetagame}/>
          </Stack>
        </Box>
        <Box>
          <LevelTabs metagame={metagame} setTestCases={setTestCases} />
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactMarkdown>{metagame.markdownDescription}</ReactMarkdown>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
