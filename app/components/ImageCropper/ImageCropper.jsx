import React from "react"
import {readFileAsDataURL} from "./utils"
import FileUpload from "./FileUpload.jsx"
import ImageCanvas from "./ImageCanvas.jsx"

export default React.createClass(
{
	getInitialState()
	{
		return {
			imageDataURI: null
		}
	},
	handleFileChange(imageFile)
	{
		readFileAsDataURL(imageFile)
			.then(imageDataURI => this.setState({imageDataURI}))
	},
	render()
	{
		const {imageDataURI} = this.state
		const {imageCropCompleted} = this.props

		if(imageDataURI)
		{
			return <ImageCanvas imageDataURI={imageDataURI} imageCropCompleted={imageCropCompleted}/>
		} else
		{
			return (
				<div className="image-cropper">
					<FileUpload onFileChange={this.handleFileChange}/>
				</div>
			)
		}
	}
})