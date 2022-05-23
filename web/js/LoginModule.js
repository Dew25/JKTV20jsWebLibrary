import {checkMenu} from './App.js';
class LoginModule{
    login(){
        const userLogin = document.getElementById('login').value;
        const userPassword = document.getElementById('password').value;
        const credential = {
            "login": userLogin,
            "password": userPassword
        };
        let promiseLogin = fetch('login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include',
            body: JSON.stringify(credential)
        });
        promiseLogin.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            document.getElementById('info').innerHTML=response.info;
                            sessionStorage.setItem('authUser', JSON.stringify(response.user));
                            sessionStorage.setItem('role', JSON.stringify(response.role));
                            document.getElementById('content').innerHTML='';
                            checkMenu();
                        }else{
                            document.getElementById('info').innerHTML=response.info;
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка логина: "+error;
                    })
    }
    logout(){
        let promiseLogout = fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include'
        });
        promiseLogout.then(response => response.json())
                    .then(response =>{
                        if(response.status){
                            document.getElementById('info').innerHTML=response.info;
                            if(sessionStorage.getItem('user') !== null){
                                sessionStorage.removeItem('user');
                            }
                            if(sessionStorage.getItem('role') !== null){
                                sessionStorage.removeItem('role');
                            }
                            checkMenu();
                        }
                    })
                    .catch(error => {
                        document.getElementById('info').innerHTML="Ошибка logout: "+error;
                    });
    }
}
const loginModule = new LoginModule();
export {loginModule};


