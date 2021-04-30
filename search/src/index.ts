import { red } from 'colors'
import { serializeError } from 'serialize-error'

import { termSearch } from './searches'

const main = async () => {
  try {
    await termSearch()
  } catch (error) {
    const serializedError = serializeError(error)
    console.error(red('Error searching:'), serializedError)
  }
}

main()
