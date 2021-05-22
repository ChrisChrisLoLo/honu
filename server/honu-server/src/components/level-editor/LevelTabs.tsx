import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DirectionType } from '../../types/Directions';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import { TileType } from '../../types/TileType';
import LevelTab from './LevelTab';



interface PropType {
  metagame: MetaGame
  setTestCases: Function
}

export default function LevelTabs(props: PropType) {

  const testCases: TestCase[] = props.metagame.testCases
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const defaultTestCase: TestCase = {
    "name": "New Test",
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
    }, 
    "expectedLevel": [
      [TileType.WHITE, TileType.WHITE, TileType.WHITE],
      [TileType.WHITE, TileType.WHITE, TileType.WHITE],
      [TileType.WHITE, TileType.WHITE, TileType.WHITE]
    ],
  }


  function createSetTestCase(i: number) {
    return function setTestCaseNoInd(newTestCase: TestCase) {
      const newTestCases = [...testCases]
      newTestCases[i] = newTestCase
      props.setTestCases(newTestCases)
    }
  }


  return (
    <Tabs variant="enclosed" onChange={(index) => setActiveTabIndex(index)}>
      <TabList>
        {testCases.map((testCase, i) =>
          <Tab key={i}>
            {testCase.name}
            <IconButton size={'xs'} style={{marginLeft:10}} aria-label={"Close tab"} icon={<CloseIcon/>} onClick={() => props.setTestCases(testCases.filter((el) => el !== testCase))}/>
          </Tab>)}
        <Tab onClick={() => props.setTestCases([...testCases, defaultTestCase])}>Add</Tab>
      </TabList>

      <TabPanels>
        {testCases.map((testCase, i) =>
          <TabPanel key={i}>
            <LevelTab testCase={testCase} winCondition={props.metagame.winCondition} setTestCase={createSetTestCase(i)} isActive={i===activeTabIndex}/>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}