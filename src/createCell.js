// @flow

import { Block, Raw } from 'slate'

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(opts: EditTableOptions, createCellChildren?: ?() => any) {
  let nodes

  /* Use createCellChildren by following order:
   * - createTable function
   * - Plugin Options
   * - Default Value
   */

  if (createCellChildren) {
    nodes = createCellChildren()
  } else if (opts.createCellChildren) {
    nodes = opts.createCellChildren()
  } else {
    nodes = [
      Raw.deserializeText({
        kind: 'text',
        text: '',
      }, { terse: true }),
    ]
  }

  return Block.create({
    type: opts.typeCell,
    nodes,
  })
}

module.exports = createCell
