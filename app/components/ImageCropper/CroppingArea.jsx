import React from "react"

const BORDER_STYLE_AND_COLOR = "solid black"

export default ({
  origin: {x, y},
  dimensions: {width, height},
  canvasDimensions: {width: canvasWidth, height: canvasHeight},
  onMoveStart,
  pointerEvents
}) =>
{
  const style = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: pointerEvents ? "auto" : "none",
    cursor: "move"
  }

  const parentStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none"
  }

  const inactiveStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `${y}px ${BORDER_STYLE_AND_COLOR}`,
    borderBottom: `${canvasHeight-y-height}px ${BORDER_STYLE_AND_COLOR}`,
    borderLeft: `${x}px ${BORDER_STYLE_AND_COLOR}`,
    borderRight: `${canvasWidth-x-width}px ${BORDER_STYLE_AND_COLOR}`,
    pointerEvents: "none"
  }

  return (
    <div className="cropping-area" style={parentStyle}>
      <div style={inactiveStyle}></div>
      <div style={style} onMouseDown={onMoveStart}>
      </div>
    </div>
  )
}