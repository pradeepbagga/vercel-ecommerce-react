import React, { useEffect, useState } from 'react';
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
import { createUser, errorRemove, successRemove } from '../../redux/authSlice/signup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../utils/Alert/Index';
import Loader from "../../utils/Loader/Loader";

const Signup = () => {
    const { loading, error, success, message } = useSelector((state) => state.userCreate);
    const [msge, setMessage] = useState(null);
    const [alrt, setAlrt] = useState(null);
    const [type, setType] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const formSubmit = (data) => {
        dispatch(createUser(data));
    }

    useEffect(() => {
        if (error) {
            setMessage(message);
            setAlrt(true);
            setType("error");
            setTimeout(() => {
                dispatch(errorRemove());
                setAlrt(false);
            }, 5000);
        }
        if (success) {
            setMessage(message);
            setAlrt(true);
            setType("success");
            setTimeout(() => {
                dispatch(successRemove());
                setAlrt(false);
            }, 5000);
        }

        if(loading) {
            setBtnDisabled(true);
        }
        else {
            setBtnDisabled(false);
        }


    }, [error, success, message, dispatch, loading]);


    return (
        <Container maxWidth="sm">
            {alrt && <Alert text={msge} type={type} />}
            {
                loading && <Loader />
            }
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
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                {...register("name", {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Only alphabet allowed for first name field",
                                    },
                                })}
                            />
                            {errors.name && <span className='error'>{errors.name.message}</span>}
                            {/* {errors.firstName?.type === "pattern" && <span className='error'>Only alphabet allowed for first name field.</span>} */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="surname"
                                label="Last Name"
                                name="surname"
                                autoComplete="family-name"
                                {...register("surname", {
                                    required: "Last Name is required",
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: "Only alphabet allowed for last name field",
                                    },
                                })}
                            />
                            {errors.surname && <span className='error'>{errors.surname.message}</span>}
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={btnDisabled}
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