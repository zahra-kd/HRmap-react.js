import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../../Config/Constants";
import AuthContext from "../../Context/Context";

const RequestDocument = () => {
    const {user, setUser} = useContext(AuthContext)
    const [description, setDescription] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const request = (event) => {
        event.preventDefault();
        axios.post(API_URL + 'request-document', {document_type:documentType, description:description, user_id:user.id}).then(
            response =>{
                setMessage(response.data.success);
                setErrorMessage("");
            }).catch(error => {
                setErrorMessage(error.response.data.error)
                
            })
    }

    return(
        <div className="col-9">
            <h3 className="mb-4">Documents</h3>
            <div className="box">
                <h5 className="mb-4">Request Document :</h5>
                <form action="" method="post" className="row col-9 mx-auto" onSubmit={request}>
                    <div className="mb-3 col-12">
                        <select className="form-select" onChange={e => setDocumentType(e.target.value)} aria-label="Default select example" >
                            <option disabled selected>Document Type</option>
                            <option value="Work certificate">Work Certificate</option>
                            <option value="Salary Slip">Salary Slip</option>
                        </select>
                    </div>
                    <div className="mb-3 col-12">
                        <textarea className="form-control" onChange={e => setDescription(e.target.value)} placeholder="Comment" style={{ height: "100px" }}></textarea>
                    </div>
                    {message && <div className="alert alert-success mb-3">{message}</div>}
                    {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
                    <div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RequestDocument;