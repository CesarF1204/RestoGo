import React from 'react'

const Pagination = ({ itemData, page, setPage }) => {
    return (
        <div className="flex justify-center mt-1 mb-4">
            <button
                disabled={page === 1 || itemData?.items?.length === 0}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-700 text-white disabled:bg-gray-400"
            >
                Previous
            </button>
            <span className="px-4 py-2">{`Page ${page} of ${itemData?.totalPages || 1}`}</span>
            <button
                disabled={itemData?.currentPage === itemData?.totalPages || itemData?.items?.length === 0}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-700 text-white disabled:bg-gray-400"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
