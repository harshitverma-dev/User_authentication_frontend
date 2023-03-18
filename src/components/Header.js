import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { MdMenu } from "react-icons/md";
import { Tab, Tabs } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// import { Message } from '../context/contextProvider';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';
import { toast, ToastContainer } from 'react-toastify';

axios.defaults.withCredentials = true

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const isLogIn = useSelector(state => state.isLogIn);
    // console.log(isLogIn)
    const [value, setValue] = useState();
    // const { showMessage, setShowMessage } = useContext(Message);

    const logoutApiCall = async () => {
        const res = await axios.post('https://user-authentication-backend-5np6.onrender.com/api/logout', null, {
            withCredentials: true
        })
        if (res.status === 200) {
            return res
        }

        return new Error('unable to logout, Please try again')
    }

    const handleLogout = () => {
        logoutApiCall().then(() => {
            dispatch(authActions.logout())
            toast.success('user logout successfully !')
            navigate('/')
        })
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className='navbarWrap'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        User Authentication
                    </Typography>
                    <Tabs indicatorColor="primary" textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                        {!isLogIn &&
                            <Tab to="/" LinkComponent={Link} label="Welcome" />
                        }
                        {isLogIn &&
                            <Tab to="/home" LinkComponent={Link} label="Home" />
                        }
                        {isLogIn &&
                            <Tab to="/RegistedUserInfo" LinkComponent={Link} label="Registed User List" />
                        }
                        {!isLogIn &&
                            <Tab to="/login" LinkComponent={Link} label="Login" />
                        }
                        {!isLogIn &&
                            <Tab to="/signup" LinkComponent={Link} label="Signup" />
                        }
                        {isLogIn &&
                            <Tab onClick={handleLogout} to="/logout" LinkComponent={Link} label="Logout" />
                        }
                    </Tabs>
                </Toolbar>
            </AppBar>
            <ToastContainer
                position="top-center"
            />
        </Box>
    );
}


export default Header;