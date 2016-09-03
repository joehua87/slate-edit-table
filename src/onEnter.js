// @flow

const insertRow = require('./transforms/insertRow')

/**
 * Insert a new row when pressing "Enter"
 */
function onEnter(event: any, data: any, state: Slate$State, opts: EditTableOptions) {
  // Only handle when startBlock is is cell
  const { startBlock } = state
  if (startBlock.type !== opts.typeCell) return

  event.preventDefault()
  return insertRow(opts, state.transform()).apply()
}

module.exports = onEnter
