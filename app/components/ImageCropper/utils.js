import getDOM from "./DOM.js"

const readFileAsDataURL = file => 
(
	new Promise((resolve, reject) => 
	{
		const fileReader = new FileReader()
		fileReader.onload = ({target}) => resolve(target.result)
		fileReader.onerror = error => reject(error)
		fileReader.readAsDataURL(file)
	})
)

// const createImageElement = file =>
// (
// 	readFileAsDataURL(file).then(imageDataURI => 
// 	{
// 		const imageElement = getDOM().createElement("img")
// 		imageElement.src = imageDataURI
		
// 		return imageElement
// 	})
// )

export {
	readFileAsDataURL
}