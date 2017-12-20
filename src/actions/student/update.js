import ApiClient from '../../api/client'

export const UPDATE_STUDENT = 'UPDATE_STUDENT'

const api = new ApiClient()

export default (updatedStudent) => {
  return dispatch => {
    // dispatch(loading(true)) // ???
    api.put('students/'+updatedStudent._id, updatedStudent)
      .then(res => {return dispatch({ type: UPDATE_STUDENT, payload: updatedStudent });})
      //.catch(err => dispatch(loadError(err))) ???

    // dispatch(loading(false)) // ???
  }
}
