import { useAppSelector } from "./redux-hooks";

export function useAuth() {
    const { email, token, uid, client } = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        uid,
        client
    }
}