

const ModalDocument = () => {
    return(
        <div className="modal fade" id="ModalDocument" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="mb-4 text-start">View Detail :</h5>
                        <form action="" className="row">
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" placeholder="first name"/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" placeholder="last name"/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" placeholder="departement"/>
                            </div>
                            <div className="mb-3 col-6">
                                <input type="text" className="form-control" placeholder="document title"/>
                            </div>
                            <div className="mb-3 col-12">
                                <textarea className="form-control" placeholder="Description" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                            </div>
                            <div>
                                <button type="button" className="btn modalClose float-end me-2" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalDocument;