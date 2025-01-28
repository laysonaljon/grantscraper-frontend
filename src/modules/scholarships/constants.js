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
      isDesktopOnly: true
    },
    {
      id: 3,
      label:'Type',
      minSize: '250px',
      type: 'string',
      sortKey: 'type',
      isDesktopOnly: true
    },
    {
      id: 4,
      label:'Deadline',
      minSize: '250px',
      type: 'date',
      sortKey: 'deadline',
      isDesktopOnly: true
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
      options: ["Athletic", "Merit", "Need-based", "Grant"],
      placeholder: 'Select Scholarship Type',
    },
  ]
  
  export default {
    headerConfig,
    filterOptions
  };
  