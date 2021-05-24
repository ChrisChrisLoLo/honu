import { Center, Heading, Stack } from "@chakra-ui/react"
import * as React from "react"
import Navbar from "../components/Navbar"

const IndexPage = () => {
  return (
    <main >
      <title>Home Page</title>
      <Navbar />
      <Center>
        <Stack>
          <Heading as="h1" size="lg">Honu</Heading>
        </Stack>
      </Center>
    </main>
  )
}

export default IndexPage
