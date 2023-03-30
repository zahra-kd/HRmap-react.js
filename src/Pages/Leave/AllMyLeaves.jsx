import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";
import AuthContext from "../../Context/Context";


const AllMyLeaves = () =>{
    const { user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);

        axios.get(API_URL + 'get-leaves-by-user/' + user?.id ).then(response => {
            setLeaves(response.data.leaves);
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    return(
        <div className="col-9">
            <h3 className="mb-4">Leaves</h3>
            <div className="box">
                <h5>All Leaves :</h5>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Leave Type</th>
                            <th scope="col" style={{ color: "#063970" }}>Start date</th>
                            <th scope="col" style={{ color: "#063970" }}>End date</th>
                            <th scope="col" style={{ color: "#063970" }}>Days</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave?.id}>
                                <td>{leave?.leave_type}</td>
                                <td>{leave?.start_date}</td>
                                <td>{leave?.end_date}</td>
                                <td>{leave?.days}</td>
                                <td>{leave?.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default AllMyLeaves;