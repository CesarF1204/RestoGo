import React, { useState, useEffect } from 'react';
import * as apiClient from '../api-client';
import Pagination from '../components/Item/Pagination';
import ItemDetailsModal from '../components/Item/ItemDetailsModal';
import ItemData from '../components/Item/ItemData';
import FiltersAndSearchBar from '../components/Item/FiltersAndSearchBar';

const Home = ({ setCartCount }) => {
    /* State to manage items */
    const [itemData, setItemData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refetchCount, setRefetchCount] = useState(0);

    /* Default state for page, limit, category, search, debouncedSearch, and isFetching  */
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    /* Fetch items when component mounts */
    useEffect(() => {
        const fetchItems = async () => {
            setIsFetching(true);
            try {
                const response = await apiClient.fetchItems({ page, limit, category, search: debouncedSearch });
                setItemData(response || {});
            } catch (error) {
                console.error('Error fetching items:', error);
            }
            finally {
                setIsFetching(false);
            }
        };
        fetchItems();
    }, [refetchCount, page, category, limit, debouncedSearch]); 

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

    /* Handle closing the modal when Escape key is pressed */
    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === 'Escape' && showModal){
                closeModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showModal]);

    /* Reset the page to 1 when the limitation changes */
    useEffect(() => {
        setPage(1);
    }, [limit, category, debouncedSearch]);

    return (
        <div className="mt-5">
            {/* Filters and Search Bar Component */}
            <FiltersAndSearchBar 
                category={category}
                setCategory={setCategory}
                search={search}
                setSearch={setSearch}
                debouncedSearch={debouncedSearch}
                setDebouncedSearch={setDebouncedSearch}
                limit={limit}
                setLimit={setLimit}
                isFetching={isFetching}
            />
            {/* Item Data Component */}
            <div className="flex flex-wrap -mx-2 mt-1">
                {itemData?.items && itemData?.items?.length > 0 ? (
                    itemData?.items?.map((item) => (
                        <ItemData 
                            key={item._id}
                            item={item} 
                            openModal={openModal}
                            setCartCount={setCartCount} 
                        />
                    ))
                ) : (
                    <div className="w-full text-center">
                        <p className="mt-3 text-gray-500">No items available at the moment.</p>
                    </div>
                )}
            </div>
            
            {/* Pagination Component */}
            { itemData?.items?.length !== 0 &&
                <>
                    <Pagination 
                        itemData={itemData} 
                        page={page} 
                        setPage={setPage} 
                    />
                </>
            }
            {/* Item Details Modal */}
            <ItemDetailsModal
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
