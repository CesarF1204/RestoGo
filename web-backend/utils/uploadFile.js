import multer from 'multer';

/**
* DOCU: This function is used to handle file upload using multer <br>
* This is being called when there's an uploading of image. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @author Cesar
*/
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 /* 5MB */
    }
});


export default upload;