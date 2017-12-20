// src/reducers/batches.js
import {
  FETCHED_RANDOM_STUDENT
} from '../actions/batches'


export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_RANDOM_STUDENT:
    return payload
    default :
      return state
  }
}