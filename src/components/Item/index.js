// @flow

import React from 'react'
import styles from './styles.css'

export default class Item extends React.Component { // eslint-disable-line
  props: {
    icon: string,
    tooltip?: string,
    onClick?: () => void,
  };

  render() {
    const { icon, tooltip, onClick } = this.props
    return (
      <span className={styles.root} onMouseDown={onClick} title={tooltip}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }
}
