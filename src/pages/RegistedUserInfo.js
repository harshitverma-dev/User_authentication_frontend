import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistedUserInfo = () => {
    const [storeUsersData, setStoreUsersData] = React.useState();
    React.useEffect(() => {
        axios.get('https://user-authentication-backend-5np6.onrender.com/api/allusers').then((res) => {
            setStoreUsersData(res.data);
            toast.success('fetched all registered Users data from database !');
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <Container maxWidth="lg">
            <Grid container component="main" maxWidth="lg" sx={{ mt: 3, mb: 3 }} spacing={5}>
                {
                    storeUsersData?.map((user) => {
                        return (
                            <Grid item xs={12} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="230"
                                        image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            DataBase ID : {user._id}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Email : {user.email}
                                        </Typography>
                                        <Typography gutterBottom variant="body1" color="text.secondary">
                                            Phone: {user.phone}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }



            </Grid>
        </Container>


    );
}

export default RegistedUserInfo;