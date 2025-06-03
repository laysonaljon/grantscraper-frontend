import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './../configuration/api';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() === '') {
        setResults([]);
        return;
      }

      setLoading(true);
      api
        .searchKeyword(keyword)
        .then((res) => {
          const data = Array.isArray(res.data) ? res.data : [];
          setResults(data);
        })
        .catch((err) => {
          console.error('Search failed:', err);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <div 
      className="relative w-full  items-center mt-1 border border-gray-300 rounded-md bg-white dark:bg-gray-800"
      style={{ whiteSpace: "nowrap", height: "50px" }
    }>
      <input
        type="text"
        placeholder="Search for keywords..."
        className="flex-grow p-2 border-none focus:ring-0 focus:outline-none h-full w-full bg-transparent text-black dark:text-white"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {keyword && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4 z-20">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Searching...</p>
          ) : Array.isArray(results) && results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  navigate(`/${item.id}`);
                  setKeyword('');
                  setResults([]);
                }}
                className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <p className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.level} • {item.type}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No matching scholarship</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
