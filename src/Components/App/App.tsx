import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {login, LOGIN_URL, SIGN_UP_URL, signUp} from "../../api/api";

interface IReg {
    email: string;
    username: string;
    phone: string;
    firstname: string;
    lastname: string;
    password: string;
}

interface IAuthResponse {
    access_token: string;
    refresh_token: string;
}

export function App() {
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [inOut, setInOut] = useState<boolean>(true)
    const [reg, setReg] = useState<IReg>({
        email: email,
        phone: phone,
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
    })
    const [log, setLog] = useState({
        email: email,
        password: password,
    })
    const [correct, setCorrect] = useState<boolean>(false)
    const navigate = useNavigate();

    const onInput = (e: any) => {
        if(e.target.id === 'email') {
            setEmail(e.target.value)
        } else if (e.target.id === 'username') {
            setUsername(e.target.value)
        } else if (e.target.id === 'phone') {
            setPhone(e.target.value)
        } else if (e.target.id === 'firstname') {
            setFirstname(e.target.value)
        } else if (e.target.id === 'lastname') {
            setLastname(e.target.value)
        } else if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
        setReg({
            email: email,
            phone: phone,
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
        })
    }

    const onInputLog = (e: any) => {
        if(e.target.id === 'email') {
            setEmail(e.target.value)
        } else if (e.target.id === 'password') {
            setPassword(e.target.value)
        }
        setLog({
            email: email,
            password: password,
        })
    }

    const onSubmitLogin = (e: any) => {
        let keys: IAuthResponse;
        e.preventDefault();
        login({
            method: 'post',
            url: LOGIN_URL,
            data: log
        })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                if(error.response.status === 400) {
                    setCorrect(correct => !correct)
                }
                console.log(error.config);
            })
            .then(res => {
                if(res) {
                    keys = res?.data;
                    localStorage.setItem('access_token', keys.access_token);
                    localStorage.setItem('refresh_token', keys.refresh_token);
                    navigate("/dashboard")
                }
            });
    }

    const onSubmit = (e: any) => {
        setReg({
            email: email,
            phone: phone,
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
        })
        let keys: IAuthResponse;
        e.preventDefault();
        signUp({
            method: 'post',
            url: SIGN_UP_URL,
            data: reg
        })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
            .then(res => {
                if(res) {
                    keys = res?.data;
                    localStorage.setItem('access_token', keys.access_token);
                    localStorage.setItem('refresh_token', keys.refresh_token);
                    navigate("/dashboard")
                }
            });
    }
    return (
        <div className="w-full h-fit min-h-full py-10 bg-cover bg-background">
            {inOut ?
                <div className="container mx-auto h-full text-font-color flex flex-col items-center justify-center px-4 sm:p-0">
                    <div className="w-full sm:w-[550px] h-fit bg-secondary-color rounded-xl p-4 sm:p-10">
                        <form className="flex flex-col gap-4 sm:gap-6">
                            <p className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Вход</p>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="email">Email*</label>
                                <input required id="email" type="email"
                                       value={email}
                                       onChange={onInputLog}
                                       className={`text-xl px-6 py-2 bg-secondary-color ${correct ? "border-red-500" : 'border-blue-color'} border-[3px] rounded-xl focus:outline-none`}
                                       placeholder="email@example.com"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="password">Пароль*</label>
                                <input required id="password" type="password"
                                       value={password}
                                       onChange={onInputLog}
                                       className={`text-xl px-6 py-2 bg-secondary-color ${correct ? "border-red-500" : 'border-blue-color'} border-[3px] rounded-xl focus:outline-none`}
                                       placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗"/>
                            </div>
                            <button onClick={onSubmitLogin} className="text-xl px-6 py-2 bg-blue-color rounded-xl mt-4 sm:mt-6">Войти</button>
                        </form>
                        <div className="flex flex-col sm:flex-row sm:gap-8 font-bold items-center sm:justify-center mt-[30px]">
                            <p className="text-lg sm:text-2xl">Нет аккаунта?</p>
                            <p onClick={() => {setInOut(false)}} className="w-fit text-lg sm:text-2xl border-b-[3px] border-blue-color rounded-bl-sm rounded-br-sm text-blue-color">Зарегистрироваться</p>
                        </div>
                    </div>
                </div>
                :
                <div className="container mx-auto h-full text-font-color flex flex-col items-center justify-center px-4 sm:p-0">
                    <div className="w-full sm:w-[550px] h-fit bg-secondary-color rounded-xl p-4 sm:p-10">
                        <form className="flex flex-col gap-4 sm:gap-6">
                            <p className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Регистрация</p>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="username">Login*</label>
                                <input required id="username"
                                       type="text"
                                       value={username}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="IvanIvanov"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="email">Email*</label>
                                <input required id="email"
                                       type="email"
                                       value={email}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="email@example.com"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="phone">Телефон</label>
                                <input id="phone"
                                       type="phone"
                                       value={phone}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="+7 900-000-00-00"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="firstname">Имя</label>
                                <input id="firstname"
                                       type="text"
                                       value={firstname}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="Иван"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="lastname">Фамилия</label>
                                <input id="lastname"
                                       type="text"
                                       value={lastname}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="Иванов"/>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xl sm:text-2xl mb-3 font-bold" htmlFor="password">Пароль*</label>
                                <input required id="password"
                                       type="password"
                                       value={password}
                                       onChange={onInput}
                                       className="text-xl px-6 py-2 bg-secondary-color border-blue-color border-[3px] rounded-xl focus:outline-none"
                                       placeholder="∗∗∗∗∗∗∗∗∗∗∗∗∗"/>
                            </div>
                            <button onClick={onSubmit} className="text-xl px-6 py-2 bg-blue-color rounded-xl mt-4 sm:mt-6">Зарегистрироваться</button>
                        </form>
                        <div className="flex flex-col sm:flex-row sm:gap-8 font-bold items-center sm:justify-center mt-[30px]">
                            <p className="text-lg sm:text-2xl ">Уже есть аккаунт?</p>
                            <p onClick={() => {setInOut(true)}} className="w-fit text-lg sm:text-2xl border-b-[3px] border-blue-color rounded-bl-sm rounded-br-sm text-blue-color">Войти</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
