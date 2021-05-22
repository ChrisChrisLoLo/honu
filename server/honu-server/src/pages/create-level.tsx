import { Center, Heading } from '@chakra-ui/layout';
import { Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import LevelCreationForm from '../components/level-editor/LevelCreationForm';
import Navbar from '../components/Navbar';

// markup
const CreateLevelPage = () => {

  return (
    <main>
      <title>Create Honu level</title>
      <Navbar />
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
