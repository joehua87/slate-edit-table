// @flow

import { Block, Raw } from 'slate'

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(opts: EditTableOptions, text?: string) {
  text = text || ''

  let nodes
  if (opts.createCellChildren) {
    nodes = opts.createCellChildren()
  } else {
    nodes = [
      Raw.deserializeText({
        kind: 'text',
        text,
      }, { terse: true }),
    ]
  }

  return Block.create({
    type: opts.typeCell,
    nodes,
  })
}

module.exports = createCell
