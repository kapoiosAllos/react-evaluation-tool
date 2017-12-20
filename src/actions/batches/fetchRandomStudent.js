import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from './loading'

export const FETCHED_RANDOM_STUDENT = 'FETCHED_RANDOM_STUDENT'

const api = new API()

export default (id) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('batches/'+id+'/student')
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: FETCHED_RANDOM_STUDENT,
          payload: result.body
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
