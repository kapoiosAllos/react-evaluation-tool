// src/actions/batches/fetch
import ApiClient from '../../api/client'
// import loading from '../loading' // ???
// import loadError from '../loadError' // ???
export const FETCHED_STUDENT = 'FETCHED_STUDENT'

const api = new ApiClient()

export default (id) => {
  return dispatch => {
    // dispatch(loading(true)) // ???
    api.get('students/'+id)
      .then(res => {return dispatch({ type: FETCHED_STUDENT, payload: res.body });})
      //.catch(err => dispatch(loadError(err))) ???

    // dispatch(loading(false)) // ???
  }
}
