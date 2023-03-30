
const RequestDocument = () => {

    return(
        <div className="col-9">
            <h3 className="mb-4">Documents</h3>
            <div className="box">
                <h5 className="mb-4">Request Document :</h5>
                <form action="" method="post" className="row col-9 mx-auto">
                    <div className="mb-3 col-12">
                        <select className="form-select" aria-label="Default select example">
                            <option disabled selected>Document Type</option>
                            <option value="1">Work certificate</option>
                            <option value="2">Salary Slip</option>
                        </select>
                    </div>
                    <div className="mb-3 col-12">
                        <textarea className="form-control" placeholder="Comment" style={{ height: "100px" }}></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default RequestDocument;