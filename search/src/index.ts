import { red } from 'colors'
import { serializeError } from 'serialize-error'

import { matchSearch } from './searches'

const main = async () => {
  try {
    await matchSearch()
  } catch (error) {
    const serializedError = serializeError(error)
    console.error(red('Error searching:'), serializedError)
  }
}

main()
