// src/reducers/batches.js
import {
  FETCHED_BATCHES,
  CREATE_BATCH,
  FETCHED_BATCH,
  CREATE_STUDENT_BATCH,
} from '../actions/batches'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_BATCHES :
      return [ ...state,...payload ]
    case FETCHED_BATCH:
      return [ ...payload ]
    case CREATE_STUDENT_BATCH:
      return [...state,payload]
    case CREATE_BATCH :
      return [{ ...payload }].concat(state)
    default :
      return state
  }
}
