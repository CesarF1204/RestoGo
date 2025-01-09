/* Make first letter and other letter after space to be capitalized */
const capitalizeFirstLetter = (str) => {
    return str
        .split(' ')  /* Split the string into words */
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))  /* Capitalize the first letter of each word */
        .join(' ');
};


export { capitalizeFirstLetter };