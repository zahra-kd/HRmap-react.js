import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../Config/Constants";

const styles = StyleSheet.create({
    body:{
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title:{
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        
    },
    text:{
        margin: 5,
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Times-Roman",
    },
});

const PDFFile = ({employeeId}) => {
    const [employee, setEmployee] = useState([]);
    console.log('the id is : ', employeeId)

    useEffect(() => {
        axios.get(API_URL + 'user-details/' + employeeId).then(response => {
            setEmployee(response.data.user);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <Document>
            <Page style={styles.body}> 
                <Text style={styles.title}>EMPLOYEMENT CERTIFICATE</Text>
                <Text style={styles.text}>
                    this is to certify that {employee.first_name} {employee.last_name} is presently employed in the following position
                    {employee.job_title}. The contract started on {employee.date_of_joining} up to the present.
                </Text>
                <Text style={styles.text}>
                    This certificate is issued upon the request of {employee.first_name} {employee.last_name} for whatever legal purpose it may serve.
                </Text>
            </Page>
        </Document>
    )
}

export default PDFFile;