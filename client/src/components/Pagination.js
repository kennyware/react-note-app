import React from 'react'

const Pagination = ({notesPerPage, totalNotes, paginate, curPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i)
    }

    const btnStyle = (number) => {
        if(number === curPage){
            return ({color: 'red'})
        } else {
            return ({color: 'black'})
        }
    }
    
    return (
        <nav className="page-nav">
            <ul className="pagination">
                {curPage > 1 && <span className="page-link" onClick={() => paginate(curPage-1)}>&lt;</span>}
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <span className="page-link" style={btnStyle(number)} onClick={() => paginate(number)}>{number}</span>
                    </li>
                ))}
                {curPage < pageNumbers.length && <span className="page-link" onClick={() => paginate(curPage+1)}>&gt;</span>}
            </ul>
        </nav>
    )
}

export default Pagination
