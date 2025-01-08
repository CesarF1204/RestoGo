import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const EditItem = () => {
    const [ isUpdating, setIsUpdating ] = useState(false);
    
    /* Navigate to different routes */
    const navigate = useNavigate();

    const { showToast } = useAppContext();

    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    /* State to manage items */
    const [item, setItem] = useState({});

    /* Get item id in params */
    const { id: item_id } = useParams();

    /* Fetch specific item when component mounts */
    useEffect(() => {
        const fetchItemById = async () => {
            try {
                const response = await apiClient.fetchItemById(item_id);
                setItem(response || []);
                if(response){
                    /* Populate form fields with fetched data */
                    Object.keys(response).forEach((key) => {
                        setValue(key, response[key]);
                    });
                }
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItemById();
    }, [item_id, setValue]); 

    /* Function to update item from the API */
    const onSubmit = async (form_data) => {
        try{
            console.log('form_data :>> ', form_data);
            if (typeof form_data.image === 'object' && Object.keys(form_data.image).length === 0) {
                form_data.image = item.image;
            }

            setIsUpdating(true);

            const response = await apiClient.updateItem(item_id, form_data);

            if(response){
                /* Show success toast */
                showToast({ message: "Item Updated", type: "SUCCESS" })

                setIsUpdating(false);
                navigate('/');
            }
            else{
                setIsUpdating(false);
                throw new Error('Failed to update item');
            }

        }
        catch(error){
            console.error('Error updating item:', error);
            showToast({ message: error.message, type: "ERROR"});
        }
    }

    return (
        <div className="flex flex-col items-center mt-4">
            <h1 className="text-2xl font-bold">Edit Item</h1>
            <form encType="multipart/form-data" className="flex flex-col max-w-sm w-full" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" className="mb-2 font-medium">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={item.name}
                    {...register("name", { required: "*This field is required" })}
                />
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}

                <label htmlFor="description" className="mb-2 font-medium">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={item.description}
                    {...register("description", { required: "*This field is required" })}
                />
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}

                <label htmlFor="description" className="mb-2 font-medium">Meal Category:</label>
                <select 
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={item.mealCategory}
                    {...register('mealCategory', { required: '*This field is required' })}>
                        <option value="">---</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="drinks">Drinks</option>
                </select>
                {errors.mealCategory && (
                    <span className="text-red-500">{errors.mealCategory.message}</span>
                )}
                
                <label htmlFor="item_image" className="mb-2 font-medium">Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("image")}
                />
                {errors.image && (
                    <span className="text-red-500">{errors.image.message}</span>
                )}

                <label htmlFor="price" className="mb-2 font-medium">Price:</label>
                <input
                    type="number"
                    id="price"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={item.price}
                    {...register("price", { required: "*This field is required", validate: value => value >= 0 || "*Price must be greater than or equal to 0" })}
                />
                {errors.price && (
                    <span className="text-red-500">{errors.price.message}</span>
                )}

                <label htmlFor="quantity" className="mb-2 font-medium">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    className="p-2 rounded border border-gray-300 ring-2 ring-black-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue={item.quantity}
                    {...register("quantity", { required: "*This field is required", validate: value => value >= 0 || "*Quantity must be greater than or equal to 0" })}
                />
                {errors.quantity && (
                    <span className="text-red-500">{errors.quantity.message}</span>
                )}

                <button 
                    type="submit" 
                    className={`px-4 py-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition 
                            ${isUpdating ? 'cursor-not-allowed' : ''}`}
                    disabled={isUpdating ? true : false}
                >
                    {isUpdating ? 'Updating Item...' : 'Update Item'}
                </button>
            </form>
            <button className="flex items-center px-4 py-2 mt-4 mb-4 bg-gray-700 text-white disabled:bg-gray-400" onClick={() => navigate(-1)}>
                <FaArrowLeft className="mr-2" /> Go Back
            </button>
        </div>
    )
}

export default EditItem
