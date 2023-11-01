import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { createUser } from '../../redux/authSlice/auth';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log('errors - ', errors)

    const formSubmit = (data) => {
        console.log("FORM Submit - ", data);
        dispatch(createUser(data));
    }
    // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit(formSubmit)} noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                {...register("firstName", {
                                    required: "First name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Only alphabet allowed for first name field",
                                    },
                                })}
                            />
                            {errors.firstName && <span className='error'>{errors.firstName.message}</span>}
                            {/* {errors.firstName?.type === "pattern" && <span className='error'>Only alphabet allowed for first name field.</span>} */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                {...register("lastName", {
                                    required: "Last Name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Only alphabet allowed for last name field",
                                    },
                                })}
                            />
                            {errors.lastName && <span className='error'>{errors.lastName.message}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                {...register("email", {
                                    required: "Email Address is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    },
                                    message: "Please enter valid email"
                                })}
                            />
                            {errors.email?.type === "required" && <span className='error'>Email Address is required.</span>}
                            {errors.email?.type === "pattern" && <span className='error'>Please enter valid email.</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Length must be 8 or more"
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Maximum length is 15"
                                    }
                                })}
                            />
                            {errors.password && <span className='error'>{errors.password.message}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value, formValues) => value === formValues.password || "Confirm password not matched"
                                })}
                            />
                            {errors.confirmPassword && <span className='error'>{errors.confirmPassword.message}</span>}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Signup;