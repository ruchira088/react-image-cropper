import React from "react"

export default ({origin: {x, y}, dimensions: {width, height}, onMoveStart, pointerEvents}) =>
{
  const style = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "red",
    pointerEvents: pointerEvents ? "auto": "none",
    cursor: "move"
  }

  return (
    <div className="cropping-area" style={style} onMouseDown={onMoveStart}>
    </div>
  )
}