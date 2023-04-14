

const Pagination = ({recordsPerPage, totalRecords, currentPage, paginate, prevPage, nextPage}) => {

    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className="pagination justify-content-center">
                {currentPage !== 1 && (
                    <li className="page-item">
                        <button 
                        style={{ cursor: "pointer" }} 
                        className="page-link"
                        onClick={() => prevPage()}>
                            Previous
                        </button>
                    </li>
                )}
                {
                    pageNumbers.map((num) => (
                        <li className="page-item" key={num}>
                            <span 
                            className="page-link" 
                            onClick={() => paginate(num) }
                            style={{ cursor: "pointer", backgroundColor: `${currentPage === num ? "skyBlue" : ""}` }}>
                                {num}
                            </span>
                        </li>
                    ))
                }
                {
                    pageNumbers.length !== currentPage && (
                        <li className="page-item">
                            <button 
                            style={{ cursor: "pointer" }} 
                            className="page-link"
                            onClick={() => nextPage()}>
                                Next
                            </button>
                        </li>
                    )
                }
            </div>
        </nav>
    )
}

export default Pagination;