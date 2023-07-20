import api from "./ApiManager";

interface Login {
    email: string,
    password: string
}
export interface User {
    id: number;
    name: string;
    email: string;
  }

export const userLogin = async ({ email, password }: Login) => {

    try {
        const result = await api.post<{ user: User }>('/auth/sign_in', { email, password })
        if (result.status === 200) {
            if (result.headers) {
                const accessToken = result.headers['access-token']
                const client = result.headers.client
                const uid = result.headers.uid

               const data=result.data!
             
               const response = {data, accessToken, client, uid}
            return response

            }
            
        }

        if (result.status === 401) {
            console.log('erorr authtorization, wrong email or password')

        }


    } catch (error: any) {
        console.log(error)
    }

}
