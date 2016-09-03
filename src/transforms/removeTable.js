// @flow

const TablePosition = require('../TablePosition')

/**
 * Delete the whole table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function removeTable(opts: EditTableOptions, transform: Slate$Transform) {
  const { state } = transform
  const { startBlock } = state

  const pos = TablePosition.create(state, startBlock)
  const { table } = pos

  return transform
        .removeNodeByKey(table.key)
}

module.exports = removeTable
