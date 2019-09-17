import arrayToCsv from '../src'
import getTransformer from '../src/getTransformer'

import list from './data/list'

function formatDate(dateStr: any) {
  return dateStr
    ? new Date(dateStr).toUTCString()
    : ''
}

const foo = item => formatDate(item.createdAt)

const columns = [
  {
    label: 'Name',
    prop: 'name',
  },
  'parent',
  {
    label: 'Created at (UTC)',
    prop: (item: number) => formatDate(item.createdAt),
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
