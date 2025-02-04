import React from 'react'

function HiglightedText(props) {
  return (
    <span className="text-blue-300">
      &nbsp;{props.text}
    </span>
  )
}

export default HiglightedText
