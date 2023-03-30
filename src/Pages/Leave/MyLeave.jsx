import axios from "axios";
import { useContext, useState } from "react";
import { API_URL } from "../../Config/Constants";
import AuthContext from "../../Context/Context";

const leaves = ['Sick Leave', 'Casual Leave', 'Maternity Leave', 'Unpaid Leave', 'Bereavement Leave']
const MyLeave = () => {
    const { user, setUser } = useContext(AuthContext);
    const [leaveType, setLeaveType] = useState('');
    const [days , setDays] = useState('');
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');
    const [description , setDescription] = useState('');
    const [picture , setPicture] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const requestLeave = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('leave_type', leaveType);
        formData.append('days', days);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('description', description);
        formData.append('file', picture);
        formData.append('user_id', user.id)

        axios.post(API_URL + 'create-leave', formData).then(response =>{
            setLeaveType('');
            setDays('');
            setStartDate('');
            setEndDate('');
            setDescription('');
            setPicture('');
            setMessage(response.data.success);
            setErrorMessage("");
        }).catch(error => {
            setErrorMessage(error.response.data);
            console.log(error.response);
        })

    }

    return(
        <div className="col-9">
            <h3 className="mb-4">Leaves</h3>
            <div className="box">
                <h5 className="mb-4">Create Leave :</h5>
                <form onSubmit={requestLeave} action="" method="post" encType="multipart/form-data" className="row col-9 mx-auto">
                    <div className="mb-3 col-6">
                        <select className="form-select" onChange={e => setLeaveType(e.target.value)} aria-label="Default select example">
                            <option disabled selected>Leave Type</option>
                            {leaves.map((elt, index) => (
                                <option key={index} value={elt}>{elt}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 col-6">
                        <input type="number" className="form-control" onChange={e => setDays(e.target.value)} min={1} placeholder="Days"/>
                    </div>
                    <div className="mb-3 col-6">
                        <input type="date" className="form-control" onChange={e => setStartDate(e.target.value)} title="start date" required/>
                    </div>
                    <div className="mb-3 col-6">
                        <input type="date" className="form-control" onChange={e => setEndDate(e.target.value)}  title="end date"/>
                    </div>
                    <div className="mb-3 col-12">
                        <input type="file" className="form-control" onChange={e => setEndDate(e.target.files[0])} title="file format: .png or .jpeg"/>
                    </div>
                    <div className="mb-3 col-12">
                        <textarea className="form-control" onChange={e => setDescription(e.target.value)} placeholder="Description" style={{ height: "100px" }} required></textarea>
                    </div>
                    {message && <div className="alert alert-success mb-3">{message}</div>}
                    {errorMessage && <div className="alert alert-danger mb-3">{errorMessage}</div>}
                    <div className="">
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}
export default MyLeave;