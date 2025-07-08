import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import Table from '../../components/table';
import actions from './scholarship_actions';
import constants from './constants';

const Scholarships = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scholarships = useSelector(state => state.scholarships.scholarships);

    const [isLoading, setIsLoading] = useState(false);


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

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialSort = urlParams.get('sort') || 'deadline';
        const initialFilters = urlParams.has('filters') 
            ? JSON.parse(urlParams.get('filters')) 
            : {};

        fetchData({ sort: initialSort, page: 1, limit: 20, filters: initialFilters });
    }, [fetchData]);

    const handleRowClick = (scholarshipId) => {
        navigate(`/${scholarshipId}`);
    };

    return (
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
    );
};

export default Scholarships;