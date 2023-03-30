
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../Config/Constants";


const ModalLeave = ({ request, departements }) =>{
    const [firstName, setFirstName] = useState(request.employee.first_name);
    const [lastName, setLastName] = useState(request.employee.last_name);
    const [departementId, setDepartementId] = useState(request.employee.departement_id);
    const [departement, setDepartement] = useState();
    const [days, setDays] = useState(request.days);
    const [startDate, setStartDate] = useState(request.start_date);
    const [endDate, setEndDate] = useState(request.end_date);
    const [description, setDescription] = useState(request.description);
    const [status, setStatus] = useState('');
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
        if(status != ""){
            axios.post(API_URL + 'validate-leave/' +request.id, {status}).then(response => {
                setMessage(response.data.success)
            }).catch(error => {
                setErrorMessage(error.response.data.error);
            })
        }
    }


    return(
        <div className="modal fade" id={`ModalLeave-${request?.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="mb-4 text-start">Leave Detail :</h5>
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
                                <input type="text" className="form-control" value={days} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={startDate} disabled/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" value={endDate} disabled/>
                            </div>
                            <div className="mb-3 col-12">
                                <textarea className="form-control" value={description} id="floatingTextarea2" style={{ height: "100px" }} disabled></textarea>
                            </div>
                            <div className="mb-3 col-12 text-start ">
                                <Link to={"#"} download className="fs-6 text-decoration-none color_primary">* Download document</Link>
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
export default ModalLeave;