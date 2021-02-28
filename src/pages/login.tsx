import styles from '../styles/pages/login.module.css';
import FacebookLogin from 'react-facebook-login';

export default function Login() {
    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
       <div className={styles.container}>
           <section>
            <div>
                <img src="/logo-full.svg" alt="Move It"/>
            </div>
            <div>
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook} />
            </div>
           </section>
       </div>
    );
}