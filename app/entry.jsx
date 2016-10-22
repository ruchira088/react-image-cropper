import React from "react"
import {render} from "react-dom"
import request from "superagent"
import ImageCropper from "./components/ImageCropper/ImageCropper.jsx"

const handleImageCropCompleted = croppedImage =>
{
	const formData = new FormData()
	formData.append("croppedImage", croppedImage)

	request
		.post("http://localhost:8001/data")
		.send(formData)
		.then(response =>
		{
			console.log(response)
		})
}

const Sandbox = () => (
	<div className="sandbox">
		<h1>React image cropper</h1>
		<ImageCropper imageCropCompleted={handleImageCropCompleted}/>
	</div>
)

render(<Sandbox/>, document.getElementById("app"))