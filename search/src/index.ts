import { red } from 'colors'
import { serializeError } from 'serialize-error'

import { booleanSearch } from './searches'

const main = async () => {
  try {
    await booleanSearch()
  } catch (error) {
    const serializedError = serializeError(error)
    console.error(red('Error searching:'), serializedError)
  }
}

main()
