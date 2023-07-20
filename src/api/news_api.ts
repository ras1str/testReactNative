import api from "./ApiManager";
import { useAppSelector } from "../hooks/redux-hooks";

interface INews { 
    id: number, 
    title: string, 
    body: string, 
    description: string
}

interface Result {
    news: INews[]
}

export const userNews = async () => {
    const { token, client, uid } = useAppSelector(state => state.user)
   console.log('321')
    try {
        if (token != null && client != null && uid != null) {
            api.setHeaders({
                ["access-token"]: token!,
                client: client!,
                uid: uid!,

            })
        }
        console.log('123')
        const result = await api.get<{ news : INews[]}>('/news')
        console.log(result.data)
        return result
        

    } catch (error: any) {
        
    }

}