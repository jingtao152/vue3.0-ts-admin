import {createStore, createLogger} from 'vuex'
import base from './base'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        [base.name]: base.module
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []// debug add logger module
})
