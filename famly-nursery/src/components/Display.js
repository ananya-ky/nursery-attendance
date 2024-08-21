import React, {  useState } from 'react';
import useChildrenData from '../hooks/useChildrenData';
import Pagination from './Pagination';
import ChildrenList from './ChildrenList';

const Display = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { displayedChildren, error, totalPages, checkInTimes, handleCheckInTimeChange, checkInChild, checkOutChild } = useChildrenData(currentPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
   

    return (
        <div className="p-4">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-teal-500 text-white p-4 shadow-md z-10">
                <h1 className="text-3xl font-bold text-center">Nursery Attendance</h1>
            </header>
            
            {/* Content */}
            <div className="pt-20">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {displayedChildren.length > 0 ? (
                    <>
                        <ChildrenList
                            displayedChildren={displayedChildren}
                            checkInTimes={checkInTimes}
                            handleCheckInTimeChange={handleCheckInTimeChange}
                            checkInChild={checkInChild}
                            checkOutChild={checkOutChild}
                        />

                        {/* Pagination  */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p>No children data.</p>
                )}
            </div>
        </div>
    );
};

export default Display;
