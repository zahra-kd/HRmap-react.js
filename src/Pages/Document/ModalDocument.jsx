import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";


const ModalDocument = ({request, departements}) => {
    const [employeeId, setEmployeeId] = useState(request.employee.id);
    const [firstName, setFirstName] = useState(request.employee.first_name);
    const [lastName, setLastName] = useState(request.employee.last_name);
    const [departementId, setDepartementId] = useState(request.employee.departement_id);
    const [departement, setDepartement] = useState();
    const [documentType, setDocumentType] = useState(request.document_type);
    const [requestDate, setRequestDate] = useState(request.request_date);
    const [description, setDescription] = useState(request.description);
    const [status, setStatus] = useState(request.status);
    const [ message, setMessage ] = useState('');
    const [ errormessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        let name = '';
        departements.forEach(departement => {
            if (departement.id === departementId) {
                name = departement.name;
            }
        });
        setDepartement(name);
    }, [])

    const requestValidation = (event) => {
        event.preventDefault();
        axios.post(API_URL + 'validate-document/' + request.id, {status}).then(response => {
            setMessage(response.data.success);
        }).catch(error => {
            setErrorMessage(error.response.data.error)
        })
    }

    return(
        <div className="modal fade" id={`ModalDocument-${request?.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="mb-4 text-start">Details :</h5>
                        <form action="" method="post" onSubmit={requestValidation} className="row">
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={firstName} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={lastName} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={departement} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={documentType} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={requestDate} disabled/>
                            </div>
                            <div className="mb-3 col-12">
                                <textarea className="form-control" value={description} id="floatingTextarea2" style={{ height: "100px" }} disabled></textarea>
                            </div>
                            <div class="mb-3 col-4">
                                <div class="mb-2 form-check">
                                    <input type="radio" class="form-check-input" id="approve" onChange={e => setStatus("approved")}/>
                                    <label class="form-check-label" for="approve">Approve</label>
                                </div>
                                <div class="mb-2 form-check">
                                    <input type="radio" class="form-check-input" id="reject" onChange={e => setStatus("rejected")}/>
                                    <label class="form-check-label" for="reject">reject</label>
                                </div>
                            </div>
                            <div className="mb-3 col-12 text-start ">
                                <PDFDownloadLink document={<PDFFile employeeId={employeeId} />} fileName="employement certificate.pdf">
                                    {({ loading }) => (loading ? 'Loading document...' : '*Download certificate ')}
                                </PDFDownloadLink>
                            </div>
                            {message && <div className="alert alert-success mb-3">{message}</div>}
                            {errormessage && <div className="alert alert-danger mb-3">{errormessage}</div>}
                            <div className="text-end">
                                <button type="button" className="btn modalClose me-2" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDocument;