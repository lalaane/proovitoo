import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	const [pageNumberLimit] = useState(5);
	const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const handleClick = (event, number) => {
		event.preventDefault();
		paginate(number);
	};
	const handleNext = (event, number) => {
		event.preventDefault();
		paginate(number);
		if (currentPage + 1 > maxPageNumberLimit) {
			setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};
	const handlePrev = (event, number) => {
		event.preventDefault();
		paginate(number);
		if ((currentPage - 1) % pageNumberLimit === 0) {
			setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	const renderPageNumbers = pageNumbers.map(number => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					onClick={event => handleClick(event, number)}
					className={`pageNumbers ${currentPage === number ? 'activeNum' : null}`}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	return (
		<div className='pagination'>
			<ul className='pageNums'>
				<li onClick={currentPage > 1 ? event => handlePrev(event, currentPage - 1) : null}>
					<i className='fas fa-chevron-left pageBtns'></i>
				</li>
				{renderPageNumbers}
				<li onClick={currentPage < pageNumbers.length ? event => handleNext(event, currentPage + 1) : null}>
					<i className='fas fa-chevron-right pageBtns'></i>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
