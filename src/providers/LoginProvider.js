import {useState, createContext} from 'react';

export const LoginContext = createContext()


export const LoginProvider = props =>{
    const token = window.localStorage.getItem('token')
    const [loginStatus, setLoginStatus] = useState(token)
    return (
        <LoginContext.Provider value={[loginStatus,setLoginStatus]}>
            {props.children}
        </LoginContext.Provider>
    );
}
