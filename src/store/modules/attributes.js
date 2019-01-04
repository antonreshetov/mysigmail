export default {
  state: {
    avatar: {
      min: 50,
      max: 150,
      roundness: [
        { label: 'Round', value: 100 },
        { label: 'Square', value: 0 },
        { label: 'Rounded corners', value: 5 }
      ]
    },
    font: {
      size: [
        { label: 'Small', value: 11 },
        { label: 'Medium', value: 12 },
        { label: 'Large', value: 13 }
      ],
      family: [
        {
          label: 'sans-serif',
          options: [
            { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
            { label: 'Comic Sans MS', value: "'Comic Sans MS', sans-serif" },
            { label: 'Lucida Grande', value: "'Lucida Grande', sans-serif" },
            { label: 'Tahoma', value: 'Tahoma, sans-serif' },
            { label: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
            { label: 'Verdana', value: 'Verdana, sans-serif' }
          ]
        },
        {
          label: 'monospace',
          options: [
            {
              label: 'Courier New',
              value: '"Courier New", Courier, monospace'
            },
            { label: 'Comic Sans MS', value: '"Comic Sans MS", sans-serif' },
            {
              label: 'Lucida Console',
              value: '"Lucida Console", Monaco, monospace'
            }
          ]
        }
      ]
    },
    separator: {
      options: [
        { label: '/', value: '/' },
        { label: '|', value: '|' },
        { label: 'at', value: 'at' },
        { label: 'New line', value: 'br' }
      ]
    },
    types: [
      { label: 'Text', value: 'text' },
      { label: 'Email', value: 'email' },
      { label: 'Link', value: 'link' }
    ]
  },
  getters: {},
  mutations: {},
  actions: {}
}
