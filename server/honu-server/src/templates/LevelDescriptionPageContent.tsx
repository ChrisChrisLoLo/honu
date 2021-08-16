import React from "react"
import { MetaGame } from "../types/MetaGame";
// import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import TestCasePreview from "../components/level-detail/LevelPreviewTabs";
import { Container } from "@inlet/react-pixi";
import { Col, Row } from "react-bootstrap";

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
      {/* <Navbar /> */}
      <Container>
        <Row>
          <Col>
            <div>
              <h2>
                {metagame.title}
              </h2>
              <h2>
                {metagame.shortDescription}
              </h2>
              <p>
                Difficulty: {metagame.difficulty}/5
              </p>
              <p>
                Win Condition: {capitalize(metagame.winCondition.replaceAll('_',' '))}
              </p>
              <ReactMarkdown>
                {metagame.markdownDescription}
              </ReactMarkdown>
            </div>
          </Col>
          <Col>
            <TestCasePreview metagame={metagame}/>
          </Col>
        </Row>
      </Container>
    </main>
  )
}
