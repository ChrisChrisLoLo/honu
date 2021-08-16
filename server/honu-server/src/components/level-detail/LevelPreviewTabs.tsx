import { Tab, Tabs } from 'react-bootstrap';
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
      <Tabs>
          {testCases.map((testCase, i) =>
            <Tab eventKey={testCase.name} title={testCase.name} key={i}>
              <LevelPreviewTab testCase={testCase} winCondition={props.metagame.winCondition} isActive={i === activeTabIndex} />
            </Tab>)
          }
      </Tabs>
    </>
  )
}
