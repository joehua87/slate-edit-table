// @flow

import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import Item from '../index'
import styles from '../styles.css'

describe('Item', () => {
  it('Render using shallow', () => {
    const renderedComponent = shallow(<Item icon="star" tooltip="Click to start" />)
    expect(renderedComponent).to.have.prop('className', styles.root)
    expect(renderedComponent).to.have.prop('title', 'Click to start')
  })

  it('Render using mount', () => {
    const renderedComponent = mount(<Item icon="star" tooltip="Click to start" />)
    expect(renderedComponent).to.have.attr('class', styles.root)
    expect(renderedComponent).to.have.attr('title', 'Click to start')
  })

  it('Click', () => {
    const onClick = sinon.spy()
    const renderedComponent = mount(<Item icon="star" onClick={onClick} />)
    renderedComponent.find(`.${styles.root}`).simulate('mouseDown')
    expect(onClick).to.be.calledOnce()
  })
})
