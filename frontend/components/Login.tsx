"use client";
import React, { FormEvent, useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginScreen: React.FC = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event: FormEvent) => {
        try {
            if (errorMessage != "")
                setErrorMessage("")

            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);

            const email = formData.get('username') as string;
            const password = formData.get('password') as string;


            const response: any = await axios.post(`/api/login`, {
                email,
                password
            });

            if (response.status === 200) {
                router.push("/tasks");
            }

        } catch (error: any) {
            console.error('Error during login:', error);
            setErrorMessage(error.response.data.message)

        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {errorMessage &&
                        <Typography color={"red"}>
                            {errorMessage}
                        </Typography>
                    }
                    <Button type="submit" fullWidth variant="outlined" sx={{ marginTop: 2 }}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default LoginScreen;
