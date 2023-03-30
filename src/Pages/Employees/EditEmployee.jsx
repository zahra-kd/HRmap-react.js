import { useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";
import axios from "axios";
const situations =['single', 'married', 'divorced', 'widowed']
const allStatus = ['active', 'inactive']
const EditEmployee = ({employee}) =>{
    console.log(employee)
    const [firstName, setFirstName] = useState(employee.first_name);
    const [lastName, setLastName] = useState(employee.last_name);
    const [gender, setGender] = useState(employee.gender);
    const [birthDate, setBirthDate] = useState(employee.birth_date);
    const [nationality, setNationality] = useState(employee.nationality);
    const [idNumber, setIdNumber] = useState(employee.national_id);
    const [picture, setPicture] = useState(employee.picture);
    const [phoneNumber, setPhoneNumber] = useState(employee.phone);
    const [email, setEmail] = useState(employee.email);
    const [situation, setSituation] = useState(employee.situation);
    const [spouseName, setSpouseName] = useState(employee.spouse_name);
    const [children, setChildren] = useState(employee.children);
    const [jobTitle, setJobTitle] = useState(employee.job_title);
    const [departement, setDepartement] = useState(employee.departement.name);
    const [departementId, setDepartementId] = useState(employee.departement.id);
    const [departements, setDepartements] = useState([]);
    const [dateOfJoining, setDateOfJoining] = useState(employee.date_of_joining);
    const [dateOfLeaving, setDateOfLeaving] = useState(employee.date_of_leaving);
    const [status, setStatus] = useState(employee.status)
    const [ message, setMessage ] = useState('');
    const [ errormessage, setErrorMessage] = useState('');  
    
    useEffect(()=>{
        axios.get(API_URL + 'departements').then(response => {
            setDepartements(response.data.departements)
        }).catch(error => {
            console.log(error)
        })
    },[]);

    const editingEmployee = (event) => {
        event.preventDefault();
        const formData = new FormData();
            formData.append("job_title", jobTitle);
            formData.append("departement_id", departementId);
            formData.append("date_of_joining", dateOfJoining);
            formData.append("date_of_leaving", dateOfLeaving);
            formData.append("status", status);

            axios.post(API_URL + 'update-user/' + employee.id, formData)
            .then(response => {
                setMessage(response.data.success);
                setErrorMessage('')
            }).catch(error => {
                setErrorMessage(error.response.data.error);
            })
    }

    return(
        <>
            <div className="modal fade" id={`editModal-${employee?.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form onSubmit={editingEmployee} action="" method="post" encType="multipart/form-data">
                                <div className="row mb-3">
                                    <h5>Civil Status :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="text" disabled value={firstName}  className="form-control"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" disabled value={lastName}  className="form-control"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" disabled value={gender}  className="form-control" />
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="date" disabled value={birthDate} className="form-control"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" disabled className="form-control" value={nationality}/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" disabled className="form-control" value={idNumber}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Personnal Information :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="tel" className="form-control" disabled value={phoneNumber}/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" disabled value={email}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Marital Status :</h5>
                                    <div class="mb-3 col-4"> 
                                        <input type="text" className="form-control" disabled value={situation}/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" disabled value={spouseName}/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="number" className="form-control" disabled value={children}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Job Information :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Job Title" required/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <select className="form-select"  onChange={e => setDepartement(e.target.value)} aria-label="Default select example" required>
                                            <option value={employee.departement?.id} selected>{employee.departement?.name}</option>
                                            { departements.map(elt => elt.id !== employee.departement.id &&
                                                <option key={elt.id} value={elt.id}>{elt.name}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="date" className="form-control" value={dateOfJoining} onChange={e => setDateOfJoining(e.target.value)} title="date of joining" required/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="date" className="form-control" value={dateOfLeaving} onChange={e => setDateOfLeaving(e.target.value)}  title="date of leaving"/>
                                    </div>
                                    <div class="mb-3 col-4">
                                        <select className="form-select"  onChange={e => setStatus(e.target.value)} aria-label="Default select example" required>
                                            <option value={status}>{status}</option>
                                            {allStatus.map(elt =>elt !== status &&
                                            <option value={elt}>{elt}</option>
                                            )}
                                        </select>
                                    </div>

                                    {message && <div className="alert alert-success mb-3">{message}</div>}
                                    {errormessage && <div className="alert alert-danger mb-3">{errormessage}</div>}
                                </div>
                                <div className="float-end">
                                    <button type="button" className="btn modalClose me-2" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditEmployee;