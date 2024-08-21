import React from 'react';

const ChildrenList = ({ displayedChildren, checkInTimes, handleCheckInTimeChange, checkInChild, checkOutChild }) => (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {displayedChildren.map(child => (
                <tr key={child.childId} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-4">
                        <img src={child.image.small} alt={child.name.fullName} className="w-10 h-10 rounded-full" />
                        <span>{child.name.fullName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-start">
                                <input
                                    type="time"
                                    value={checkInTimes[child.childId] || '16:00'}
                                    onChange={(e) => handleCheckInTimeChange(child.childId, e.target.value)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                                <span className="text-gray-600 mt-1">Pick-up time</span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => checkInChild(child.childId)}
                                    className="text-green-500 hover:text-green-700 font-bold"
                                >
                                    Check In
                                </button>
                                <button
                                    onClick={() => checkOutChild(child.childId)}
                                    className={`text-blue-500 hover:text-blue-700 font-bold ${!child.checkedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!child.checkedIn}
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${child.checkedIn ? 'text-green-500' : 'text-blue-500'}`}>
                        {child.status || ''}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ChildrenList;
