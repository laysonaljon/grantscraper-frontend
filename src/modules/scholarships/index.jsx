import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import Table from '../../components/table';
import Toast from '../../components/toast';
import actions from './scholarship_actions';
import constants from './constants';

const Scholarships = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scholarships = useSelector(state => state.scholarships.scholarships);
    const error = useSelector(state => state.scholarships.error);

    const [isLoading, setIsLoading] = useState(false);
    const [isToastVisible, setToastVisible] = useState(false);

    const fetchData = useCallback(async ({ sort, page, limit, filters }) => {
        const params = { sort, page, limit };
        
        if (filters && Object.keys(filters).length > 0) {
            params.filters = filters;
        }

        setIsLoading(true);

        try {
            await dispatch(actions.getScholarships(params)); 
        } catch (error) {
            console.error("Error fetching scholarships:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    // Removed the initial fetch useEffect here

    useEffect(() => {
        if (error) {
            setToastVisible(true);
            const timer = setTimeout(() => {
                setToastVisible(false);
                dispatch(actions.clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleRowClick = (scholarshipId) => {
        navigate(`/${scholarshipId}`);
    };

    return (
        <>
            <Table
                fetchData={fetchData}
                data={scholarships?.items || []}
                meta={scholarships?.meta || {}}
                header={constants.headerConfig}
                title="Scholarships"
                onRowClick={handleRowClick}
                sort="deadline"
                filters={constants.filterOptions}
                isLoading={isLoading}
            />
            
            {isToastVisible && error && (
                <Toast
                    message={error.message}
                    type="error"
                    onClose={() => setToastVisible(false)}
                />
            )}
        </>
    );
};

export default Scholarships;