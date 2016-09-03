// @flow

const insertTable = require('./transforms/insertTable')
const insertRow = require('./transforms/insertRow')
const removeRow = require('./transforms/removeRow')
const insertColumn = require('./transforms/insertColumn')
const removeColumn = require('./transforms/removeColumn')
const removeTable = require('./transforms/removeTable')
const moveSelection = require('./transforms/moveSelection')

const onEnter = require('./onEnter')
const onTab = require('./onTab')
const onBackspace = require('./onBackspace')
const onUpDown = require('./onUpDown')

const makeSchema = require('./makeSchema')

const KEY_ENTER = 'enter'
const KEY_TAB = 'tab'
const KEY_BACKSPACE = 'backspace'
const KEY_DOWN = 'down'
const KEY_UP = 'up'

/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 */
function EditTable(opts: EditTableOptions) {
  opts = opts || {}
  opts.typeTable = opts.typeTable || 'table'
  opts.typeRow = opts.typeRow || 'table_row'
  opts.typeCell = opts.typeCell || 'table_cell'

    /**
     * Is the selection in a table
     */
  function isSelectionInTable(state: Slate$State) {
    const { startBlock } = state
    const cell = state.document.getClosest(startBlock, (block) => block.type === opts.typeCell)

    // Only handle events in cells or cell's children
    return (startBlock.type === opts.typeCell) || !!cell
  }

    /**
     * Bind a transform
     */
  function bindTransform(fn) {
    return (transform: Slate$Transform, ...args: Array<any>) => {
      const { state } = transform

      if (!isSelectionInTable(state)) {
        return transform
      }

      return fn(opts, transform, ...args)
    }
  }

    /**
     * User is pressing a key in the editor
     */
  function onKeyDown(e: any, data: { key: string }, state: Slate$State) {
        // Only handle events in cells
    if (!isSelectionInTable(state)) {
      return
    }

    switch (data.key) {
      case KEY_ENTER:
        return onEnter(e, data, state, opts)
      case KEY_TAB:
        return onTab(e, data, state, opts)
      case KEY_BACKSPACE:
        return onBackspace(e, data, state, opts)
      case KEY_DOWN:
      case KEY_UP:
        return onUpDown(e, data, state, opts)
    }
  }

  const schema = makeSchema(opts)

  return {
    onKeyDown,

    schema,

    utils: {
      isSelectionInTable,
    },

    transforms: {
      insertTable: insertTable.bind(null, opts),
      insertRow: bindTransform(insertRow),
      removeRow: bindTransform(removeRow),
      insertColumn: bindTransform(insertColumn),
      removeColumn: bindTransform(removeColumn),
      removeTable: bindTransform(removeTable),
      moveSelection: bindTransform(moveSelection),
    },
  }
}

module.exports = EditTable
