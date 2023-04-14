import { Avatar, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModalEmployee from "./ModalEmployee";
import EditEmployee from "./EditEmployee";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_URL_PICTURE } from "../../Config/Constants";
import Pagination from "../../Components/Pagination/Pagination";



const Employees = () =>{
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        setLoading(true)
        axios.get(API_URL + 'users').then(response => {
            setEmployees(response.data.users);
            setTotalRecords(response.data.users.length);
            setLoading(false);
        }).catch(error => {
            console.log(error)
        })
    }, []);
    
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = employees.slice(firstIndex, lastIndex);

    const paginate = (currentPage) => setCurrentPage(currentPage);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);

    return(
        <div className="col-9">
            <h3 className="mb-4">Employees</h3>
            <div className="box">
                <div className="d-flex justify-content-between mb-3">
                    <h5>All Employees</h5>
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="bi bi-plus"></i>Add
                    </button>
                    <ModalEmployee/>
                </div>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Picture</th>
                            <th scope="col" style={{ color: "#063970" }}>Fisrt Name</th>
                            <th scope="col" style={{ color: "#063970" }}>Last Name</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                            <th scope="col" style={{ color: "#063970" }}>Designation</th>
                            <th scope="col" style={{ color: "#063970" }}>Department</th>
                            <th scope="col" style={{ color: "#063970" }}>Joined on</th>
                            <th scope="col" style={{ color: "#063970" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? currentRecords.map((employee) => (
                            <tr key={employee.id}>
                                <td scope="row"><Avatar alt="employee's picture" src={API_URL_PICTURE + employee.picture} /></td>
                                <td className="align-middle">{employee.first_name}</td>
                                <td className="align-middle">{employee.last_name}</td>
                                <td className="align-middle">{employee.status}</td>
                                <td className="align-middle">{employee.job_title}</td>
                                <td className="align-middle">{employee.departement.name}</td>
                                <td className="align-middle">{employee.date_of_joining}</td>
                                <td>
                                    <Tooltip placement="top" title="edit">
                                        <IconButton color="success"  data-bs-toggle="modal" data-bs-target={`#editModal-${employee.id}`}>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <EditEmployee employee={employee} key={employee.id}/>
                            </tr>
                        )) : "Loadind..."}
                    </tbody>
                </table>
                <Pagination 
                    recordsPerPage={recordsPerPage}
                    totalRecords={totalRecords}
                    currentPage={currentPage}
                    paginate={paginate}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </div>
        </div>
    )
}
export default Employees;