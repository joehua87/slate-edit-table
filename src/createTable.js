// @flow

const Immutable = require('immutable')
import { Block } from 'slate'
const createRow = require('./createRow')

/**
 * Create a table
 *
 * @param {Slate.State} state
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createTable(opts: EditTableOptions, columns: number, rows: number, createCellChildren?: () => any) {
  const rowNodes = Immutable.Range(0, rows)
        .map(i => createRow(opts, columns, createCellChildren ? createCellChildren.bind(null, i) : null))
        .toList()

  return Block.create({
    type: opts.typeTable,
    nodes: rowNodes,
  })
}

module.exports = createTable
