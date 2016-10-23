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
        moving: false,
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
      const {completed, moving, active, startingPoint: {x, y}, dimensions} = this.state
      const {onAreaSelected} = this.props
      const {layerX: x1, layerY: y1} = nativeEvent

      if (active)
      {
        this.setState(
          {
            dimensions: {
              width: x1 - x,
              height: y1 - y
            }
          })
      }
      else if (completed && moving)
      {
        const {movingPoint} = this.state

        if(movingPoint)
        {
          const {x: x0, y: y0} = movingPoint
          const dx = x1 - x0
          const dy = y1 - y0

          const startingPoint = {x: x+dx, y: y+dy}

          this.setState(
            {
              startingPoint,
              movingPoint: {x: x1, y: y1}
            })

          onAreaSelected({dimensions, startingPoint})
        }
        else
        {
          this.setState({movingPoint: {x: x1, y: y1}})
        }
      }
    },
    handleMouseUp()
    {
      const {moving, startingPoint, dimensions, completed} = this.state
      const {onAreaSelected} = this.props

      if(!completed)
      {
        onAreaSelected({startingPoint, dimensions})
        this.setState({active: false, completed: true})
      }
      else if (moving)
      {
        this.setState({moving: false, movingPoint: null})
      }
    },
    render()
    {
      const {width, height} = this.props
      const {startingPoint, dimensions, moving, active} = this.state

      const styles = {
        width,
        height,
        position: "absolute",
        cursor: moving ? "move" : "crosshair",
        // TODO Modify this later
        backgroundColor: "rgb(100, 100, 100)",
        opacity: "0.5"
      }

      return (
        <div className="cropping-layer" style={styles}
             onMouseDown={this.handleMouseDown}
             onMouseMove={this.handleMouseMove}
             onMouseUp={this.handleMouseUp}>
          <CroppingArea
            origin={startingPoint}
            pointerEvents={!(moving || active)}
            dimensions={dimensions}
            onMoveStart={() => this.setState({moving: true})}/>
        </div>
      )
    }

  })