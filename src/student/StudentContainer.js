import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchStudent } from '../actions/student'
import Title from '../components/Title'
import StudentEditor from './StudentEditor'
//import BatchEditor from './BatchEditor'


class StudentContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchStudent(this.props.match.params.id))
    if (this.props){console.log(this.props)}
    this.setState(this.props)
    
  }
  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.student !== this.state.student) {
      this.setState({ student: nextProps.student });
    }
  }
  renderEvaluations(evaluations) {
    const evdata = evaluations.map( evaluation => { 
      let tdstyle= {
        background: evaluation.color,
      };
      return (
        <tr>
          <td>{evaluation.createdAt}</td>
          <td style={tdstyle}>{evaluation.remark}</td>
          <td style={tdstyle}>{evaluation.color}</td>
          <td>{evaluation.userId}</td>
        </tr>);
    });
    return (
      <table border="1">
      <tr>
        <th>Date</th>
        <th>Remark</th>
        <th>Color</th>
        <th>TeacherID</th>
      </tr>
      <tbody>
        {evdata}
      </tbody>
    </table>
    )
  }
  render() {
    if (this.props.student)
    {
      var student = this.state.student;
      
      console.log(this.state)
      console.log(this.props)
      var childprops= this.state.student;
    return(
      
      <div className="StudentContainer">
        <header>
          <Title content={`Student: ${student.name}`} />
        </header>

        <main>
          <div className="studentPhoto">
            <img src={student.photo} alt={student.name} />
          </div>
          <div className="studentDetails">
            <div className="title">Name:{student.name}</div>
            <div>Evaluations</div>
            <div className="evaluations">{this.renderEvaluations(student.evaluations)} </div>

          </div>
          <StudentEditor student={childprops} />
        </main>
      </div>
    )} else { return <div>loading</div> }
  }
}

const mapStateToProps = ({ student }) => ({ ...student })

export default connect(mapStateToProps)(StudentContainer)