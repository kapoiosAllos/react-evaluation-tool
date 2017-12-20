import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetch as fetchBatches } from '../actions/batches'
import Title from '../components/Title'
import BatchEditor from './BatchEditor'
import { Link } from 'react-router-dom'
import PieChart from 'react-simple-pie-chart'

class BatchesContainer extends PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchBatches())
    
  }

  renderBatch(batch, index) {
    const start = batch.startingAt.toString();
    const end = batch.endingAt.toString();
    return (
      <div key= { index }>
      <Link to={`/batches/${batch._id}`}>
      Class Name: {batch.name}
      </Link>
      <p>Start date: { start }</p>
      <p>End date: { end }</p>
      </div>
    )
  }

  render() {
    console.log(this.props)
    const { batches } = this.props

    if (!batches) { return null }
    return(
      <div className="BatchesContainer">
        <BatchEditor />
        <header>
          <Title content="All Classes" />
        </header>

        <main>
          {batches.map( (batch,index) => this.renderBatch(batch,index))}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(BatchesContainer)
