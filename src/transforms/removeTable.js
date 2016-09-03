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

  let cellBlock
  if (startBlock.type === opts.typeCell) cellBlock = startBlock
  else cellBlock = state.document.getClosest(startBlock, (block) => block.type === opts.typeCell)

  const pos = TablePosition.create(state, cellBlock)
  const { table } = pos

  return transform
        .removeNodeByKey(table.key)
}

module.exports = removeTable
