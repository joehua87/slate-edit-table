/* eslint-disable react/prop-types */

const React = require('react')
const ReactDOM = require('react-dom')
const Slate = require('slate')
const PluginEditTable = require('../src/')
const styles = require('./main.css')

const stateJson = require('./state')

const tablePlugin = PluginEditTable()
const plugins = [
  tablePlugin,
]

const schema = {
  nodes: {
    table: props => <table><tbody {...props.attributes}>{props.children}</tbody></table>,
    table_row: props => <tr {...props.attributes}>{props.children}</tr>,
    table_cell: props => <td {...props.attributes}>{props.children}</td>,
    paragraph: props => <p {...props.attributes}>{props.children}</p>,
    heading: props => <h1 {...props.attributes}>{props.children}</h1>,
  },
}

export default class Example extends React.Component {
  state = {
    state: Slate.Raw.deserialize(stateJson, { terse: true }),
  };

  onChange = (state) => {
    this.setState({
      state,
    })
  };

  onInsertTable = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.insertTable(state.transform.apply())
    this.onChange(nextState)
  };

  onInsertColumn = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.insertColumn(state.transform.apply())
    this.onChange(nextState)
  };

  onInsertRow = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.insertRow(state.transform.apply())
    this.onChange(nextState)
  };

  onRemoveColumn = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.removeColumn(state.transform.apply())
    this.onChange(nextState)
  };

  onRemoveRow = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.removeRow(state.transform.apply())
    this.onChange(nextState)
  };

  onRemoveTable = () => {
    const { state } = this.state
    const nextState = tablePlugin.transforms.removeTable(state.transform.apply())
    this.onChange(nextState)
  };

  renderNormalToolbar = () => (
    <div>
      <button onClick={this.onInsertTable}>Insert Table</button>
    </div>
  );

  renderTableToolbar = () => (
    <div>
      <button onClick={this.onInsertColumn}>Insert Column</button>
      <button onClick={this.onInsertRow}>Insert Row</button>
      <button onClick={this.onRemoveColumn}>Remove Column</button>
      <button onClick={this.onRemoveRow}>Remove Row</button>
      <button onClick={this.onRemoveTable}>Remove Table</button>
    </div>
  );

  render() {
    const { state } = this.state
    const isTable = tablePlugin.utils.isSelectionInTable(state)

    return (
      <div className={styles.root}>
        {isTable ? this.renderTableToolbar() : this.renderNormalToolbar()}
        <Slate.Editor
          placeholder={'Enter some text...'}
          plugins={plugins}
          state={state}
          schema={schema}
          onChange={this.onChange}
          renderNode={this.renderNode}
        />
      </div>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('example')
)
