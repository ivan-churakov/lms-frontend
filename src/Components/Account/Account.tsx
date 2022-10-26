import accountIcon from '../../images/accountProfile.png'
import {useEffect, useState} from "react";
import {GET_ME_URL, getMe, refreshToken} from "../../api/api";
import {useNavigate} from "react-router-dom";

interface IUser {
    id: string;
    username: string;
    phone: string;
    email: string;
    firstname: string;
    lastname: string;
}

export const Account = () => {
    const [user, setUser] = useState<IUser>();
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getMe({
            method: 'post',
            url: GET_ME_URL,
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
                if(error.response.status === 401) {
                    refreshToken((error) => {
                        if(error === 401) {
                            navigate('/')
                        }
                    })

                    setReload(reload => !reload)
                }
            })
            .then(res => {
                if(res) {
                    setUser(res.data)
                }
            });
    }, [reload])

    return (
            <div className="bg-secondary-color rounded-lg sm:rounded-xl p-4 sm:p-6 xl:p-8">
                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                    <img src={accountIcon} alt="account icon" className="w-28"/>
                    <div className="flex flex-col gap-2 sm:gap-4">
                        <p className="text-lg sm:text-xl">Username: {user ? user.username : ''}</p>
                        <p className="text-lg sm:text-xl">Email: {user ? user.email : ''}</p>
                        <p className="text-lg sm:text-xl">Телефон: {user ? user.phone : ''}</p>
                        <p className="text-lg sm:text-xl">Имя: {user ? user.firstname : ''}</p>
                        <p className="text-lg sm:text-xl">Фамилия: {user ? user.lastname : ''}</p>
                    </div>
                </div>
            </div>
    )
}