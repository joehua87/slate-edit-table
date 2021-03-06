/* eslint-disable global-require */

const expect = require('expect')
const fs = require('fs')
const path = require('path')
const Slate = require('slate')
const readMetadata = require('read-metadata')

const EditList = require('../')

describe('slate-edit-list', () => {
  const tests = fs.readdirSync(__dirname)
  const plugin = EditList()

  tests.forEach((test) => {
    if (test[0] === '.' || path.extname(test).length > 0) return

    it(test, () => {
      const dir = path.resolve(__dirname, test)
      const input = readMetadata.sync(path.resolve(dir, 'input.yaml'))
      const expected = readMetadata.sync(path.resolve(dir, 'expected.yaml'))
      const runTransform = require(path.resolve(dir, 'transform.js'))

      const stateInput = Slate.Raw.deserialize(input, { terse: true })

      const newState = runTransform(plugin, stateInput)

      const newDocJSon = Slate.Raw.serialize(newState, { terse: true })
      expect(newDocJSon).toEqual(expected)
    })
  })
})
