import Axios from '../service'
import { AxiosRequestConfig} from 'axios'
import Url from '../Url'
import {addRouter} from '../../router/route'

const config: AxiosRequestConfig = {
    method: 'get'
}

export const GetMenu  = async (commit) => {
    const { data } = await Axios(Url.menu, config)
    addRouter(data)
    commit('SET_MENU', data)
    return data
}
