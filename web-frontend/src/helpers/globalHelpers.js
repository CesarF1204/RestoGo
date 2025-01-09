/**
* DOCU: This function is used to make first letter and other letter after space to be capitalized. <br>
* Last Updated Date: January 09, 2025 <br>
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

/**
* DOCU: This function is used in search functionality for delays. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {Function} func - The function to be debounced
* @param {number} delay - The delay in milliseconds before the function is executed
* @author Cesar
*/
const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};


export { capitalizeFirstLetter, debounce };