// @flow
import * as React from 'react'
import type {
  AsyncFunction,
  Config,
  PromiseListener
} from 'redux-promise-listener'

export default (
  config: Config,
  listener: PromiseListener
): (any => Promise<any>) => {
  const { start, resolve, reject, setPayload, getPayload, getError } = config
  const createAsyncFunction = () =>
    listener.createAsyncFunction({
      start,
      resolve,
      reject,
      setPayload,
      getPayload,
      getError
    })

  // $FlowFixMe: Remember to update Flow
  const [asyncFunction: AsyncFunction, setAsyncFunction] = React.useState(
    createAsyncFunction()
  )

  // $FlowFixMe: Remember to update Flow
  React.useEffect(
    () => {
      asyncFunction.unsubscribe()
      setAsyncFunction(createAsyncFunction())

      return () => {
        asyncFunction.unsubscribe()
      }
    },
    [start, resolve, reject]
  )

  return asyncFunction.asyncFunction
}
