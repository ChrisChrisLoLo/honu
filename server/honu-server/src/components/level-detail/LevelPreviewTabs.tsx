import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MetaGame } from '../../types/MetaGame';
import { TestCase } from '../../types/TestCase';
import LevelPreviewTab from './LevelPreviewTab';



interface PropType {
  metagame: MetaGame
}

export default function LevelPreviewTabs(props: PropType) {
  const testCases: TestCase[] = props.metagame.testCases
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <>
      <Tabs variant="enclosed" onChange={(index) => setActiveTabIndex(index)}>
        <TabList>
          {testCases.map((testCase, i) =>
            <Tab key={i}>
              {testCase.name}
            </Tab>)}
        </TabList>

        <TabPanels>
          {testCases.map((testCase, i) =>
            <TabPanel key={i}>
              <LevelPreviewTab testCase={testCase} winCondition={props.metagame.winCondition} isActive={i === activeTabIndex} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </>
  )
}
