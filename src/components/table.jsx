import { useState, useEffect } from 'react';
import Filters from './filters';

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

    fetchData({ sort: initialSortKey, page: currentPage, limit: 20, filters: initialFilters });
  }, []);

  useEffect(() => {
    if (sortKey) {
      fetchData({ sort: sortKey, page: currentPage, limit: 20, filters: selectedFilters });
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
      return <span className="text-gray-400 dark:text-gray-500 ms-1">▲</span>;
    }
    return isDescending ? (
      <span className="text-white ms-1">▼</span>
    ) : (
      <span className="text-white ms-1">▲</span>
    );
  };  

  return (
    <div className="relative w-full">
      {filters && filters.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <Filters 
            title={title}
            onFilter={setSelectedFilters}
            onClear={() => setSelectedFilters({})}
            filters={filters} 
            selectedFilters={selectedFilters}
            total={meta.total_items}
            count={data.length}
          />
        </div>
      )}

      <table className="table-auto w-full text-sm text-left border-collapse rounded-lg overflow-hidden"> 
        <thead className="text-xs uppercase bg-gray-500 text-white dark:bg-gray-600 dark:text-white sticky top-0">
          <tr>
            {header.map((col) => (
              <th
                key={col.id}
                scope="col"
                className={`px-6 py-3 first:rounded-tl-lg last:rounded-tr-lg ${col.isDesktopOnly ? 'hidden md:table-cell' : ''}`}
                style={{ width: col.minSize || "auto" }}
              >
                <div className="flex items-center justify-center md:justify-start">
                  {col.label}
                  {col.sortKey && (
                    <button
                      className="ml-1 text-gray-400 hover:text-white dark:hover:text-gray-300"
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
        <tbody className="bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          {data.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b cursor-pointer dark:border-gray-700 ${
                index === data.length - 1 ? 'last:rounded-bl-lg last:rounded-br-lg' : ''
              }`}
              onClick={() => onRowClick(item._id)}
            >
              {header.map((col) => (
                <td
                  key={`${item._id}-${col.id}`}
                  className={`px-6 py-4 ${col.isDesktopOnly ? 'hidden md:table-cell' : ''}`}
                  style={{ width: col.minSize || "auto" }}
                >
                  {col.type === 'date'
                    ? item[col.sortKey] === 'Ongoing' || item[col.sortKey] === 'Passed'
                    ? item[col.sortKey]
                    : new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }).format(new Date(item[col.sortKey]))
                    : item[col.sortKey]}
                </td>
              ))}
            </tr>
          ))}

          {/* Load More Row */}
          {meta.next_page !== null && (
            <tr
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <td
                colSpan={header.length} // Always spans all columns
                className="px-6 py-4 text-center text-blue-500"
              >
                Load More
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
