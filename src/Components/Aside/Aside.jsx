import { Link, useNavigate } from 'react-router-dom';
import './Aside.css'
import { useContext } from 'react';
import AuthContext from '../../Context/Context';
import {  API_URL_PICTURE } from '../../Config/Constants';

const Aside = () =>{
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    return(
        <nav className="navbar box bg-white flex-column col-2 py-3 h-100">
            <div className='text-center mb-3'>
                {user?.picture ? 
                <img className='ProfilePicture shadow-sm'  src={API_URL_PICTURE + user?.picture}  alt="employee"/> :
                <img className='ProfilePicture shadow-sm'  src="image/avatar.png"  alt="employee"/>}
                { user && <div>
                    <h6 className='fs-5 mt-2'>Hi, {user?.first_name.charAt(0).toUpperCase() + user?.first_name.slice(1)}</h6>
                    <div className='border-top border-bottom mt-2 p-1'>
                        <span className='fs-5 fw-bold'>{user?.job_title}</span>
                    </div>
                </div>}
            </div>
            <div className="container-fluid ">
                <div className="" id="navbarNavDropdown">
                    <ul className="navbar-nav fw-semibold">
                        {
                            user?.role === 'admin' ? <>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/menu"}><i class="asideIcone bi bi-house-door-fill me-3"></i>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"profile"}><i class="asideIcone bi bi-person-fill me-3"></i>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"departements"}><i class="asideIcone bi bi-grid-fill me-3"></i>Departements</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"employees"}><i class="asideIcone bi bi-people-fill me-3"></i>Employees</Link>
                                </li>
                                <li className="nav-item">
                                    <div class="accordion" id="accordionLeave">
                                        <div class="accordion-item border-0"> 
                                            <Link className="nav-link" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="asideIcone bi bi-send-fill me-3"></i>Leave
                                            </Link>
                                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionLeave">
                                                <div class="accordion-body p-1">
                                                    <Link className="accordionLink ms-3" to={"all-leaves"}><i class="asideIcone bi bi-chevron-double-right me-1"></i>All Leaves</Link>
                                                    <Link className="accordionLink ms-3" to={"request-leave"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> Request Leave</Link>
                                                    <Link className="accordionLink ms-3" to={"all-my-leaves"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> My Leaves</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </li>
                                <li className="nav-item">
                                    <div class="accordion" id="accordionDoc">
                                        <div class="accordion-item border-0"> 
                                            <Link className="nav-link" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="asideIcone bi bi-file-earmark-text-fill me-3"></i>Document
                                            </Link>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionDoc">
                                                <div class="accordion-body p-1">
                                                    <Link className="accordionLink ms-3" to={"all-documents"}><i class="asideIcone bi bi-chevron-double-right me-1"></i>All Documents</Link>
                                                    <Link className="accordionLink ms-3" to={"request-document"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> Request Doc</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </li>
                            </> : <>

                        
                        
                        <li className="nav-item">
                            <Link className="nav-link" to={"profile"}><i class="asideIcone bi bi-person-fill me-3"></i>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <div class="accordion" id="accordionLeave">
                                <div class="accordion-item border-0"> 
                                    <Link className="nav-link" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <i class="asideIcone bi bi-send-fill me-3"></i>Leave
                                    </Link>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionLeave">
                                        <div class="accordion-body p-1">
                                            <Link className="accordionLink ms-3" to={"request-leave"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> Request Leave</Link>
                                            <Link className="accordionLink ms-3" to={"all-my-leaves"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> My Leaves</Link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </li>
                        <li className="nav-item">
                            <div class="accordion" id="accordionDoc">
                                <div class="accordion-item border-0"> 
                                    <Link className="nav-link" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                        <i class="asideIcone bi bi-file-earmark-text-fill me-3"></i>Document
                                    </Link>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionDoc">
                                        <div class="accordion-body p-1">
                                            <Link className="accordionLink ms-3" to={"all-documents"}><i class="asideIcone bi bi-chevron-double-right me-1"></i>All Documents</Link>
                                            <Link className="accordionLink ms-3" to={"request-document"}><i class="asideIcone bi bi-chevron-double-right me-1"></i> Request Doc</Link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </li>
                        </>}
                        <li className="nav-item">
                            <button onClick={logout} className="nav-link logoutBtn"><i class="asideIcone bi bi-door-open-fill me-3"></i>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Aside;