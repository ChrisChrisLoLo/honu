import { Button, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { WinCondType } from '../../types/WinCondType';


interface PropType {
  metagame: MetaGame,
  setMetagame: Function,
}

export default function LevelImportExport(props: PropType) {

  function downloadMetagameAsJson(exportMetagame: MetaGame) {

    // Deep copy the metagame as modifications are made to it
    const exportMetagameCopy: MetaGame = JSON.parse(JSON.stringify(exportMetagame));

    // Remove the expected board type if it exists when the win condition is not to modify the board
    if(exportMetagameCopy.winCondition !== WinCondType.MODIFY_BOARD){
      for( let testCase of exportMetagameCopy.testCases){
        delete testCase.expectedLevel
      }
    }

    const exportName: string = `${exportMetagameCopy.levelId}-${exportMetagameCopy.title.toLowerCase().trim().replaceAll(' ', '_')}`
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportMetagameCopy, undefined, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
    metagame.testCases = metagame.testCases.map((testCase)=>populateExpectedLevelIfNotExists(testCase))
    props.setMetagame(metagame)
  }

  /**
   * This application needs every test to have an expectedlevel regarless of wincondition.
   * This function populates the expectedlevel field if it does not exist in the JSON file.
   */
  function populateExpectedLevelIfNotExists(testCase: TestCase): TestCase {
    const newTestCase: TestCase = { ...testCase }
    if(!newTestCase.expectedLevel){
      newTestCase.expectedLevel = JSON.parse(JSON.stringify(newTestCase.levelData.level));
    }
    return newTestCase
  }

  return (
    <Stack>
      <Text>Export</Text>
      <Button onClick={() => downloadMetagameAsJson(props.metagame)}>
        Download
      </Button>
      <Text>Import</Text>
      <Input type="file" onChange={handleMetagameFileInput} ></Input>
    </Stack>
  )
}
