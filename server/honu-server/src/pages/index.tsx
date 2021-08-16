import { Container } from "@inlet/react-pixi"
import * as React from "react"
import { Col, Row } from "react-bootstrap"
// import Navbar from "../components/Navbar"

const IndexPage = () => {
  return (
    <main >
      <title>Home Page</title>
      {/* <Navbar /> */}
      <Container>
        <Row>
          <Col>
            <h1>Honu</h1>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default IndexPage
