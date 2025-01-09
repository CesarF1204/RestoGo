import React, { useState, useEffect } from 'react';
import * as apiClient from '../api-client';
import ItemModal from '../components/ItemModal';
import { capitalizeFirstLetter } from '../helpers/globalHelpers';

const Home = () => {
    /* State to manage items */
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refetchCount, setRefetchCount] = useState(0);

    /* Fetch items when component mounts */
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await apiClient.fetchItems();
                setItems(response.items || []);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [refetchCount]); 

    /* Handle the showing of the modal */
    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    /* Handle the closing of the modal */
    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    /* Handle the closing of the modal when clicking outside the modal */
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('item-modal')) {
            closeModal();
        }
    };

    /* Close the modal on scroll */
    useEffect(() => {
        const handleScroll = () => {
            if (showModal) {
                setTimeout(() => {
                    closeModal();
                }, 150);
            }
        };
        
        window.addEventListener('scroll', handleScroll);

        /* Cleanup event listener on component unmount */
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showModal]);

    return (
        <div className="mt-5">
            <div className="flex flex-wrap -mx-2">
                {items.map((item) => (
                    <div key={item._id} className="w-full md:w-1/3 px-2 mb-4">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="flex justify-center items-center">
                                <img
                                    src={item.image}
                                    className="w-[200px] h-[200px] object-cover"
                                    alt={item.name}
                                />
                            </div>
                            <div className="p-4 text-center">
                                <p className="text-gray-600 text-sm mt-2">
                                    Price: ₱{item.price}
                                </p>
                                <h5 className="text-lg font-bold text-gray-800">
                                    {capitalizeFirstLetter(item.name)}
                                </h5>
                                <p className="text-gray-600 text-sm mt-2">
                                    Quantity: {item.quantity}
                                </p>
                                <button
                                    onClick={() => openModal(item)}
                                    className="mt-3 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <ItemModal
                    showModal={showModal}
                    selectedItem={selectedItem}
                    closeModal={closeModal}
                    handleOutsideClick={handleOutsideClick}
                    setRefetchCount={setRefetchCount}
            />
        </div>
    );

}

export default Home
