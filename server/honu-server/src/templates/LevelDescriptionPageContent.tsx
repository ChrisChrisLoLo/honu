import React from "react"
import { MetaGame } from "../types/MetaGame";
import Navbar from "../components/Navbar";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import TestCasePreview from "../components/level-detail/LevelPreviewTabs";

interface PropsType {
  pageContext: any
}

// The contents of the JS template wrapper
export default function LevelDescriptionPageContent(props: PropsType) {
  const { pageContext } = props
  const { levelContent, links } = pageContext

  const metagame: MetaGame = levelContent

  function capitalize(s:string)
  {
      return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <main>
      <title>Honu Level: {metagame.title}</title>
      <Navbar />
      <HStack>
      <Box>
        <Heading>
          {metagame.title}
        </Heading>
        <Heading>
          {metagame.shortDescription}
        </Heading>
        <Text>
          Difficulty: {metagame.difficulty}/5
        </Text>
        <Text>
          Win Condition: {capitalize(metagame.winCondition.replaceAll('_',' '))}
        </Text>
        <ReactMarkdown>
          {metagame.markdownDescription}
        </ReactMarkdown>
      </Box>
      <Box>
        <TestCasePreview metagame={metagame}/>
      </Box>
      </HStack>
    </main>
  )
}
