import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import createBatch from '../actions/batches/create'
import Title from '../components/Title'
import DatePicker from 'material-ui/DatePicker';



class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const { name, startingAt, endingAt } = props

    this.state = {
      name,
      startingAt,
      endingAt
    }
  }

  updateName(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.name.medium.elements[0].focus()
    }
    this.setState({
      name: this.refs.name.value
    })
  }

  updateStartingAt = (event, date) => {
    this.setState({
      startingAt: date,
    })
  }

  updateEndingAt = (event, date) => {
    this.setState({
      endingAt: date,
    })
  }


  saveBatch() {
    console.table(this.state)

    const batch = {
      ...this.state
    }

    console.table(batch)

    this.props.save(batch)
  }

  render() {
    return (
      <div className="editor">
      <header>
        <Title content="Add a new Class" />
      </header>
        <input
          type="text"
          ref="name"
          className="name"
          placeholder="Batch number"
          onChange={this.updateName.bind(this)}
          onKeyUp={this.updateName.bind(this)} />

        <DatePicker
           hintText="Starting Date of Class"
           defaultValue={this.state.startingAt}
           value={this.state.startingAt}
           onChange={this.updateStartingAt}
        />

        <DatePicker
           hintText="Ending Date of Class"
           value={this.state.endingAt}
           onChange={this.updateEndingAt}
        />


        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save: createBatch }

export default connect(null, mapDispatchToProps)(BatchEditor)
