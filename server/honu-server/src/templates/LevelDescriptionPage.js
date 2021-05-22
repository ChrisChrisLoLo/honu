import React from "react"
import { Link } from "gatsby"
import { MetaGame } from "../types/MetaGame";

export default function LevelDescriptionPage(props) {
  const { pageContext } = props
  const { levelContent, links } = pageContext

  const metagame = levelContent

  return (
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
  )
}
