import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOne as fetchBatch } from '../actions/batches'
import { fetchRandomStudent } from '../actions/batches'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import PieChart from 'react-simple-pie-chart'
import AddStudentForm from './AddStudentForm'

class BatchContainer extends PureComponent {
  componentWillMount() {

    this.props.dispatch(fetchBatch(this.props.match.params.id))
    //const luckyStudent =
    //console.log(luckyStudent)
  }


  renderStudent(student, index) {
    return (
      <div key= { index }>
      <Link to={`/student/${student._id}`}>
      Student s Name: {student.name}
      </Link>
      </div>
    )
  }

  calcGreens(students){

    let greens=0;
    for( let student of students) {
      if (student.evaluations && student.evaluations.length>0) {
        if (student.evaluations[student.evaluations.length-1].color ==="green" ){
          greens=greens+1;
        }
      }
    }
    return greens;
  }
  calcOranges(students){
    let oranges=0;
    for( let student of students) {
      if (student.evaluations && student.evaluations.length>0) {
        if (student.evaluations[student.evaluations.length-1].color ==="orange" ){
          oranges=oranges+1;
        }
      }
    }
    return oranges;
  }
  calcReds(students){
    let reds=0;
    for( let student of students) {
      if (student.evaluations && student.evaluations.length>0) {
        if (student.evaluations[student.evaluations.length-1].color ==="red" ){
          reds=reds+1;
        }
      }
    }
    return reds;
  }
  fetchLuckyStudent(event) {
    this.props.dispatch(fetchRandomStudent(this.props.match.params.id))
  }

  render() {

    console.log(this.props)
    const students = this.props.batches
    if (!students) { return null }

    return(
      <div className="StudentsContainer">
        <AddStudentForm batchId={this.props.match.params.id}/>
        <header>
          <Title content="All Classes" />
        </header>

        <main>
        <div className="actions">
        <button className="primary" onClick={this.fetchLuckyStudent.bind(this)}>Click for Lucky Student</button>
        {this.props.luckyStudent ? this.props.luckyStudent.name : "" }
      </div><br />
        <div></div> <br />
          {students.map( (student,index) => this.renderStudent(student,index))}
          <div style={{height:"300px", width:"300px"}}>
          <PieChart slices={[
            {color:'green', value:this.calcGreens(students)},
            {color:'orange', value:this.calcOranges(students)},
            {color:'red', value:this.calcReds(students)}]} />
            </div>
        </main>
      </div>
    )
  }
}

//const mapStateToProps = ({ batches }) => ({ batches })
function mapStateToProps(state) {
  return { luckyStudent: state.luckyStudent , batches: state.batches };
}

export default connect(mapStateToProps)(BatchContainer)
