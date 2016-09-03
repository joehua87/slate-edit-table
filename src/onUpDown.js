// @flow

const moveSelection = require('./transforms/moveSelection')

function onUpDown(event: any, data: any, state: Slate$State, opts: EditTableOptions) {
  // Only handle when startBlock is is cell
  const { startBlock } = state
  if (startBlock.type !== opts.typeCell) return

  const transform = state.transform()

  const newTransform = moveSelection(
        opts, transform,
        0, data.key === 'up' ? -1 : +1
    )

  if (newTransform !== transform) {
    event.preventDefault()
  }

  return newTransform
        .apply()
}

module.exports = onUpDown
