import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Welcome = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Card>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://static.vecteezy.com/system/resources/previews/011/431/955/non_2x/computer-and-account-login-and-password-form-page-on-screen-sign-in-to-account-user-authorization-login-authentication-page-concept-flat-illustration-vector.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        About this project:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Hi there, I am Harshit Verma
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Let's talk about this project, this is the user authentication system. this application is made for authenticate the user. Authorized user can access the protected routes whereas unauthorized user can not access the protected routes.
                        stack used : React, Redux, NodeJS, ExpressJS, MongoDB , JWT(for generating Token), bcrypt(password-hashing).
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Process :
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        1. User will have to Login himself. (we will check this user is exist in the database or not).
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        2. If user is not exist in the database then user will have to register himself.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        3. After registeration, if user login with the same details, then user will get the message (Login successfully !). In case, if email is wrong user will get an error, and if didn't enter the right password during the Login then user will get an error.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        4. User will get the JSON Web Token during the login and user can access the protected routes.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        5. Once the user click on the Logout button then user will not be able to access the protected routes. if user wants to access again so he will have to login again.
                    </Typography>
            </CardContent>
        </Card>
        </Container >
    );
}

export default Welcome;