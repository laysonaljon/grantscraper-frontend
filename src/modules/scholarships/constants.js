const headerConfig = [
    {
      id: 1,
      label:'Name',
      minSize: '250px',
      type: 'string',
      sortKey: 'name',
    },
    {
      id: 2,
      label:'Level',
      minSize: '250px',
      type: 'string',
      sortKey: 'level',
    },
    {
      id: 3,
      label:'Type',
      minSize: '250px',
      type: 'string',
      sortKey: 'type',
    },
    {
      id: 4,
      label:'Deadline',
      minSize: '250px',
      type: 'date',
      sortKey: 'deadline',
    },
  ];

  const filterOptions = [
    {
      id: 'level',
      label: 'Level',
      type: 'dropdown',
      options: ["basic education", "vocational","college", "doctorate", "masters"],
      placeholder: 'Select Level of degree',
    },
    {
      id: 'type',
      label: 'Type',
      type: 'dropdown',
      options: ["athletic", "merit", "need-based"],
      placeholder: 'Select Scholarship Type',
    },
  ]
  
  export default {
    headerConfig,
    filterOptions
  };
  