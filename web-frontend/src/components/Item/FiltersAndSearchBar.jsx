import React, { useCallback } from 'react';
import { debounce } from '../../helpers/globalHelpers';

const FiltersAndSearchBar = ({ category, setCategory, search, setSearch, debouncedSearch, setDebouncedSearch, limit, setLimit, isFetching }) => {
    /* Debounce the search input */
    const handleSearch = useCallback(
        debounce((value) => {
            setDebouncedSearch(value);
        }, 1500),
        []
    );

    /* Handle search input change */
    const onSearchChange = (e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div className="flex justify-between mt-2">
            {/* Meal Category */}
            <div className="mt-2">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                    <option value=''>All</option>
                    <option value='breakfast'>Breakfast</option>
                    <option value='lunch'>Lunch</option>
                    <option value='dinner'>Dinner</option>
                    <option value='drinks'>Drinks</option>
                </select>
            </div>
            <div className="flex justify-around mt-2">
                {/* Search Bar */}
                <div className="flex px-4 py-2 ml-2 rounded-md border-2 border-blue-500 overflow-hidden max-w-full sm:max-w-md font-[sans-serif]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 mr-3 rotate-90">
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={onSearchChange}
                        className="w-full outline-none bg-transparent text-gray-600 text-sm"
                    />
                    {debouncedSearch && isFetching && <div className="ml-2 animate-spin border-t-2 border-blue-500 rounded-full w-4 h-4"></div>}
                </div>
                {/* Dropdown for selecting limit */}
                <div className="ml-2">
                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="px-4 py-2 bg-gray-700 text-white rounded-md"
                    >
                        <option value={6}>6 per page</option>
                        <option value={12}>12 per page</option>
                        <option value={24}>24 per page</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FiltersAndSearchBar
