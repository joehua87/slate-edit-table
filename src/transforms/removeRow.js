// @flow

const TablePosition = require('../TablePosition')

/**
 * Delete current row in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeRow(opts: EditTableOptions, transform: Slate$Transform, at: number) {
  const { state } = transform
  const { startBlock } = state

  let cellBlock
  if (startBlock.type === opts.typeCell) cellBlock = startBlock
  else cellBlock = state.document.getClosest(startBlock, (block) => block.type === opts.typeCell)

  const pos = TablePosition.create(state, cellBlock)
  const { table } = pos

  if (typeof at === 'undefined') {
    at = pos.getRowIndex()
  }

    // Update table by removing the row
  const newTable = table.merge({
    nodes: table.nodes
            .delete(at),
  })

  return transform

        // Replace the table
        .setNodeByKey(table.key, newTable)
}

module.exports = removeRow
