import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Context";
import axios from "axios";
import { API_URL } from "../../Config/Constants";


const MyDocRequestHistory = () =>{
    const { user } = useContext(AuthContext);
    const [documents, setDocuments] = useState([]);

    axios.get(API_URL + 'get-documents-by-user/' + user?.id).then(response => {
        setDocuments(response.data.documents);
    }).catch(error => {
        console.log(error);
    })


    return(
        <div className="col-9">
            <h3 className="mb-4">Documents</h3>
            <div className="box">
                <h5>All My Documents :</h5>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Doc Type</th>
                            <th scope="col" style={{ color: "#063970" }}>Request date</th>
                            <th scope="col" style={{ color: "#063970" }}>description</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((document) => (
                            <tr key={document?.id}>
                                <td>{document?.document_type}</td>
                                <td>{document?.request_date}</td>
                                <td>{document?.description}</td>
                                <td>{document?.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyDocRequestHistory;