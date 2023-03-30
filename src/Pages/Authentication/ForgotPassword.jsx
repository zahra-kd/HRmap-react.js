import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (event) => {
        event.preventDefault();
        axios.post(API_URL + 'forgot-password', {email}).then(response => {
            setMessage(response.data.success);
            setEmail('');
        }).catch(error => {
            setErrorMessage(error.response.data.error);
        })
    }
    return (
        <div className="background vh-100 d-flex flex-column justify-content-center">
            <div className="box col-4 mx-auto">
                <h4 className="mb-3">Forgot Password</h4>
                <form action="" method="post" onSubmit={sendEmail}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" />
                    </div>
                    {message && <div className="alert alert-success mb-3">{message}</div>}
                    {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
                    <button type="submit" className="btn btn-primary text-white">Submit</button>
                </form>
            </div>
            
        </div>
    )
}

export default ForgotPassword;