import { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Context";
import axios from "axios";
import { API_URL } from "../../Config/Constants";

const situations =['single', 'married', 'divorced', 'widowed']
const Profile = () => {
    const { user, setUser } = useContext(AuthContext);
    console.log(user)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [situation, setSituation] = useState("");
    const [spouseName, setSpouseName] = useState("");
    const [children, setChildren] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [departementId, setDepartementId] = useState("");
    const [departements, setDepartements] = useState([]);
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [ message, setMessage ] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');  
    useEffect(() => {
        if(user){
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setGender(user.gender);
            setBirthDate(user.birth_date);
            setNationality(user.nationality);
            setIdNumber(user.national_id);
            setPhoneNumber(user.phone);
            setEmail(user.email);
            setPassword(user.password)
            setSituation(user.situation);
            setSpouseName(user.spouse_name);
            setChildren(user.children);
            setJobTitle(user.job_title);
            setDepartementId(user.departement_id);
            setDateOfJoining(user.date_of_joining);
        }
    }, [user])

    useEffect(()=>{
        axios.get(API_URL + 'departements').then(response => {
            setDepartements(response.data.departements)
        }).catch(error => {
            console.log(error)
        })
    },[]);
    const updateData = (event) => {
        event.preventDefault();
        const formData = new FormData();
            formData.append("phone", phoneNumber);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("picture", picture);
            formData.append("situation", situation);
            formData.append("spouse_name", spouseName);
            formData.append("children", children);
            axios.post(API_URL + 'update-profile/' + user.id, formData)
            .then(response => {
                setMessage(response.data.success);
                setUser(response.data.user)
                setErrorMessage("")
            }).catch(error => {
                setErrorMessage(error.response.data.error);
            })
    }

    return(
        <div className="col-9">
            <h3 className="mb-4">Profile</h3>
            <div className="box profile">
                <form action="" method="post" onSubmit={updateData}>
                    <div className="row mb-2">
                        <h6>Civil Status :</h6>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={firstName} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={lastName} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={gender} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={birthDate} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={nationality} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={idNumber} disabled/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <h6>Personnal Information :</h6>
                        <div className="mb-3 col-4">
                            <input type="tel" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="password"/>
                        </div>
                        <div className="mb-3 col-8">
                            <input type="file" className="form-control" onChange={e => setPicture(e.target.files[0])} title="picture"/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <h6>Marital Status :</h6>
                        <div class="mb-3 col-4">
                            <select className="form-select"  onChange={e => setSituation(e.target.value)} aria-label="Default select example" required>
                                <option value={situation} selected>{situation}</option>
                                {situations.map(elt =>elt !== situation &&
                                <option value={elt}>{elt}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={spouseName} onChange={e => setSpouseName(e.target.value)} title="spouse name"/>
                        </div>
                        <div className="mb-3 col-4">
                            <input type="number" min={0} className="form-control" value={children} onChange={e => setChildren(e.target.value)} title="children"/>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <h6>Job Information :</h6>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={jobTitle} disabled/>
                        </div>
                        <div className="mb-3 col-4">
                                { departements.map(elt => elt.id == departementId &&
                                    <input type="text" className="form-control" key={elt.id} value={elt.name} disabled />
                                )}
                        </div>
                        <div className="mb-3 col-4">
                            <input type="text" className="form-control" value={dateOfJoining} disabled/>
                        </div>
                    </div>
                    {message && <div className="alert alert-success mb-3">{message}</div>}
                    {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
                    <div className="text-end">
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Profile;