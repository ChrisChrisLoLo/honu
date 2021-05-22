import React from "react"
import { Link } from "gatsby"
import { MetaGame } from "../types/MetaGame";
import Navbar from "../components/Navbar";

interface PropsType {
  pageContext: any
}

// The contents of the JS template wrapper
export default function LevelDescriptionPageContent(props: PropsType) {
  const { pageContext } = props
  const { levelContent, links } = pageContext

  const metagame: MetaGame = levelContent

  return (
    <main>
      <title>Honu Level: {metagame.title}</title>
      <Navbar />
      <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
        {metagame.id}
        <ul>
          IOIIIIUIIII
        </ul>
      </div>
    </main>
  )
}
