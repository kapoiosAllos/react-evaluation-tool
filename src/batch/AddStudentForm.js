import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createStudentBatch from '../actions/batches/createNewStudent'
import Title from '../components/Title'



class AddStudentForm extends PureComponent {
  constructor(props) {
    super()
    const { name, photo } = props

    this.state = {
      name,
      photo
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

  updatePhoto(event) {
    this.setState({
      name: this.refs.photo.value
    })
  }


  saveBatch() {
    console.table(this.state)

    const student = {
      ...this.state
    }

    
    const batchId=this.props.batchId
    this.props.addStudentBatch(student,batchId) 
  }

  render() {
    return (
      <div className="editor">
      <header>
        <Title content="Add a new Student" />
      </header>
        <input
          type="text"
          ref="name"
          className="name"
          placeholder="Student Name"
          onChange={this.updateName.bind(this)}
          onKeyUp={this.updateName.bind(this)} />

          <input
            type="text"
            ref="photo"
            className="name"
            placeholder="Students Photo"
            onChange={this.updatePhoto.bind(this)}
            onKeyUp={this.updatePhoto.bind(this)} />

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { addStudentBatch: createStudentBatch }


export default connect(null, mapDispatchToProps)(AddStudentForm)
