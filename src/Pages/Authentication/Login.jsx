import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Config/Constants";
import axios from "axios";
import AuthContext from "../../Context/Context";

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const clickLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('data : ', email , password)
            let res = await axios.post(API_URL + "login", {email, password});
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/menu");
        } catch (err) {
            console.log('error login:',err);
            setMessage("user not found");
        }
    };



    return(
        <div className="background vh-100 d-flex flex-column justify-content-center">
            <h1 className="text-center mb-4">HRmap</h1>
            <div className="col-4 bg-white shadow-sm rounded-2 py-4 mx-auto">
                <form onSubmit={clickLogin} action="" method="post"  className="col-8 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address:</label>
                        <input type="email" className="form-control" onChange={e =>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                        <input type="password" className="form-control" onChange={e =>setPassword(e.target.value)} id="exampleInputPassword1" />
                    </div>
                    {message && <div className="alert alert-danger mb-3">{message}</div>}
                    <div className="d-flex justify-content-between">
                        <Link to={"forgot-password"} className="d-block mb-3">Forgot password?</Link>
                        <button type="submit" className="btn btn-primary text-white">Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
export default Login;