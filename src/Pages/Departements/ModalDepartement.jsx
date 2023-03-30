import axios from "axios";
import {  useState } from "react";
import { API_URL } from "../../Config/Constants";

const ModalDepartement = () => {
    const [name, setName] = useState("");
    const [ message, setMessage ] = useState('');
    const [ errormessage, setErrorMessage] = useState('');
    const addDepartement = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL +'departements', {name});
            setMessage(response.data.success);
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.response.data.error)
        }
    }
    
    return(
        <div className="modal fade" id="ModalDepartement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="mb-4">Departement :</h5>
                        <form onSubmit={addDepartement} >
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            {message && <div className="alert alert-success">{message}</div>}
                            {errormessage && <div className="alert alert-danger">{errormessage}</div>}
                            <div className="float-end">
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

export default ModalDepartement;