import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const DeleteModal = ({ setShowDeleteModal, closeModal, setRefetchCount, itemId: item_id }) => {
    /* Extract showToast function from context */
    const { showToast } = useAppContext();
    /* Navigate to different routes */
    const navigate = useNavigate();

    /* Function to delete the selected item */
    const handleItemDelete = async () => {
        try{
            /* Use deleteItem from api-client for deleting an item */
            const response = await apiClient.deleteItem(item_id);

            /* Check if response valid */
            if(response){
                /* Show success toast */
                showToast({ message: "Item Deleted", type: "SUCCESS" });
                /* Close modals */
                closeModal();
                /* Use to refetch items after successful deletion */
                setRefetchCount((prev) => prev + 1);
                /* Navigate to home */
                navigate('/');
            }
            else{
                throw new Error('Failed to delete item');
            }
        }
        catch(error){
            console.error('Error deleting item:', error);
            showToast({ message: error.message, type: "ERROR"});
        }
        finally{
            /* Always set showDeleteModal back to false and call closeModal() regardless whether the deletion succeeds or fails. */
            setShowDeleteModal(false);
            closeModal();
        }
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-800">Are you sure you want to delete this item?</h2>
                <div className="mt-4 flex justify-end space-x-4">
                    <button 
                        onClick={() => setShowDeleteModal(false)} 
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleItemDelete} 
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
