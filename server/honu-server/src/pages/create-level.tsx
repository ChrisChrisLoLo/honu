import { Center, Heading } from '@chakra-ui/layout';
import { ColorModeScript, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import LevelCreationForm from '../components/level-editor/LevelCreationForm';

// markup
const CreateLevelPage = () => {

  return (
    <main>
      <title>Create Honu level</title>
      <Center>
        <Stack>
          <Heading as="h1" size="lg">Create Honu level</Heading>
          <LevelCreationForm />
        </Stack>
      </Center>
    </main>
  )
}

export default CreateLevelPage;
