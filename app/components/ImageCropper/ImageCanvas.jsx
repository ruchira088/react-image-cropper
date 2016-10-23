import React from "react"
import getDOM from "./DOM.js"
import CroppingLayer from "./CroppingLayer.jsx"

const createImageElement = imageDataURI =>
{
  const imageElement = getDOM().createElement("img")
  imageElement.src = imageDataURI

  return imageElement
}

export default React.createClass(
  {
    getInitialState()
    {
      return {
        width: 0,
        height: 0,
        croppedImage: {
          imageBitmap: null,
          width: 0,
          height: 0
        }
      }
    },
    componentDidMount()
    {
      const {imageDataURI} = this.props

      const {width, height} = createImageElement(imageDataURI)
      this.setState({width, height})
    },
    componentDidUpdate()
    {
      this.drawImage()
      this.drawCroppedImage()
    },
    drawImage()
    {
      const {canvas} = this
      const {imageDataURI} = this.props

      const imageElement = createImageElement(imageDataURI)

      const context = canvas.getContext("2d")
      context.drawImage(imageElement, 0, 0)
    },
    drawCroppedImage()
    {
      const {outputCanvas} = this
      const {croppedImage: {imageBitmap}} = this.state

      if(imageBitmap)
      {
        outputCanvas.getContext("2d").drawImage(imageBitmap, 0, 0)
      }
    },
    handleOnAreaSelected({startingPoint: {x, y}, dimensions: {height, width}})
    {
      const {canvas} = this
      const context = canvas.getContext("2d")

      const imageData = context.getImageData(x, y, width, height)

      createImageBitmap(imageData)
        .then(imageBitmap =>
        {
          this.setState({
              croppedImage: {
                imageBitmap,
                width,
                height
              }
            })
        })
    },
    handleOKButtonClick()
    {
      const {outputCanvas} = this
      const {imageCropCompleted} = this.props

      outputCanvas.toBlob(blobImage => {
        imageCropCompleted(new File([blobImage], "croppedImage.png"))
      })
    },
    createAcceptButton()
    {
      const {croppedImage: {imageBitmap}} = this.state

      if(imageBitmap)
      {
        return <button type="button" onClick={this.handleOKButtonClick}>OK</button>
      } else
      {
        return null
      }
    },
    render()
    {
      const {height, width, croppedImage} = this.state

      return (
        <div className="image-canvas" style={{position: "relative"}}>
          <CroppingLayer width={width} height={height} onAreaSelected={this.handleOnAreaSelected}/>
          <canvas width={width} height={height} ref={ref => this.canvas = ref}>
          </canvas>
          <canvas width={croppedImage.width} height={croppedImage.height}
                  ref={ref => this.outputCanvas = ref}>
          </canvas>
          {
            this.createAcceptButton()
          }
        </div>
      )
    }
  })