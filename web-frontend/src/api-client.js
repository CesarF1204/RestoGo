const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
* DOCU: This function is used for fetching all items that sends a GET request to the /api/items endpoint. <br>
* This is being called when user want to get all items. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {object} { page, category, limit, search } - for pagination, filtering, and searching
* @author Cesar
*/
const fetchItems = async ({ page, category, limit, search }) => {
    /* Params for filtering */
    const queryParams = new URLSearchParams({
        page,
        category,
        limit,
        search
    }).toString();

    const response = await fetch(`${API_BASE_URL}/api/items?${queryParams}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for fetching details for specific item that sends a GET request to the /api/items/:id endpoint. <br>
* This is being called when user want to get the details of an specific item. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {integer} id - id of an item
* @author Cesar
*/
const fetchItemById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for creating the item that sends a POST request to the /api/items endpoint. <br>
* This is being called when user want to create an item. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {string} token - authorization token
* @param {object} form_data - { name, description, image, price, quantity } - values of an item to be created
* @author Cesar
*/
const createItem = async (token, form_data) => {
    const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: form_data,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for updating the item that sends a PUT request to the /api/items/:id endpoint. <br>
* This is being called when user want to update an item. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {string} token - authorization token
* @param {integer} id - id of an item
* @param {object} form_data - { name, description, image, price, quantity } - values of an item to be updated
* @author Cesar
*/
const updateItem = async (token, id, form_data) => {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: form_data,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for deleting the item that sends a DELETE request to the /api/items/:id endpoint. <br>
* This is being called when user want to delete an item. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {string} token - authorization token
* @param {integer} id - id of an item
* @author Cesar
*/
const deleteItem = async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for validating token that sends a GET request to the /api/auth/validate_token endpoint. <br>
* This is being called when user want to get the details of an specific item. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @author Cesar
*/
const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate_token`, {
        method: 'GET',
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for signing in users that sends a POST request to the /api/users/sign_in endpoint. <br>
* This is being called when user want to sign in. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {object} form_data - { email, password } - values of the sign in form
* @author Cesar
*/
const signIn = async (form_data) => {
    const response = await fetch(`${API_BASE_URL}/api/users/sign_in`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for registering account that sends a POST request to the /api/users/register endpoint <br>
* This is being called when user want create an account. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @param {object} form_data - { firstName, lastName, email, password } - values of the register form
* @author Cesar
*/
const register = async (form_data) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

/**
* DOCU: This function is used for logging out user that sends a POST request to the /api/users/logout endpoint <br>
* This is being called when user want to log out. <br>
* Last Updated Date: January 11, 2025 <br>
* @function
* @author Cesar
*/
const logOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    
    if (!response.ok) {
        throw new Error(data.message);
    }
}

export {
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
    validateToken,
    signIn,
    register,
    logOut,
}