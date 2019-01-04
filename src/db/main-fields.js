import { guid } from '../util/helpers'

const fields = {
  basic: []
}

function seed () {
  const basic = [
    { name: 'Full name', type: 'text', value: '' },
    { name: 'Job title', type: 'text', value: '' },
    { name: 'Company', type: 'text', value: '' },
    { name: 'Website', type: 'link', value: '' },
    { name: 'Email', type: 'email', value: '' },
    { name: 'Phone', type: 'text', value: '' }
  ]

  basic.forEach(item => {
    fields.basic.push({ ...item, id: guid() })
  })

  addPlaceholder()
}

function addPlaceholder () {
  const placeholders = [
    'John Doe',
    'Frontend developer',
    'JohnDoe LLC',
    'johndoe.com',
    'mail@jonhdoe.com',
    '+ 1 123 456 7890'
  ]

  fields.basicPlaceholder = [
    ...fields.basic.map((item, index) => {
      return { ...item, value: placeholders[index] }
    })
  ]
}

seed()

export default fields
