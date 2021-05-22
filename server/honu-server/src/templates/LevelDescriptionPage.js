import React from "react"
import { Link } from "gatsby"
import { MetaGame } from "../types/MetaGame";
import Navbar from "../components/Navbar";

// This component is in js since templates do not work as ts files :(
export default function LevelDescriptionPage(props) {
  const { pageContext } = props
  const { levelContent, links } = pageContext

  const metagame = levelContent

  return (
    <>
    <Navbar/>
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      {metagame.id}
      <ul>
        IOIIIIUIIII
        {/* {pageContent.map((data, index) => {
          return <li key={`content_item_${index}`}>{data.item}</li>
        })} */}
      </ul>
      <ul>
        {/* {links.map((item, index) => {
          return (
            <li key={`link_${index}`}>
              <Link to={item.to}>{item.to}</Link>
            </li>
          )
        })} */}
      </ul>
    </div>
    </>
  )
}
