import { useContext } from "react"
import AuthContext from "./authContext";
// import storage from "./storage";

export default useAuth = () => {
    const {user, setUser} = useContext(AuthContext);

    const logOut = () => {
        setUser(null);
        //storage.removeToken(); //mivel ezután nincs kód, nem kell await
    }

    const login = (associationId, username, password) => {
        const user = {
            associationId, username, password
        }
        setUser(user);
    }

    // const login = (authToken) => {
    //     const user = {
    //         name: "Mosh",
    //         email: "mosh@domain.com",
    //         userId: 1,
    //         iat: 1590609638
    //       }
    //     setUser(user);
    //     //storage.storeToken(authToken);
    // }

    return {user, logOut, login};
}