// @flow

const moveSelection = require('./transforms/moveSelection')

function onUpDown(event: any, data: any, state: Slate$State, opts: EditTableOptions) {
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
