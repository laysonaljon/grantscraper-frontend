import React, { useState, useEffect } from 'react';
import Filters from './Filters';

const Table = ({
  fetchData,
  data,
  meta,
  header,
  title,
  onRowClick,
  sort,
  filters,
}) => {
  const [sortKey, setSortKey] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({});

  const updateURLParams = (params) => {
    const url = new URL(window.location);
    
    if (params.sort) {
      url.searchParams.set('sort', params.sort);
    } else {
      url.searchParams.delete('sort');
    }

    if (params.filters && Object.keys(params.filters).length > 0) {
      url.searchParams.set('filters', JSON.stringify(params.filters));
    } else {
      url.searchParams.delete('filters');
    }

    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set sortKey from URL or default to prop if not present
    const initialSortKey = urlParams.get('sort') || sort;
    setSortKey(initialSortKey);

    // Check for filters in URL
    const initialFilters = urlParams.has('filters') 
      ? JSON.parse(urlParams.get('filters')) 
      : {};

    setSelectedFilters(initialFilters);

    // Fetch data with initial parameters
    fetchData({ sort: initialSortKey, page: currentPage, limit: 5, filters: initialFilters });
  }, []); // Run once on mount

  useEffect(() => {
    if (sortKey) {
      fetchData({ sort: sortKey, page: currentPage, limit: 5, filters: selectedFilters });
      
      updateURLParams({
        sort: sortKey,
        filters: selectedFilters,
      });
    }
  }, [sortKey, currentPage, selectedFilters]);

  const handleSort = (newSortKey) => {
    setSortKey((prev) => (prev === newSortKey ? `-${newSortKey}` : newSortKey));
    setCurrentPage(1); // Reset to the first page when sorting
  };

  const loadMore = () => {
    if (meta.next_page !== null) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onFilter = (updatedFilters) => {
    setSelectedFilters(updatedFilters);
    setCurrentPage(1); // Reset to first page when filters change
    updateURLParams({ sort: sortKey, filters: updatedFilters }); // Update URL with new filters

    fetchData({ sort: sortKey, page: 1, limit: 5, filters: updatedFilters });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    updateURLParams({ sort: sortKey, filters: {} }); // Clear filters in URL
    fetchData({ sort: sortKey, page: currentPage, limit: 5, filters: {} }); // Fetch data without any filters
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {filters && filters.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <Filters 
            onFilter={onFilter}
            onClear={clearFilters}
            filters={filters} 
            selectedFilters={selectedFilters} // Pass selected filters to Filters component
          />
        </div>
      )}

      <span>
        {meta.current_items} of {meta.total_items} scholarships
      </span>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {header.map((col) => (
              <th key={col.id} scope="col" className={`px-6 py-3 ${col.minSize}`}>
                <div className="flex items-center">
                  {col.label}
                  {col.sortKey && (
                    <a href="#" onClick={() => handleSort(col.sortKey)}>
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574...Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              onClick={() => onRowClick(item._id)}
            >
              {header.map((col) => (
                <td key={`${item.id}-${col.id}`} className="px-6 py-4">
                  {col.type === 'date'
                    ? new Date(item[col.sortKey]).toLocaleDateString()
                    : item[col.sortKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {meta.next_page !== null && (
        <div className="flex justify-center mt-4">
          <button className="p-2 bg-blue-500 text-white rounded" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
   );
};

export default Table;
