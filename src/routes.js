// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import StudentContainer from './student/StudentContainer'
import BatchesContainer from './batches/BatchesContainer'
import BatchContainer from './batch/BatchContainer'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/student/:id" component={StudentContainer} />
        <Route path="/batches/:id" component={BatchContainer} />
        <Route path="/batches" exact component={BatchesContainer} />
      </div>
    )
  }
}
