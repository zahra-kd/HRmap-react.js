import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { red } from '@mui/material/colors';
import { indigo } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalDocument from "./ModalDocument";

const Document = () => {
    const documentData =  [{
        "id": 1,
        "first_name": "Colline",
        "last_name": "Hebborn",
    }, {
        "id": 2,
        "first_name": "Kendre",
        "last_name": "Largen",
    }, {
        "id": 3,
        "first_name": "Janella",
        "last_name": "Cunah",
    }]
    return(
        <div className="col-9">
            <h3 className="mb-4">Documents</h3>
            <div className="box">
                <h5>All Documents</h5>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>#User ID</th>
                            <th scope="col" style={{ color: "#063970" }}>Title</th>
                            <th scope="col" style={{ color: "#063970" }}>Request Date</th>
                            <th scope="col" style={{ color: "#063970" }}>Description</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                            <th scope="col" style={{ color: "#063970" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentData.map((row) => (
                            <tr key={row.id}>
                                <th scope="row">{row.id}</th>
                                <td>{row.first_name}</td>
                                <td>{row.first_name}</td>
                                <td>{row.first_name}</td>
                                <td>{row.first_name}</td>
                                <td>
                                    <Tooltip placement="top" title="approve">
                                        <IconButton color="success">
                                            <CheckIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip placement="top" title="reject">
                                        <IconButton sx={{ color: red["A700"]}} >
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip placement="top" title="view detail">
                                        <IconButton sx={{ color: indigo["500"]}} data-bs-toggle="modal" data-bs-target="#ModalDocument" >
                                            <VisibilityIcon />
                                            <ModalDocument/>
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
export default Document;