import arrayToCsv from '../src'
import getTransformer from '../src/getTransformer'

import list from './data/list'

function formatDate(dateStr: any) {
  return dateStr
    ? new Date(dateStr).toUTCString()
    : ''
}

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  'parent',
  {
    key: 'createdAt',
    label: 'Created at (UTC)',
    transform: formatDate,
  },
  'count',
] as const

const toCsv = arrayToCsv(columns)

describe('arrayToCsv', () => {
  it('should transform correctly', () => {
    const transform = getTransformer(columns)
    const result = list.map(transform)
    expect(result).toMatchSnapshot()
  })

  it('should convert to csv correctly', () => {
    const result = toCsv(list)
    expect(result).toMatchSnapshot()
  })
})
