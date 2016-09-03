// @flow

const TablePosition = require('../TablePosition')

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @return {Slate.Transform}
 */
function removeColumn(opts: EditTableOptions, transform: Slate$Transform, at: number) {
  const { state } = transform
  const { startBlock } = state

  let cellBlock
  if (startBlock.type === opts.typeCell) cellBlock = startBlock
  else cellBlock = state.document.getClosest(startBlock, (block) => block.type === opts.typeCell)

  const pos = TablePosition.create(state, cellBlock)
  const { table } = pos

  if (typeof at === 'undefined') {
    at = pos.getColumnIndex()
  }

  let rows = table.nodes

    // Add a new cell to each row
  rows = rows.map((row) => {
    let cells = row.nodes
    cells = cells.delete(at)

    return row.merge({ nodes: cells })
  })

    // Update table
  const newTable = table.merge({
    nodes: rows,
  })

    // Replace the table
  return transform
        .setNodeByKey(table.key, newTable)
}

module.exports = removeColumn
