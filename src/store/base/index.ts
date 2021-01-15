import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
    name: 'base',
    module: {
        namespaced: true,
        state,
        getters,
        mutations,
        actions
    }
}
