// @flow

import { Block, Raw } from 'slate'

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(type: string, text?: string) {
  text = text || ''

  return Block.create({
    type,
    nodes: [
      Raw.deserializeText({
        kind: 'text',
        text,
      }, { terse: true }),
    ],
  })
}

module.exports = createCell
