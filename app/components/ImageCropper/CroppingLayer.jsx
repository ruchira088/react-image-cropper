import React from "react"

export default React.createClass(
  {
    getInitialState()
    {
      return {
        startPoint: {
          x: 0, y: 0
        },
        active: false,
        dimensions: {
          width: 0, height: 0
        }
      }
    },
    handleMouseDown({nativeEvent})
    {
      const {layerX: x, layerY: y} = nativeEvent

      this.setState({
        startPoint: {x, y},
        active: true,
        dimensions: {
          width: 0,
          height: 0
        }
      })
    },
    handleMouseMove({nativeEvent})
    {
      const {active, startPoint: {x, y}} = this.state

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
    },
    handleMouseUp()
    {
      const {startPoint, dimensions} = this.state
      const {onAreaSelected} = this.props

      onAreaSelected({startPoint, dimensions})
      this.setState({active: false})
    },
    render()
    {
      const {width, height} = this.props
      const {startPoint: {x, y}, dimensions} = this.state

      const styles = {
        width,
        height,
        position: "absolute",
        // TODO Modify this later
        backgroundColor: "rgb(100, 100, 100)",
        opacity: "0.5"
      }

      const croppingAreaStyles = {
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        backgroundColor: "red"
      }

      return (
        <div className="cropping-layer" style={styles}
             onMouseDown={this.handleMouseDown}
             onMouseMove={this.handleMouseMove}
             onMouseUp={this.handleMouseUp}>
          <div className="cropping-area" style={croppingAreaStyles}>

          </div>
        </div>
      )
    }

  })