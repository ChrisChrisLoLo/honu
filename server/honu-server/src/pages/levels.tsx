import { graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import Navbar from '../components/Navbar';
import { MetaGameDesc } from '../types/MetaGame';


// markup
const LevelsPage = ({ data }: { data: any }) => {
  const allLevels: MetaGameDesc[] = data.allLevel.nodes
  console.log(allLevels);
  return (
    <main>
      <title>Search Levels - Honu</title>
      {/* <Navbar /> */}
      <Container>
        <Row>
          <Col>
            <h1>Search Levels</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {allLevels.map(level =>
                <div key={level.levelId}>
                  <Link to={`/levels/${level.levelId}`}>
                    Level {level.levelId}
                  </Link>
                </div>)}
            </div>
          </Col>
        </Row>
      </Container>
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