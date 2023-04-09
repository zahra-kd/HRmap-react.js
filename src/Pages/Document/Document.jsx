import { IconButton, Tooltip } from "@mui/material";
import { indigo } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalDocument from "./ModalDocument";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config/Constants";

const Document = () => {
    const [requests, setRequests] = useState([]);
    const [departements, setDepartements] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'documents').then(response => {
            setRequests(response.data.documents);
            setDepartements(response.data.departements);
        }).catch(error => {
            console.log(error)
        })}, [])

    return(
        <div className="col-9">
            <h3 className="mb-4">Documents</h3>
            <div className="box">
                <h5>All Documents</h5>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Name</th>
                            <th scope="col" style={{ color: "#063970" }}>Doc Type</th>
                            <th scope="col" style={{ color: "#063970" }}>Request Date</th>
                            <th scope="col" style={{ color: "#063970" }}>Description</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                            <th scope="col" style={{ color: "#063970" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <th scope="row">{request.employee?.first_name}</th>
                                <td>{request.document_type}</td>
                                <td>{request.request_date}</td>
                                <td>{request.description}</td>
                                <td>{request.status}</td>
                                <td>
                                    <Tooltip placement="top" title="view detail">
                                        <IconButton sx={{ color: indigo["500"]}} data-bs-toggle="modal" data-bs-target={`#ModalDocument-${request.id}`} >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <ModalDocument request={request} departements={departements}  key={request.id}/>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Document;