import { Center, Heading, HStack } from '@chakra-ui/layout';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Link from '../components/Link';
import Navbar from '../components/Navbar';
import { MetaGameDesc } from '../types/MetaGame';


// markup
const LevelsPage = ({ data }: { data: any }) => {
  const allLevels: MetaGameDesc[] = data.allLevel.nodes
  console.log(allLevels);
  return (
    <main>
      <title>Search Levels - Honu</title>
      <Navbar />
      <HStack>
        <Box>
          <Stack>
            <Heading as="h1" size="lg">Search Levels</Heading>

          </Stack>
          <Stack>
            {allLevels.map(level =>
              <Box key={level.levelId}>
                <Link color='teal.500' to={`/levels/${level.levelId}`}>
                  Level {level.levelId}
                </Link>
              </Box>)}
          </Stack>
        </Box>
      </HStack>
    </main>
  )
}

export default LevelsPage

export const query = graphql`
  query LevelDescriptions {
    allLevel {
      nodes {
        levelId
        difficulty
        levelSchemaVersion
        title
        winCondition
        supportedLibVersion
        shortDescription
        markdownDescription
      }
    }
  }
`