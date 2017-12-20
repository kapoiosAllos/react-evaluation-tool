import { push } from 'react-router-redux'
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from './loading'

const api = new API()
export const CREATE_BATCH = 'CREATE_BATCH'

export default (batch) => {
   const token = api.getToken()
  return (dispatch) => {
    if (!api.isAuthenticated()) {
      dispatch(push('/sign-in'))
      return
}
    dispatch({ type: APP_LOADING })

    api.post('batches', batch)
     .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: CREATE_BATCH,
          payload: res.body
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
