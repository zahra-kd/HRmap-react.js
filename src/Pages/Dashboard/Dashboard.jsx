import React, { useContext, useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import { API_URL } from "../../Config/Constants";

const Dashboard = () => {
    const [totalDepartements, setTotalDepartements] = useState("");
    const [totalEmployees, setTotalEmployees] = useState("");
    const [leaves, setLeaves] = useState([]);
    const [pendingLeaves, setPendingLeaves] = useState("");
    const [documents, setDocuments] = useState([]);
    const [pendingDocuments, setPendingDocuments] = useState("")

    useEffect(() => {
        axios.get(API_URL + 'departements').then(response => {
            setTotalDepartements(response.data.total);
        }).catch(error => {
            console.log(error)
        })}, [])
    
    useEffect(() => {
        axios.get(API_URL + 'users').then(response => {
            setTotalEmployees(response.data.total);
        }).catch(error => {
            console.log(error)
        })}, [])

    useEffect(() => {
        axios.get(API_URL + 'pending-leaves').then(response => {
            setLeaves(response.data.pending);
            console.log(response.data.pending);
            setPendingLeaves(response.data.total);
        }).catch(error => {
            console.log(error)
        })}, [])

        useEffect(() => {
            axios.get(API_URL + 'pending-documents').then(response => {
                setDocuments(response.data.pending);
                console.log(response.data.pending);
                setPendingDocuments(response.data.total);
            }).catch(error => {
                console.log(error)
            })}, [])

    return (
        <div className="col-9">
            <h3 className="mb-4">Dashboard</h3>
            <div className="row">
                <div className="col-3">
                    <div className="box d-flex align-items-center justify-content-between px-4">
                        <div className="">
                            <span className="fw-semibold d-block">{totalEmployees}</span>
                            <span className="fw-semibold d-block">Employees</span>
                        </div>
                        <div className="icons bg-1 d-flex justify-content-center align-items-center">
                            <i class="bi bi-people"></i>
                        </div>
                    </div>
                </div>
                <div className="col-3 ">
                    <div className="box d-flex align-items-center justify-content-between px-4">
                        <div className="">
                            <span className="fw-semibold d-block">{totalDepartements}</span>                     
                            <span className="fw-semibold d-block">Departements</span>                     
                        </div>
                        <div className="icons bg-2 d-flex justify-content-center align-items-center ">
                            <i className="bi bi-grid"></i>
                        </div>
                    </div>
                </div>
                <div className="col-3 ">
                    <div className="box d-flex align-items-center justify-content-between px-4">
                        <div className="">
                            <span className="fw-semibold d-block">{pendingLeaves}</span>
                            <span className="fw-semibold d-block">Pending Leaves</span>
                        </div>
                        <div className="icons bg-3  d-flex justify-content-center align-items-center ">
                            <i className="bi bi-send"></i>
                        </div>
                    </div>
                    
                </div>
                <div className="col-3 ">
                    <div className="box d-flex align-items-center justify-content-between px-4">
                        <div className="">
                            <span className="fw-semibold d-block">0</span>
                            <span className="fw-semibold d-block">Pending Docs</span>
                        </div>
                        <div className="icons bg-4 d-flex justify-content-center align-items-center ">
                            <i className="bi bi-file-earmark-text"></i>
                        </div>
                    </div>
                </div>
            </div>
            <h5 className="mb-3 mt-4">Latest Requests :</h5>
            <div className="row">
                <div className="col-6">
                    <div className="box">
                        <table class="table table-hover table-sm me-5">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "#063970" }}>Name</th>
                                    <th scope="col" style={{ color: "#063970" }}>Leave Type</th>
                                    <th scope="col" style={{ color: "#063970" }}>Days</th>
                                    <th scope="col" style={{ color: "#063970" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.length>0 ? 
                                    leaves.map((leave) => (
                                    <tr key={leave.id}>
                                        <th scope="row">{leave.employee.first_name}</th>
                                        <td>{leave.leave_type}</td>
                                        <td>{leave.days}</td>
                                        <td>{leave.status}</td>
                                    </tr>)) : 
                                    <tr>
                                        <th scope="row"></th>
                                        <td>no record found</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-6">
                    <div className="box mt-1">
                        <table class="table table-hover table-sm">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ color: "#063970" }}>Name</th>
                                    <th scope="col" style={{ color: "#063970" }}>Document Type</th>
                                    <th scope="col" style={{ color: "#063970" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.length>0 ?
                                    documents.map((document) => (
                                    <tr key={document.id}>
                                        <th scope="row">{document.employee.first_name}</th>
                                        <td>{document.document_type}</td>
                                        <td>{document.status}</td>
                                    </tr>)) :
                                    <tr>
                                        <th scope="row"></th>
                                        <td>no record found</td>
                                        <td></td>
                                    </tr>
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
