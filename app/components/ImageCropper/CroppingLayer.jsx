import React from "react"
import CroppingArea from "./CroppingArea.jsx"

export default React.createClass(
  {
    getInitialState()
    {
      return {
        startingPoint: {
          x: 0, y: 0
        },
        active: false,
        completed: false,
        dimensions: {
          width: 0, height: 0
        }
      }
    },
    handleMouseDown({nativeEvent})
    {
      const {completed} = this.state

      if (!completed)
      {
        const {layerX: x, layerY: y} = nativeEvent

        this.setState({
          startingPoint: {x, y},
          active: true,
          dimensions: {
            width: 0,
            height: 0
          }
        })
      }
    },
    handleMouseMove({nativeEvent})
    {
      const {completed, active, startingPoint: {x, y}} = this.state

      if (active)
      {
        const {layerX: x1, layerY: y1} = nativeEvent

        this.setState(
          {
            dimensions: {
              width: x1 - x,
              height: y1 - y
            }
          })
      }
      else if (completed)
      {

      }
    },
    handleMouseUp()
    {
      const {startingPoint, dimensions, completed} = this.state
      const {onAreaSelected} = this.props

      if(!completed)
      {
        onAreaSelected({startingPoint, dimensions})
        this.setState({active: false, completed: true})
      } else
      {

      }
    },
    render()
    {
      const {width, height} = this.props
      const {startingPoint, dimensions} = this.state

      const styles = {
        width,
        height,
        position: "absolute",
        cursor: "crosshair",
        // TODO Modify this later
        backgroundColor: "rgb(100, 100, 100)",
        opacity: "0.5"
      }

      return (
        <div className="cropping-layer" style={styles}
             onMouseDown={this.handleMouseDown}
             onMouseMove={this.handleMouseMove}
             onMouseUp={this.handleMouseUp}>
          <CroppingArea origin={startingPoint} dimensions={dimensions}/>
        </div>
      )
    }

  })