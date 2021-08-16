import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LevelCreationForm from '../components/level-editor/LevelCreationForm';
// import Navbar from '../components/Navbar';

// markup
const CreateLevelPage = () => {

  return (
    <main>
      <title>Create Honu level</title>
      {/* <Navbar /> */}
      <Container>
        <Row>
          <Col>
            <h1>Create Honu level</h1>
            <LevelCreationForm />
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default CreateLevelPage;
