// ProfileCard.js
import React from 'react';
import { Avatar, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();

    const avatarSrc = "https://example.com/avatar.jpg"  // Replace with the actual URL of your avatar image
    const name = "John Doe";
    const fields = [
        { key: 'Age', value: '25' },
        { key: 'Location', value: 'City, Country' },
        // Add more key-value pairs as needed
    ];

    const logout = () => {
        console.log("hello")

        // Redirect to the login page
        router.replace('/');
    }


    return (
        <Card>
            <CardContent>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ textAlign: "-webkit-center" }}>
                        <Avatar alt={name} src={avatarSrc} sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{name}</Typography>
                    </Grid>
                </Grid>

                <Grid sx={{ padding: "20px 0px 0px 10px" }} container spacing={2}>
                    {fields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">{field.key}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">{field.value}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
                <Button fullWidth variant="outlined" color="secondary" onClick={() => {
                    logout()
                }} style={{ marginTop: 10 }}>
                    Logout
                </Button>
            </CardContent>
        </Card>
    );
};

export default Profile;
