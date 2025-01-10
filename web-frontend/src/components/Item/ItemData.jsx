import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { capitalizeFirstLetter } from '../../helpers/globalHelpers';

const ItemData = ({ item, openModal, setCartCount }) => {
    /* Navigate to different routes */
    const navigate = useNavigate();

    const { showToast, isLoggedIn } = useAppContext();

    /* Function to handle add to cart */
    const handleAddToCart = () => {
        /* Check if user is logged in, if not then redirect to /sign_in page */
        if(isLoggedIn) {
            setCartCount((prevCount) => prevCount + 1);
        }
        else{
            showToast({ message: "You are not logged in. Please log in to continue.", type: "ERROR"});
            navigate('/sign_in');
        }
    };
    
    return (
        <div key={item._id} className="w-full md:w-1/3 px-2 mb-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative flex justify-center items-center group">
                    <img
                        src={item.image}
                        className="w-[200px] h-[200px] object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50 cursor-pointer"
                        alt={item.name}
                        onClick={() => openModal(item)}
                    />
                    <button
                        onClick={() => openModal(item)}
                        className="absolute opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-white p-3 rounded hover:bg-[#3b5e91] bg-[#4672b1]"
                    >
                        View Details
                    </button>
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
                        onClick={handleAddToCart}
                        className="mt-3 px-4 py-2 bg-gray-700 text-white rounded hover:bg-orange-600 transform hover:scale-105 transition duration-100"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemData
