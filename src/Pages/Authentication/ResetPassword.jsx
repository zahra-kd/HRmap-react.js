import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../Config/Constants";


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const params = useParams();

    const resettingPassword = (event) => {
        event.preventDefault()
        if (password === confirmedPassword) {
            axios.post(API_URL + 'reset-password/' + params.token, {
                password: password
            }).then(response => {
                setMessage(response.data.success);
            }).catch (error => {
                setErrorMessage(error.response.data.error);
            })
        } else {
            setErrorMessage("enter a valid password")
        }
    }


    return(
        <div className="background vh-100 d-flex flex-column justify-content-center">
        
        <div className="box col-4 mx-auto">
            <h4 className="mb-3">Reset Password</h4>
            <form action="" method="post" onSubmit={resettingPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" onChange={e => setConfirmedPassword(e.target.value)} aria-describedby="emailHelp" />
                </div>
                {message && <div className="alert alert-success mb-3">{message}</div>}
                {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary text-white">Submit</button>
                    <Link to={"/"} >Sign-in</Link>
                </div>
            </form>
        </div>
    </div>
    )
}
export default ResetPassword;