import React from 'react';
import { capitalizeFirstLetter } from '../../helpers/globalHelpers';

const ItemData = ({ item, openModal }) => {

    return (
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
    )
}

export default ItemData
