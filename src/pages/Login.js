import styles from './Login.module.css'
import {useState, useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {LoginContext} from '../providers/LoginProvider';

function Login(){  
    const [loginStatus, setLoginStatus] = useState(true);
    const [token, setToken] = useContext(LoginContext);
    console.log('Token: ', token)
    const navigate = useNavigate()

    const userNameRef = useRef();
    const passwordRef = useRef();
    
    function authorize(auth){
        console.log('User authorized');
        window.localStorage.setItem('token',auth)
        setLoginStatus(true);
        setToken(auth)
        navigate('/')
    }

    function loginHandler(event){
        event.preventDefault();
        const username = userNameRef.current.value;
        const password = passwordRef.current.value;
        console.log('............................')
        async function authenticate(username,password){
            const res = await fetch(
                ('https://api.waziup.io/api/v2/auth/token'),
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        'username': username,
                        'password': password
                    })
                }
            )
            
            if (res.status === 200){
                return await res.text();
            }            
        }
        authenticate(username,password).then((auth=>{
        auth?authorize(auth):setLoginStatus(false)
        })
    )

    }
    return (
        <div className={styles.main}>
            <form className={styles.login_form} onSubmit={loginHandler}> 
                {
                    !loginStatus?
                        <div className='text-danger'>Invalid login details</div>
                    :null
                }               
                <div>
                    <input ref={userNameRef} className="form-control" placeholder='username'type="text" required/>
                </div>
                <div>
                    <input ref={passwordRef} className="form-control" placeholder="password" type="password" required />
                </div>
                <div className='submit'>
                    <button className="btn bg-primary text-white">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
