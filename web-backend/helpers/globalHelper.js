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

/**
* DOCU: This function is used for pagination and limitation <br>
* This is being called to format date. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {number} page - page number
* @param {number} limit - data limitation per page
* @author Cesar
*/
const paginationAndLimitation = ({ page, limit }) => {
    /* Convert to numbers to determine page number and limit number */
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    /* Calculate the skip value for pagination */
    const skip = (pageNumber - 1) * limitNumber;

    return {
        pageNumber,
        limitNumber,
        skip,
    };
};

/**
* DOCU: This function is used to make first letter and other letter after space to be capitalized. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {string} str - string to be capitalized
* @author Cesar
*/
const capitalizeFirstLetter = (str) => {
    return str
        .split(' ')  /* Split the string into words */
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  /* Capitalize the first letter of each word */
        .join(' ');
};

export { getUploadedImageUrl, paginationAndLimitation, capitalizeFirstLetter };