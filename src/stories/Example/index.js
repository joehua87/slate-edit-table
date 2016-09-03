// @flow

import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Example from '../../../example/App'
import blockChildrenState from './block-children.json'
import textChildrenState from './text-children.json'

storiesOf('Table Plugin', module)
  .add('Block Cell Children', () => <Example rawState={blockChildrenState} />)
  .add('Text Cell Children', () => <Example rawState={textChildrenState} />)
