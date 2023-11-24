import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../utils/Alert/Index';
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
    const [emailVerify, setEmailVerify] = useState(false);
    const [msge, setMessage] = useState(null);
    const [alrt, setAlrt] = useState(null);
    const [type, setType] = useState(null);
    const navigate = useNavigate();

    const parmams = useParams();
    useEffect(() => {
        console.log('parmams - ', parmams)
    });

    const handleVerify = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/verify/${parmams.token}`;
        // const res = await axios.post(url);
        // console.log('abc - ', res);
        // if (res.statusText === "OK") {
        //     setAlrt(true);
        //     setMessage(res.data.message);
        //     setType("success");
        // }
        try {
            const res = await axios.post(url);
            console.log('abc - ', res);
            // if (res.statusText === "OK") {
            setAlrt(true);
            setMessage(res.data.message);
            setType("success");
            setTimeout(()=>{
                navigate("/signin")
            },3000);
            // }
        } catch (error) {
            console.log('error - ', error.response.data);
            setAlrt(true);
            setMessage(error.response.data.message);
            setType("error");
        }
    }

    return (<>
        {alrt && <Alert text={msge} type={type} />}

        <div className='emailVerify text-center'>
            {
                emailVerify ? (<>
                    <h3>Your email is verified.</h3>
                </>) : (<>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <h4>Please click on verify button.</h4>
                    <p>&nbsp;</p>
                    <p>
                        <Button variant="contained" onClick={() => handleVerify()}>Verify</Button>
                    </p>
                </>)
            }

        </div>
    </>
    )
}

export default EmailVerify;