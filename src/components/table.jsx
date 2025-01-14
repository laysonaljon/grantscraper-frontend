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
    const initialSortKey = urlParams.get('sort') || sort;
    setSortKey(initialSortKey);

    const initialFilters = urlParams.has('filters') 
      ? JSON.parse(urlParams.get('filters')) 
      : {};

    setSelectedFilters(initialFilters);

    fetchData({ sort: initialSortKey, page: currentPage, limit: 5, filters: initialFilters });
  }, []);

  useEffect(() => {
    if (sortKey) {
      fetchData({ sort: sortKey, page: currentPage, limit: 5, filters: selectedFilters });
      updateURLParams({ sort: sortKey, filters: selectedFilters });
    }
  }, [sortKey, currentPage, selectedFilters]);

  const handleSort = (newSortKey) => {
    setSortKey((prev) => (prev === newSortKey ? `-${newSortKey}` : newSortKey));
    setCurrentPage(1);
  };

  const renderSortIcon = (colKey) => {
    const isActiveSort = sortKey === colKey || sortKey === `-${colKey}`;
    const isDescending = sortKey === `-${colKey}`;
  
    if (!isActiveSort) {
      return <span className="text-gray-400 dark:text-gray-500 ms-1">▲</span>; // Light gray for light mode, slightly darker for dark mode
    }
    return isDescending ? (
      <span className="text-black dark:text-white ms-1">▼</span> // Black for light mode, white for dark mode
    ) : (
      <span className="text-black dark:text-white ms-1">▲</span> // Black for light mode, white for dark mode
    );
  };  

  return (
    <div className="relative overflow-x-auto w-full">
  <h2 className="text-xl font-bold mb-4">{title}</h2>

  {filters && filters.length > 0 && (
    <div className="flex justify-between items-center mb-4">
      <Filters 
        onFilter={setSelectedFilters}
        onClear={() => setSelectedFilters({})}
        filters={filters} 
        selectedFilters={selectedFilters}
      />
    </div>
  )}

  <div className="text-sm text-gray-500 text-center mb-4">
    View {data.length} of {meta.total_items}
  </div>

  <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {header.map((col) => (
          <th
            key={col.id}
            scope="col"
            className="px-6 py-3"
            style={{ width: col.minSize }}
          >
            <div className="flex items-center">
              {col.label}
              {col.sortKey && (
                <button
                  className="ml-1 text-gray-400 hover:text-black dark:hover:text-white"
                  onClick={() => handleSort(col.sortKey)}
                >
                  {renderSortIcon(col.sortKey)}
                </button>
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
            <td
              key={`${item._id}-${col.id}`}
              className="px-6 py-4"
              style={{ width: col.minSize }}
            >
              {col.type === 'date'
                ? new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(new Date(item[col.sortKey]))
                : item[col.sortKey]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>

  {meta.next_page !== null && (
    <div className="flex justify-center mt-4">
      <span
        className="text-blue-500 cursor-pointer hover:underline"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Load More
      </span>
    </div>
  )}

</div>

  );
};

export default Table;
