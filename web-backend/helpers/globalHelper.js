import cloudinary from 'cloudinary';

/**
* DOCU: This function is used to get the image url from the uploaded file using cloudinary. <br>
* This is being called when there's an uploading of images. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {object} image_file - the uploaded image
* @author Cesar
*/
const getUploadedImageUrl = async (image_file) => {
    /* Convert the image file buffer into a base64 encoded string */
    const convert_to_base64 = Buffer.from(image_file.buffer).toString("base64");
    
    /* Construct the data URI for the image */
    const dataURI = `data:${image_file.mimetype};base64,${convert_to_base64}`;

    /* Upload the image to Cloudinary and get the image URL */
    const uploadResult = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResult?.url
}

export { getUploadedImageUrl };