import { Alert, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Container } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Message } from '../context/contextProvider';
axios.defaults.withCredentials = true;


// let firstRender = true;
const Home = () => {
    const [storeUserData, setStoreUserData] = useState();
    const { showMessage, setShowMessage } = useContext(Message);


    const refreshToken = async () => {
        const res = await axios.get('https://user-authentication-backend-5np6.onrender.com/api/auth/refresh', {
            withCredentials: true
        }).catch(err => {
            console.log(err);
        })
        return res;

    }

    const getUserRequest = async () => {
        const res = await axios.get('https://user-authentication-backend-5np6.onrender.com/api/auth/user', {
            withCredentials: true
        }).catch((err) => {
            console.log(err);
        })

        return res;
    }
    useEffect(() => {
        let firstRender = true;
        console.log(firstRender)
        if (firstRender) {
            firstRender = false;
            getUserRequest().then((data) => {
                setStoreUserData(data.data);
            });
        }
        let interval = setInterval(() => {
            refreshToken().then((data) => {
                setStoreUserData(data.data);
                // console.log(data.data);
            })
        }, 1000 * 29)

        return () => clearInterval(interval);

    }, [])
    return (
        <div>
            {console.log(storeUserData)}
            {showMessage && <Alert onClose={() => setShowMessage("")}>{`${(showMessage.name).toUpperCase()} successfully Login !`}</Alert>}
            {storeUserData &&
                <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                    <Card>
                        <Typography color="text.secondary" sx={{ ml: 3, mt: 2 }} gutterBottom variant="h6" component="div">
                            Login UserName : {storeUserData.name}
                        </Typography>
                        <Typography color="text.secondary" sx={{ ml: 3, mt: 2 }} gutterBottom variant="h6" component="div">
                            Login UserEmail : {storeUserData.email}
                        </Typography>
                        <Typography color="text.secondary" sx={{ ml: 3, mt: 2 }} gutterBottom variant="h6" component="div">
                            Login UserPhoneNo. : {storeUserData.phone}
                        </Typography>
                        <Typography color="text.secondary" sx={{ ml: 3, mt: 2 }} gutterBottom variant="h6" component="div">
                            Login UserDataBaseId : {storeUserData._id}
                        </Typography>
                    </Card>
                </Container>
            }
        </div>
    )
}

export default Home
