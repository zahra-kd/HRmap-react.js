import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";

const options = ["single", "married", "divorced" , "widowed"]
const ModalEmployee = () =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [nationality, setNationality] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [picture, setPicture] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [situation, setSituation] = useState('');
    const [spouseName, setSpouseName] = useState('');
    const [children, setChildren] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [departement, setDepartement] = useState('');
    const [departements, setDepartements] = useState([]);
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [ message, setMessage ] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        axios.get(API_URL + 'departements').then(response => {
            setDepartements(response.data.departements)
            setDepartement(response.data.departements[0].id)
        }).catch(error => {
            console.log(error)
        })
    },[]);
    

    const addEmployee =  (event) => {
        event.preventDefault();
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("gender", gender);
            formData.append("birth_date", birthDate);
            formData.append("nationality", nationality);
            formData.append("national_id", idNumber);
            formData.append("picture", picture);
            formData.append("phone", phoneNumber);
            formData.append("email", email);
            formData.append("password", Math.random().toString(36).slice(-8));
            formData.append("situation", situation);
            formData.append("spouse_name", spouseName);
            formData.append("children", children);
            formData.append("job_title", jobTitle);
            formData.append("departement_id", departement);
            formData.append("date_of_joining", dateOfJoining);

            axios.post(API_URL + 'add-user', formData).then(response => {
                setMessage(response.data.success);
                setErrorMessage('');
                setFirstName('');
                setLastName('');
                setGender('');
                setBirthDate('');
                setNationality('');
                setIdNumber('');
                setPicture('');
                setPhoneNumber('');
                setEmail('');
                setSituation('');
                setSpouseName('');
                setChildren('');
                setJobTitle('');
            }).catch(error => {
                setErrorMessage(error.response.data.error);
                console.log(error.response);
            })
    }

    return(
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <form onSubmit={addEmployee}  action="" method="post" encType="multipart/form-data">
                                <div className="row mb-3">
                                    <h5>Civil Status :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setFirstName(e.target.value)} placeholder="First Name"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setLastName(e.target.value)} placeholder="Last Name"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <select className="form-select" onChange={e => setGender(e.target.value)} aria-label="Default select example">
                                            <option disabled selected>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="date" onChange={e => setBirthDate(e.target.value)} className="form-control" title="birth date"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setNationality(e.target.value)} placeholder="Nationality"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setIdNumber(e.target.value)} placeholder="ID Number"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Personnal Information :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="file" className="form-control" onChange={e => setPicture(e.target.files[0])} title="employee's picture"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="tel" className="form-control" onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control"  onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Marital Status :</h5>
                                    <div class="mb-3 col-4">
                                        <select className="form-select" onChange={e => setSituation(e.target.value)} aria-label="Default select situation">
                                            <option disabled selected>Situation</option>
                                            {options.map((elt,index) => (
                                                <option key={index} value={elt}>{elt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setSpouseName(e.target.value)} placeholder="Spouse Name"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="number" min={0} className="form-control" onChange={e => setChildren(e.target.value)} placeholder="children"/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <h5>Job Information :</h5>
                                    <div className="mb-3 col-4">
                                        <input type="text" className="form-control" onChange={e => setJobTitle(e.target.value)} placeholder="Job Title"/>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <select className="form-select" onChange={e => setDepartement(e.target.value)} aria-label="Default select example">
                                            <option disabled selected>Departement</option>
                                            {departements.map(departement => (
                                                <option key={departement.id} value={departement.id}>{departement.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <input type="date" className="form-control" onChange={e => setDateOfJoining(e.target.value)} title="date of joining"/>
                                    </div>
                                    {message && <div className="alert alert-success mb-3">{message}</div>}
                                    {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
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

export default ModalEmployee;