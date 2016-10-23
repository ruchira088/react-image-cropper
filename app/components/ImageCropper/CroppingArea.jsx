import React from "react"

export default React.createClass(
{
  getInitialState()
  {
    const {origin, dimensions} = this.props

    return {
      origin,
      dimensions,
      movable: false
    }
  },
  componentWillReceiveProps(nextProps)
  {
    const {origin, dimensions} = nextProps

    this.setState({origin, dimensions})
  },
  handleMouseDown({nativeEvent})
  {
    const {layerX: x, layerY: y} = nativeEvent

    this.setState({movable: true, movePosition: {x, y}})
  },
  handleMouseMove({nativeEvent})
  {
    const {movable, origin, movePosition} = this.state
    const {layerX, layerY} = nativeEvent

    //console.log(layerX, layerY)

    if(movable)
    {
      const {x, y} = movePosition

      const {dx, dy} = {
        dx:(layerX-x),
        dy:(layerY-y)
      }

      console.log(x, y, layerX, layerY, dx, dy)
      const {x: x0, y: y0} = origin

      this.setState({
        origin:
        {
          x: x0+dx,
          y: y0+dy
        },
        movePosition:
        {
          x: layerX,
          y: layerY
        }
      })
    }
  },
  handleMouseUp()
  {
    this.setState({movable: false})
  },
  render()
  {
    const {origin: {x, y}, dimensions: {width, height}} = this.state

    const style = {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: "red",
      cursor: "move"
    }

    return (
      <div className="cropping-area" style={style}
           onMouseDown={this.handleMouseDown}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp}>
      </div>
    )
  }
})