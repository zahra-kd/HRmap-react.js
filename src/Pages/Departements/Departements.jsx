import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import ModalDepartement from "./ModalDepartement";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config/Constants";



const Departements = () =>{
    const [departements, setDepartements] = useState([]);
    const [nbrUser, setNbrUser] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        axios.get(API_URL + 'departements')
        .then(response => {
            setDepartements(response.data.departements);
            setNbrUser(response.data.nbrUser);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const deleteDepartement = (id) => {
        axios.delete(API_URL + 'delete-departement/' + id)
        .then(response => {
            window.location.reload();
        }).catch(error => {
            setErrorMessage(error.response.data.error)
        });
    }
    return(
        <div className="col-9">
            <h3 className="mb-4">Departements</h3>
            <div className=" box">
                <div className="d-flex justify-content-between mb-3">
                    <h5>All Departements</h5>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#ModalDepartement">
                        <i class="bi bi-plus"></i>Add
                    </button>
                    <ModalDepartement/>
                </div>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Title</th>
                            <th scope="col" style={{ color: "#063970" }}>Head of Departement</th>
                            <th scope="col" style={{ color: "#063970" }}>Total Employees</th>
                            <th scope="col" style={{ color: "#063970" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departements.map((row) => (
                            
                            <tr key={row.id}>
                                <th scope="row">{row.name}</th>
                                <td>{row.name}</td>
                                <td>{row.employees?.length}</td>
                                <td>
                                    <Tooltip placement="top" title="delete">
                                        <IconButton sx={{ color: red["A700"]}} onClick={() => deleteDepartement(row.id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Departements;