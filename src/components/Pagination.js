import React, { useState } from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
	const [pageNumberLimit, setPageNumberLimit] = useState(5);
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

	const renderPageNumbers = pageNumbers.map(number => {
		if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
			return (
				<li
					key={number}
					onClick={event => handleClick(event, number)}
					className={currentPage === number ? 'activeNum' : null}
				>
					{number}
				</li>
			);
		} else {
			return null;
		}
	});

	const handleNext = () => {
		console.log('handling next');
	};

	return (
		<div>
			<ul className='pageNums'>
				<li onClick={handleNext}>
					<i class='fas fa-chevron-left pageBtns'></i>
				</li>
				{renderPageNumbers}
				<li>
					<i class='fas fa-chevron-right pageBtns'></i>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
