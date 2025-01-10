import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const AddToCart = ({ cartCount }) => {

    return (
        <div className="relative mr-6 mt-2 mb-2">
            <FaShoppingCart
                size={24}
                className="text-white cursor-pointer"
            />
            {cartCount > 0 && (
                <span className="absolute -bottom-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-1 cursor-pointer">
                    {cartCount}
                </span>
            )}
        </div>
    )
}

export default AddToCart
