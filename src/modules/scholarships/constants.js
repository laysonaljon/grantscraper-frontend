const headerConfig = [
    {
      id: 1,
      label:'Name',
      minSize: '150px',
      type: 'string',
      sortKey: 'name',
    },
    {
      id: 2,
      label:'Level',
      minSize: '150px',
      type: 'string',
      sortKey: 'level',
    },
    {
      id: 3,
      label:'Type',
      minSize: '150px',
      type: 'string',
      sortKey: 'type',
    },
    {
      id: 4,
      label:'Deadline',
      minSize: '150px',
      type: 'date',
      sortKey: 'deadline',
    },
  ];

  const filterOptions = [
    {
      id: 'level',
      label: 'Level',
      type: 'dropdown',
      options: ["Basic Education", "Vocational","College", "Doctorate", "Masters"],
      placeholder: 'Select Level of degree',
    },
    {
      id: 'type',
      label: 'Type',
      type: 'dropdown',
      options: ["Athletic", "Merit", "Need-based"],
      placeholder: 'Select Scholarship Type',
    },
  ]
  
  export default {
    headerConfig,
    filterOptions
  };
  