import { Button, HStack, Input, Stack, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { WinCondType } from '../../types/WinCondType';


interface PropType {
  metagame: MetaGame,
  setMetagame: Function,
}

export default function LevelImportExport(props: PropType) {

  const toast = useToast()

  function metagameToJson(metagame: MetaGame): MetaGame {
    const metagameCopy: MetaGame = JSON.parse(JSON.stringify(metagame));

    // Remove the expected board type if it exists when the win condition is not to modify the board
    if (metagameCopy.winCondition !== WinCondType.MODIFY_BOARD) {
      for (let testCase of metagameCopy.testCases) {
        delete testCase.expectedLevel
      }
    }
    return metagameCopy
  }

  function downloadMetagameAsJson(exportMetagame: MetaGame): void {
    const exportMetagameCopy = metagameToJson(exportMetagame)

    const exportName: string = `${exportMetagameCopy.levelId}-${exportMetagameCopy.title.toLowerCase().trim().replaceAll(' ', '_')}`
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportMetagameCopy, undefined, 2));
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", exportName + ".json")
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  function copyJsonToClipboard(exportMetagame: MetaGame): void {
    const exportMetagameCopy = metagameToJson(exportMetagame)
    navigator.clipboard.writeText(JSON.stringify(exportMetagameCopy))

    toast({
      title: "JSON Copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }


  /**
   * Read a metagame JSON level
   * 
   * Set the app's metagame to the uploaded JSON
   * @param e file event
   */
  async function handleMetagameFileInput(e: any) {
    const filelist: FileList = e.target.files
    const file: File = filelist[0]
    const text = await file.text()
    const metagame: MetaGame = JSON.parse(text)
    metagame.testCases = metagame.testCases.map((testCase) => populateExpectedLevelIfNotExists(testCase))
    props.setMetagame(metagame)
  }

  /**
   * This application needs every test to have an expectedlevel regarless of wincondition.
   * This function populates the expectedlevel field if it does not exist in the JSON file.
   */
  function populateExpectedLevelIfNotExists(testCase: TestCase): TestCase {
    const newTestCase: TestCase = { ...testCase }
    if (!newTestCase.expectedLevel) {
      newTestCase.expectedLevel = JSON.parse(JSON.stringify(newTestCase.levelData.level));
    }
    return newTestCase
  }

  return (
    <Stack>
      <Text>Export</Text>
      <HStack>
        <Button onClick={() => downloadMetagameAsJson(props.metagame)}>
          Download
        </Button>
        <Button onClick={() => copyJsonToClipboard(props.metagame)}>
          Copy JSON
        </Button>
      </HStack>
      <Text>Import</Text>
      <Input type="file" onChange={handleMetagameFileInput} ></Input>
    </Stack>
  )
}
