import { push } from 'react-router-redux'
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from './loading'

const api = new API()
export const CREATE_STUDENT_BATCH = 'CREATE_STUDENT_BATCH'

export default (newStudent,batchid) => {
   const token = api.getToken()
  return (dispatch) => {
    if (!api.isAuthenticated()) {
      dispatch(push('/sign-in'))
      return
}
    dispatch({ type: APP_LOADING })

    api.post('students', newStudent)
     .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: CREATE_STUDENT_BATCH,
          payload: res.body
        })
        console.log(batchid)
        console.log(res.body._id)
        api.put(`batches/${batchid}/student/${res.body._id}`)
        .then((res) => {console.log(res.body) })
        .catch((error) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({
            type: LOAD_ERROR,
            payload: error.message
          })
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
