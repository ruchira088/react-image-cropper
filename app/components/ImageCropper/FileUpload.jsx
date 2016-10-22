import React from "react"

const handleFileChange = onFileChange => ({target}) =>
{
	const [imageFile] = target.files
	onFileChange(imageFile)
}

export default ({onFileChange}) => 
(
	<div>
		<input type="file" onChange={handleFileChange(onFileChange)}/>
	</div>
)