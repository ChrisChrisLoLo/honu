import {
  Link as ChackraLink, LinkProps
} from '@chakra-ui/react';
import { navigate } from 'gatsby';
import React from 'react';


interface Props extends LinkProps{
  to: string
  children: React.ReactNode
}

// Chackra is dumb and strips away styling of all normal HTML elements.
// This link combines the Chackra link with the 
export default function Link(props:Props) {

  function handleClick(e: any){
    e.preventDefault()
    navigate(props.to)
  }

  return (
    <ChackraLink {...props} onClick={handleClick}>
      {props.children}
    </ChackraLink>
  );
}