"use client";
import React, { FormEvent, useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup: React.FC = () => {
    const router = useRouter();

    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event: FormEvent) => {
        try {
            if (errorMessage != "") setErrorMessage("");

            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);

            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const firstName = formData.get("firstName") as string;
            const lastName = formData.get("lastName") as string;

            const response: any = await axios.post(`/api/signup`, {
                email,
                password,
                firstName,
                lastName,
            });

            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(response.data.user));

                router.push("/tasks");
            }
        } catch (error: any) {
            console.error("Error during login:", error);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>
                <form onSubmit={handleLogin} style={{ width: "100%", marginTop: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
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

                    {errorMessage && (
                        <Typography color={"red"}>{errorMessage}</Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        sx={{ marginTop: 2 }}
                    >
                        Signup
                    </Button>
                    <Typography textAlign={"center"} paddingTop={"10px"}>
                        back to <Link href="/"><Typography display={"inline"} color={"secondary"}>Login</Typography></Link>

                    </Typography>
                </form>
            </Paper>
        </Container>
    );
};

export default Signup;
