import {createStore} from 'redux'
import resultReducer from './reducer'

const store = createStore(resultReducer);

export default store