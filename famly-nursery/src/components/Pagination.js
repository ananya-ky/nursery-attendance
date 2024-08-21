import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex flex-col items-center mt-4">
        <div className="flex items-center space-x-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                className="bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
        <div className="mt-2">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
);

export default Pagination;
