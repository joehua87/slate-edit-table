const createTable = require('../createTable')

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Transform} transform
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Transform}
 */
function insertTable(opts, transform, columns = 2, rows = 2) {
  const { state } = transform
  const { startBlock } = state

    // Get text of current block
  const currentText = startBlock.text

    // Create the table node
  const table = createTable(opts, columns, rows, (x, y) => {
    if (x === 0 && y === 0) return currentText
    return ''
  })

  return transform
        .insertBlock(table)
}

module.exports = insertTable
