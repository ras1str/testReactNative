import {create} from 'apisauce'
import { useAppSelector } from '../hooks/redux-hooks'

const api = create({
    baseURL: 'https://lzone.secret-agents.ru/api/v2',
})


export default api