// @flow

const createRow = require('../createRow')
const TablePosition = require('../TablePosition')

/**
 * Insert a new row in current table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} at
 * @param {Function} textGetter
 * @return {Slate.Transform}
 */
function insertRow(opts: EditTableOptions, transform: Slate$Transform, at?: number, textGetter?: () => string) {
  const { state } = transform
  const { startBlock } = state

  let cellBlock
  if (startBlock.type === opts.typeCell) cellBlock = startBlock
  else cellBlock = state.document.getClosest(startBlock, (block) => block.type === opts.typeCell)

  const pos = TablePosition.create(state, cellBlock)
  const { table } = pos

    // Create a new row with the right count of cells
  const firstRow = table.nodes.get(0)
  const newRow = createRow(opts, firstRow.nodes.size, textGetter)

  if (typeof at === 'undefined') {
    at = pos.getRowIndex() + 1
  }

    // Update table by inserting the row
  const newTable = table.merge({
    nodes: table.nodes.insert(at, newRow),
  })

  return transform

        // Replace the table
        .setNodeByKey(table.key, newTable)

        // Move selection to new row
        .collapseToEndOf(
            newRow.nodes.get(pos.getColumnIndex())
        )
}

module.exports = insertRow
