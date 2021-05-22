import React from "react"
import LevelDescriptionPageContent from "./LevelDescriptionPageContent";

// This component is in js since templates do not work as ts files :(
// Hacked as a JS wrapper. Actual content in nested component
export default function LevelDescriptionPage(props) {
  const { pageContext } = props

  return (
    <LevelDescriptionPageContent pageContext={pageContext}/>
  )
}
