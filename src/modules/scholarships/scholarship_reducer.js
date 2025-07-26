import actionTypes from './scholarship_types';

const initialState = {
    scholarships: {
        items: [],
        meta: {},
    },
    message: {
        type:'',
        message:''
    },
    error: null
};

const scholarshipReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SCHOLARSHIPS: {
        const isSameSortKey = state.scholarships.meta.sortKey === action.data.meta.sortKey;
        const isSamePage = state.scholarships.meta.current_page === action.data.meta.current_page;

        return {
            ...state,
            scholarships: {
                ...state.scholarships,
                items: isSameSortKey
                    ? isSamePage
                        ? action.data.items || [] // Replace items if on the same page
                        : [
                            ...state.scholarships.items,
                            ...action.data.items.filter(item =>
                                !state.scholarships.items.some(existingItem => existingItem._id === item._id)
                            ), // Append new unique items if pages are different but sort is the same
                        ]
                    : action.data.items || [], // Reset items if sort key changes
                meta: {
                    ...state.scholarships.meta,
                    ...action.data.meta, // Update meta information with new data
                    sortKey: action.data.meta.sortKey, // Ensure sortKey is updated
                },
            },
            error: null, // Clear error on successful response
        };
      }
      
      case actionTypes.SET_SCHOLARSHIP:
          return {
              ...state,
              scholarship: action.data || {}, // Set scholarship or default to empty object
              message: {
                type:'',
                message:''
              },
              error: null, // Clear error on successful response
            };

        case actionTypes.SET_MESSAGE: {
            const { type, message } = action.data || {};
            return {
                ...state,
                message: {
                    type: type || '',
                    message: message || '',
                },
            };
        }

        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

      default:
          return state;
    }
};

export default scholarshipReducer;
