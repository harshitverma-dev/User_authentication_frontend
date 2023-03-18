import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BiLock } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { Condition, Message } from '../context/contextProvider';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { toast } from 'react-toastify';


const theme = createTheme();

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { showMessage, setShowMessage } = useContext(Message);
    const { alertCondition, setAlertCondition } = useContext(Condition);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }


    const sendRequest = async () => {
        const res = await axios.post('https://user-authentication-backend-5np6.onrender.com/api/login', inputs)
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.errorMessage)
            })
      
        if (res.data.message) {
            setShowMessage(res.data.userCheck);
            setAlertCondition(res.data.signup);
        }
        return res;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs;
        if (!email) {
            toast.error('Email is required to Login !');
        } else if (!password) {
            toast.error('Registered Password is required to Login !');
        } else {
            const resData = await sendRequest();
            setInputs({
                email: "",
                password: ""
            })

            if (resData.data.userCheck._id) {
                navigate('/home');
                toast.success('user successfully login !')
                dispatch(authActions.login())
            }
        }
    };

    return (
        <ThemeProvider theme={theme} >
            {((alertCondition === "login") && showMessage) && <Alert onClose={() => setShowMessage("")}>{`${(showMessage.name).toUpperCase()} successfully Login !`}</Alert>}
            <Grid container component="main" sx={{ mt: 3, mb: 3 }} >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 5,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <BiLock />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log In
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                value={inputs.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                value={inputs.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container direction="row"
                                justifyContent="flex-end"
                                alignItems="center">
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* <ToastContainer
                position="top-right"
            /> */}
        </ThemeProvider >
    );
}


export default Login;