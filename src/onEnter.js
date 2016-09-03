// @flow

const insertRow = require('./transforms/insertRow')

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event: any, data: any, state: Slate$State, opts: EditTableOptions) {
  event.preventDefault()

  return insertRow(opts, state.transform()).apply()
}

module.exports = onEnter
