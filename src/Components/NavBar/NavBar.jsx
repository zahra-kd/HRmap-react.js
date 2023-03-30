import { useContext, useEffect } from "react";
import AuthContext from "../../Context/Context";
import { API_URL_PICTURE } from "../../Config/Constants";
import { Link } from "react-router-dom";

const NavBar = () =>{
    const { user, setUser } = useContext(AuthContext);
    return(
        <nav className="navbar fixed-top bg-white shadow-sm">
            <div className="container d-flex">
                { user?.role === "admin" ?
                <Link to={''} className="navbar-brand mb-0 h1" style={{ color: "#063970" }}>HRmap</Link> :
                <Link to={''}className="navbar-brand mb-0 h1" style={{ color: "#063970" }}>HRmap</Link>
                }
                
                <div>
                    {user?.picture ? 
                    <img className='me-2 rounded-circle ' height='30px' width='30px' src={API_URL_PICTURE + user?.picture} alt="employee"/> :
                    <img className='me-2 rounded-circle ' height='30px' width='30px' src="image/avatar.png" alt="employee" />
                    }
                    
                    { user && <span className="me-2">Hi, {user?.first_name.charAt(0).toUpperCase() + user?.first_name.slice(1)}</span>}
                    <i className="bi bi-bell" style={{ color: "#063970" }}></i>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;