import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useChildrenData = (currentPage) => {
    const [children, setChildren] = useState([]);
    const [displayedChildren, setDisplayedChildren] = useState([]);
    const [error, setError] = useState(null);
    const [checkInTimes, setCheckInTimes] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const recordsPerPage = 10;

    const fetchChildren = useCallback(async () => {
        setLoading(true);
        const source = axios.CancelToken.source(); // Create a cancel token

        try {
            const url = new URL('https://app.famly.co/api/daycare/tablet/group');
            url.searchParams.append('accessToken', process.env.REACT_APP_API_KEY);
            url.searchParams.append('groupId', '86413ecf-01a1-44da-ba73-1aeda212a196');
            url.searchParams.append('institutionId', 'dc4bd858-9e9c-4df7-9386-0d91e42280eb');

            const response = await axios.get(url.toString(), {
                cancelToken: source.token, // Attach the cancel token
            });

            if (response.status === 200) {
                const allChildren = response.data.children.map(child => ({
                    ...child,
                    status: child.checkedIn ? 'Checked In' : 'Checked Out'
                }));

                setTotalPages(Math.ceil(allChildren.length / recordsPerPage));

                // Preserve check-in times
                const updatedCheckInTimes = allChildren.reduce((acc, child) => {
                    acc[child.childId] = checkInTimes[child.childId] || '16:00';
                    return acc;
                }, {});

                setChildren(allChildren);
                setCheckInTimes(updatedCheckInTimes);
                updateDisplayedChildren(allChildren, currentPage);
            } else {
                setError(`Error ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                setError('Error fetching children: ' + error.message);
            }
        } finally {
            setLoading(false);
        }

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [currentPage, checkInTimes]);

    useEffect(() => {
        fetchChildren();
    }, [currentPage]);

    const updateDisplayedChildren = (allChildren, page) => {
        const startIndex = (page - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        setDisplayedChildren(allChildren.slice(startIndex, endIndex));
    };

    const handleCheckInTimeChange = (childId, time) => {
        setCheckInTimes(prev => ({ ...prev, [childId]: time }));
    };

    const checkInChild = async (childId) => {
        const time = checkInTimes[childId] || '16:00';
        try {
            await axios.post(`https://app.famly.co/api/v2/children/${childId}/checkins`, {
                accessToken: process.env.REACT_APP_API_KEY,
                pickupTime: time
            });
            fetchChildren(); // Fetch children after check-in
        } catch (error) {
            console.error('Error checking in child:', error.message);
        }
    };

    const checkOutChild = async (childId) => {
        try {
            await axios.post(`https://app.famly.co/api/v2/children/${childId}/checkout`, {
                accessToken: process.env.REACT_APP_API_KEY
            });
            fetchChildren(); // Fetch children after check-out
        } catch (error) {
            console.error('Error occured while checking out child:', error.message);
        }
    };

    return { displayedChildren, error, totalPages, checkInTimes, handleCheckInTimeChange, checkInChild, checkOutChild, loading };
};

export default useChildrenData;

