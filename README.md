# React Redux Promise Listener Hook

[![NPM Downloads](https://img.shields.io/npm/dm/react-redux-promise-listener-hook.svg?style=flat)](https://www.npmjs.com/package/react-redux-promise-listener-hook)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is a hook version of [`react-redux-promise-listener`](https://github.com/erikras/react-redux-promise-listener) by [Erik Rasmussen](https://github.com/erikras).

## Why?

Most of the popular React form libraries accept an `onSubmit` function that is expected to return a `Promise` that resolves when the submission is complete, or rejects when the submission fails. This mechanism is fundamentally incompatible with action management libraries like [`redux-saga`](https://redux-saga.js.org), which perform side-effects (e.g. ajax requests) in a way that does not let the submission function easily return a promise. React Redux Promise Listener is a potential solution.

### Example

[![Edit 🏁 React Final Form - Async Redux Submission](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0qqx2xo4n)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
  - [Step 1](#step-1)
  - [Step 2](#step-2)
- [API](#api)
  - [`useAsyncFunction: (config: Config, promiseListener: PromiseListener) => Promise<any>`](#useasyncfunction-config-config-promiselistener-promiselistener--promiseany)
- [Types](#types)
  - [`Config`](#config)
    - [`start: string`](#start-string)
    - [`resolve: string`](#resolve-string)
    - [`reject: string`](#reject-string)
    - [`setPayload?: (action: Object, payload: any) => Object`](#setpayload-action-object-payload-any--object)
    - [`getPayload?: (action: Object) => any`](#getpayload-action-object--any)
    - [`getError?: (action: Object) => any`](#geterror-action-object--any)
  - [`PromiseListener`](#promiselistener)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

### Step 1

Step 1 involves installing Redux middleware and is detailed [here in the docs of Redux Promise Listener](https://github.com/erikras/redux-promise-listener#step-1).

### Step 2

Welcome back! You may now create an async function in your React code like so:

```jsx
import useAsyncFunction from 'react-redux-promise-listener-hook'
import { promiseListener } from './store'

...

const config = {
  start: "START_ACTION_TYPE"     // the type of action to dispatch when this function is called
  resolve: "RESOLVE_ACTION_TYPE" // the type of action that will resolve the promise
  reject: "REJECT_ACTION_TYPE"   // the type of action that will reject the promise
}
const asyncFunc = useAsyncFunction(config, promiseListener);

<SomeFormLibrary onSubmit={asyncFunc}>

  ...

  <button type="submit">Submit</button>
</SomeFormLibrary>
```

## API

### `useAsyncFunction: (config: Config, promiseListener: PromiseListener) => Promise<any>`

A React hook that creates an async function.

## Types

### `Config`

#### `start: string`

The `type` of action to dispatch when the function is called.

#### `resolve: string`

The `type` of action that will cause the promise to be resolved.

#### `reject: string`

The `type` of action that will cause the promise to be rejected.

#### `setPayload?: (action: Object, payload: any) => Object`

A function to set the payload (the parameter passed to the async function). Defaults to `(action, payload) => ({ ...action, payload })`.

#### `getPayload?: (action: Object) => any`

A function to get the payload out of the resolve action to pass to resolve the promise with. Defaults to `(action) => action.payload`.

#### `getError?: (action: Object) => any`

A function to get the error out of the reject action to pass to reject the promise with. Defaults to `(action) => action.payload`.

### `PromiseListener`

See the [`redux-promise-listener`](https://github.com/erikras/redux-promise-listener#promiselistener) documentation.
