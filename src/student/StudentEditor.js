import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import updateStudent from '../actions/student/update'
import Title from '../components/Title'



class StudentEditor extends PureComponent {
  constructor(props) {
    super()

    this.state = props.student
    this.state.currentUser = "5a3151c868720b1d4cef1b48"

  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.student !== this.state) {
      this.setState( nextProps.student );
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
  updateRemark(event) {
    
    const index = event.target.id
    console.log(index)
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.remark.medium.elements[0].focus()
    }

    const evaluat = this.state.evaluations
    evaluat[index].remark = event.target.value
    console.log(this.state)
    this.setState({evaluations: evaluat })
    console.log(this.state)
    //const evaluation = this.state.evaluations;
    //this.state.evaluations[index].remark = this.refs.remark.value;

    this.forceUpdate();
    
    /*
    this.setState({
      this.state.evaluations[0].remark: this.refs.remark.value
    })*/
  }
  updateColor(event) {
    const index = event.target.id
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.color.medium.elements[0].focus()
    }
    //const evaluation = this.state.evaluations;
    //this.setState( {evaluations[index]: event.target.value}) //= event.target.value;

    const evaluat = this.state.evaluations
    evaluat[index].color = event.target.value;

    this.setState({evaluations: evaluat })
    this.forceUpdate();
  }
    
  updatePhoto(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this.refs.photo.medium.elements[0].focus()
    }
    this.setState({
      photo: this.refs.photo.value
    })
  }

  addEvaluation() {
    const newremark= this.refs.newremark.value
    const newcolor= this.refs.newcolor.value
    const newuserId= "5a3151c868720b1d4cef1b48"
    let newarray= this.state.evaluations.slice()
    let neweva= {remark: newremark, color: newcolor, userId:newuserId}
    newarray.push(neweva)
    const student= {
      ...this.state
    }
    student.evaluations=newarray
    this.setState(student)
    this.props.save(student)
    this.forceUpdate()
    
    
  }
  saveStudent() {
    console.table(this.state)
    console.log(this.props)

    const student= {
      ...this.state
    }

    console.table(student)

    this.props.save(student)
  }
  renderEvaluationsForm(){
    if(this.state.evaluations){
      const rendered = this.state.evaluations.map((evaluation,index) => {
      if (evaluation.userId === this.state.currentUser){
        return (
        <div>
        <input
          type="text"
          ref="remark"
          className="remark"
          placeholder="remark"
          onChange={this.updateRemark.bind(this)}
          value={this.state.evaluations[index].remark} 
          id={index} />
          <select
          ref="color"
          className="color"
          onChange={this.updateColor.bind(this)}
          value={this.state.evaluations[index].color}
          id={index}>
          <option value="green">green </option>
          <option value="orange">orange </option>
          <option value="red">red </option>
          </select>
          </div>
      );}});
      return rendered;
    }
  }

  render() {
    
    return (
      <div className="editor">
      <header>
        <Title content="Modify Name or Photo" />
      </header>
        <label>Student's Name:</label>
        <input
          type="text"
          ref="name"
          className="name"
          placeholder="name"
          onChange={this.updateName.bind(this)}
          onKeyUp={this.updateName.bind(this)}
          value={this.state.name} />
          <label>Student's Photo:</label>
          <input
          type="text"
          ref="photo"
          className="photo"
          placeholder="photo"
          onChange={this.updatePhoto.bind(this)}
          onKeyUp={this.updatePhoto.bind(this)} 
          value={this.state.photo}/>
          <br /><br />
          <div> Modify Evaluations </div><br />
        {this.renderEvaluationsForm()}
        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Update</button><br />
        </div>
        <br />
        <div> Add new Evaluation </div><br />
        <label>Evaluation Remark:</label>
        <input
          type="text"
          ref="newremark"
          className="newremark"
          placeholder="Add remark"
          />
          <label>Evaluation Color:</label>
          <select
          type="text"
          ref="newcolor"
          className="newcolor"
          >
          <option value="green">green</option>
          <option value="orange">orange</option>
          <option value="red">red</option>
          </select>
          <div className="actions">
          <button className="primary" onClick={this.addEvaluation.bind(this)}>Add Evaluation</button><br />
          </div>
      </div>

    )
  }
}

const mapDispatchToProps = { save: updateStudent }

export default connect(null, mapDispatchToProps)(StudentEditor)
