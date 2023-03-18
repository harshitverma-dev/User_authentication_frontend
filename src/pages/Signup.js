import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BiLock } from "react-icons/bi";
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Condition, Message } from '../context/contextProvider';
import { Alert } from '@mui/material';

const theme = createTheme();

const Signup = () => {
    const { showMessage, setShowMessage } = useContext(Message);
    const { alertCondition, setAlertCondition } = useContext(Condition);
    // const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const sendRequest = async () => {
        const res = await axios.post('https://user-authentication-backend-5np6.onrender.com/api/register', inputs)
            .catch((err) => {
                console.log(err);
            })
        // console.log(res)
        if (res.data.message) {
            setShowMessage(res.data.saveUser);
            setAlertCondition(res.data.signup);
        }
        return res;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, phone } = inputs;
        if (!name) {
            toast.error("Name is required !");
        } else if (!email) {
            toast.error("Email is required !");
        } else if (!email.includes('@gmail.com')) {
            toast.error("Email formate is wrong !")
        } else if (!password) {
            toast.error("Password is required !");
        } else if (!phone) {
            toast.error("Phone is required !");
        } else {
            sendRequest();
            setInputs({
                name: "",
                email: "",
                password: "",
                phone: ""
            })
        }
    };

    const dismiss = () => {
        setShowMessage("");
        setAlertCondition("");
    }

    return (
        <ThemeProvider theme={theme}>
            {((alertCondition === "signup") && showMessage) && <Alert onClose={() => dismiss()}>{`${(showMessage.name).toUpperCase()} successfully register, Now go to the Login page and Enter your registered details to Login !`}</Alert>}
            <Grid container component="main" sx={{ mt: 3, mb: 3 }} >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp)',
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
                            my: 4,
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
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <TextField
                                        value={inputs.name}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs>
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
                                </Grid>
                            </Grid>
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
                            <TextField
                                value={inputs.phone}
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="number"
                                id="phone"
                                autoComplete="phone"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Sign Up
                            </Button>
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


export default Signup;
