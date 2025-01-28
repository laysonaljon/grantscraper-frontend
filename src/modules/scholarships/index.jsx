import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/table';
import actions from './scholarship_actions';
import constants from './constants';

const Scholarships = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scholarships = useSelector(state => state.scholarships.scholarships);

    // Define the fetchData function
    const fetchData = ({ sort, page, limit, filters }) => {
        const params = { sort, page, limit };
        
        // Add filters to params if they exist
        if (filters && Object.keys(filters).length > 0) {
            params.filters = filters;
        }

        dispatch(actions.getScholarships(params));
    };

    // Handle row click to navigate to the scholarship details page
    const handleRowClick = (scholarshipId) => {
        navigate(`/${scholarshipId}`);
    };

    return (
        <Table
            fetchData={fetchData}
            data={scholarships.items}
            meta={scholarships.meta}
            header={constants.headerConfig}
            title="Scholarships"
            onRowClick={handleRowClick}
            sort='deadline'
            filters={constants.filterOptions}
        />
    );
};

export default Scholarships;
