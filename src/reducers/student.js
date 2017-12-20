// src/reducers/batches.js
import {
  FETCHED_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT
} from '../actions/student'

const newId = (state) => {
  const ids = state
    .map((student) => student._id)
    .sort()
  return ['abcd', parseInt(ids[ids.length - 1].split('abcd')[1], 10) + 1].join('')
}

export default (state = [], {type, payload} = {}) => {
  switch(type) {
    case FETCHED_STUDENT :
      return { student: payload}

    case CREATE_STUDENT :
      return [{ ...payload, _id: newId(state) }].concat(state)

    case UPDATE_STUDENT :
      return { student: payload}

    default :
      return state
  }
}