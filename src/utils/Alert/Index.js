import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alert = (props) => {
    console.log('props - ', props);

    useEffect(() => {
        if (props.type === "error") {
            toast.error(props.text, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } 

        if (props.type === "success") {
            toast.success(props.text, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, []);
    // useEffect(() => {
    //     return () => {
    //         console.log('******************* UNMOUNTED');
    //     };
    // });

    return (<>
        <ToastContainer />
    </>
    )
}

export default Alert;