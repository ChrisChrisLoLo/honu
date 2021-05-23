import { Center, Heading, HStack } from '@chakra-ui/layout';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';


// markup
const SearchPage = ({ data }: { data: any }) => {

  return (
    <main>
      <title>Search Levels - Honu</title>
      <Navbar />
      <HStack>
        <Box>
          <Stack>
            <Heading as="h1" size="lg">Search Levels</Heading>
          </Stack>
        </Box>
      </HStack>
    </main>
  )
}

export default SearchPage;

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