import React from 'react'
import './Pagination.css'
import {
  LeftArrow,
  RightArrow,
  DoubleLeftArrow,
  DoubleRightArrow,
} from '../SvgIcons/SvgIcons'

const Pagination = ({ handleChange, totalItems, currentPage, countPerPage }) => {

  const pagesCount = Math.ceil(totalItems / countPerPage)

  if (pagesCount === 1) return null
  
  //range of numbers
  let firstNumber = 1
  let lastNumber = 1
  //aditional numbers at the left and the right of currentPage
  const aditionalNumbers = 2
  //total of numbers in the pagination bar
  let countOfNumbers = aditionalNumbers * 2 + 1

  if (countOfNumbers >= pagesCount) {
    countOfNumbers = pagesCount
  } else {
    firstNumber = Math.max(currentPage - aditionalNumbers, 1)
    lastNumber = Math.min(currentPage + aditionalNumbers, pagesCount)
    //complete the pagination bar at the end
    if (lastNumber === pagesCount) {
      firstNumber += lastNumber - firstNumber - aditionalNumbers * 2
    }
  }

  //make the page numbers with the range
  const pageNumbers = new Array(countOfNumbers)
    .fill()
  .map((d, i) => i + firstNumber)
  return (
    <div className="container">
      <li
        onClick={() => handleChange(1)}
        className={currentPage === 1 ? "disabled" : ""}
        title='First Page'
      >
        <DoubleLeftArrow/>
      </li>
      <li
        onClick={() => handleChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
        title='Previous'
      >
        <LeftArrow/>
      </li>

      {pageNumbers.map((number) => {
        return (
          <li
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => handleChange(number)}
          >
            {number}
          </li>
        )
      })}

      <li
        onClick={() => handleChange(currentPage + 1)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title='Next'
      >
        <RightArrow/>
      </li>
      <li
        onClick={() => handleChange(pagesCount)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title='Last Page'
      >
        <DoubleRightArrow/>
      </li>
    </div>
  );
}

export default Pagination
