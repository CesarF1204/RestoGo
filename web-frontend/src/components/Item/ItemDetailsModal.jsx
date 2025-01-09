import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DeleteItemModal from './DeleteItemModal';
import { capitalizeFirstLetter } from '../../helpers/globalHelpers';

const ItemDetailsModal = ({ showModal, selectedItem, closeModal, handleOutsideClick, setRefetchCount }) => {
    /* State for showing delete modal */
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    /* Check if modal is not shown or no item is selected, return null (don't render anything) */
    if (!showModal || !selectedItem) return null;
    
    return (
        <div
            className="item-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            aria-labelledby="itemModalLabel"
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                    <h5
                        className="text-lg font-semibold text-gray-800"
                        id="itemModalLabel"
                    >
                        {capitalizeFirstLetter(selectedItem.name)}
                    </h5>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex justify-center mb-3">
                        <img
                            src={selectedItem.image}
                            className="w-full max-h-60 object-contain"
                            alt={selectedItem.name}
                        />
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                        <strong className="font-medium">Price:</strong> ₱{selectedItem.price}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                        <strong className="font-medium">Quantity:</strong> {selectedItem.quantity}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                        <strong className="font-medium">Category:</strong> {capitalizeFirstLetter(selectedItem.mealCategory)}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong className="font-medium">Description:</strong> {selectedItem.description}
                    </p>
                    {/* Admin Actions */}
                    <div className="flex space-x-4 items-center mt-6">
                        <Link to={`/edit_item/${selectedItem._id}`} className="text-blue-400 hover:text-blue-600 inline-flex items-center">
                            <FaEdit className="mr-1" /> Edit 
                        </Link>
                        <Link className="text-red-400 hover:text-red-600 inline-flex items-center" onClick={() => setShowDeleteModal(true)}>
                            <FaTrashAlt className="mr-1" /> Delete 
                        </Link>
                    </div>
                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <DeleteItemModal setShowDeleteModal={setShowDeleteModal} closeModal={closeModal} itemId={selectedItem._id} setRefetchCount={setRefetchCount} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemDetailsModal
