const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export {
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
}