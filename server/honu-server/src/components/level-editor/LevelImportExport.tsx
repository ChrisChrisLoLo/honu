import { Button, Input, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MetaGame } from '../../types/MetaGame';


interface PropType {
  metagame: MetaGame,
  setMetagame: Function,
}

export default function LevelImportExport(props: PropType) {

  function downloadMetagameAsJson(exportMetagame: MetaGame) {
    const exportName: string = `${exportMetagame.id}-${exportMetagame.title.toLowerCase().trim().replaceAll(' ', '_')}`
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportMetagame, undefined, 2));
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
    props.setMetagame(metagame)
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
