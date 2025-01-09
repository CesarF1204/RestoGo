const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
* DOCU: This function is used for fetching all items that sends a GET request to the /api/items endpoint. <br>
* This is being called when user want to get all items. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @author Cesar
*/
const fetchItems = async () => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/items`, {
            method: 'GET',
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
    catch(error){
        console.error('Error fetching items:', error);
    }
}

/**
* DOCU: This function is used for fetching details for specific item that sends a GET request to the /api/items/:id endpoint. <br>
* This is being called when user want to get the details of an specific item. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {integer} id - id of an item
* @author Cesar
*/
const fetchItemById = async (id) => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
            method: 'GET',
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
    catch(error){
        console.error('Error fetching items:', error);
    }
}

/**
* DOCU: This function is used for creating the item that sends a POST request to the /api/items endpoint. <br>
* This is being called when user want to create an item. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {object} form_data - { name, description, image, price, quantity } - values of an item to be created
* @author Cesar
*/
const createItem = async (form_data) => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    }
    catch(error){
        console.error('Error creating item:', error);
    }
}

/**
* DOCU: This function is used for updating the item that sends a PUT request to the /api/items/:id endpoint. <br>
* This is being called when user want to update an item. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {integer} id - id of an item
* @param {object} form_data - { name, description, image, price, quantity } - values of an item to be updated
* @author Cesar
*/
const updateItem = async (id, form_data) => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_data),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    }
    catch(error){
        console.error('Error updating item:', error);
    }
}

/**
* DOCU: This function is used for deleting the item that sends a DELETE request to the /api/items/:id endpoint. <br>
* This is being called when user want to delete an item. <br>
* Last Updated Date: January 08, 2025 <br>
* @function
* @param {integer} id - id of an item
* @author Cesar
*/
const deleteItem = async (id) => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    }
    catch(error){
        console.error('Error deleting item:', error);
    }
}

export {
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
}