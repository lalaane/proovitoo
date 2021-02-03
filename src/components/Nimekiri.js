import React, { useState, useEffect } from 'react';
import { dob } from '../helpers';
import Pagination from './Pagination';

const Nimekiri = () => {
	const [data, setData] = useState(null);
	const [originalData, setOriginalData] = useState(null);
	const [loading, setLoading] = useState(false);

	const [sorting, setSorting] = useState({ key: undefined, order: 0 });

	const [clicked, setClicked] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let res = await fetch('http://proovitoo.twn.ee/api/list.json');
			let dataa = await res.json();
			let data = dataa.list;
			setData({ data });
			setOriginalData({ data });
			setLoading(false);
		};
		fetchData();
	}, []);

	const toggle = index => {
		if (clicked === index) {
			return setClicked(null);
		}
		setClicked(index);
	};

	const sortStrings = keyy => {
		const ascSort = () => {
			sorted.sort((a, b) => {
				let valueA = a[keyy].toString().toLowerCase();
				let valueB = b[keyy].toString().toLowerCase();
				if (valueA < valueB) {
					return -1;
				}
				if (valueA > valueB) {
					return 1;
				}
				// if values are equal
				return 0;
			});
			setSorting({ key: keyy, order: 1 });
			return sorted;
		};
		const { key, order } = sorting;
		let sorted = [...data.data];
		//checkin key jargi mis jarjekorras sortida
		if (key === keyy) {
			if (order === 0) {
				sorted = ascSort();
				return sorted;
			}
			if (order === 1) {
				sorted.sort((a, b) => {
					let valueA = a[keyy].toString().toLowerCase();
					let valueB = b[keyy].toString().toLowerCase();
					if (valueA > valueB) {
						return -1;
					}
					if (valueA < valueB) {
						return 1;
					}
					return 0;
				});
				setSorting({ key: keyy, order: 2 });
				return sorted;
			}
			if (order === 2) {
				const { data } = originalData;
				setSorting({ key: keyy, order: 0 });
				return data;
			}
		} else {
			sorted = ascSort();
			return sorted;
		}
	};

	const sortSmth = keyy => {
		const data = sortStrings(keyy);
		setData({ data });
	};
	// const sortDob = keyy => {
	// 	const { key, order } = sorting;
	// 	let sorted = [...data.data];
	// 	let vanemad = [];
	// 	let nooremad = [];
	// 	for (let i = 0; i < sorted.length; i++) {
	// 		if (sorted[i].personal_code.toString()[0] === '5' || sorted[i].personal_code.toString()[0] === '6') {
	// 			nooremad.push(parseInt(sorted[i].personal_code.toString().slice(1)));
	// 		}
	// 		if (sorted[i].personal_code.toString()[0] === '3' || sorted[i].personal_code.toString()[0] === '4') {
	// 			vanemad.push(parseInt(sorted[i].personal_code.toString().slice(1)));
	// 		}
	// 	}

	// 	if (key === keyy) {
	// 		console.log('aga siia');
	// 		if (order === 0) {
	// 			vanemad.sort((a, b) => a - b);
	// 			nooremad.sort((a, b) => a - b);
	// 			sorted = vanemad.concat(nooremad);
	// 			console.log('joudis siia');
	// 			return sorted;
	// 		}
	// 	} else {
	// 		vanemad.sort((a, b) => a - b);
	// 		nooremad.sort((a, b) => a - b);
	// 		sorted = vanemad.concat(nooremad);
	// 		console.log('joudis siia else');
	// 		return sorted;
	// 	}
	// };

	const renderData = data => {
		return data?.map(rida => {
			let isikukood = rida.personal_code.toString();
			let synniaeg = dob(isikukood);
			let inff = rida.intro
				.replace(/<\/?[^>]+(>|$)/g, '')
				.split(' ')
				.slice(0, 38)
				.join(' ');
			return (
				<>
					<tr
						className={`info ${clicked === rida.id ? 'activeRow' : ''}`}
						key={rida.id}
						onClick={() => toggle(`${rida.id}`)}
					>
						<td>{rida.firstname}</td>
						<td>{rida.surname}</td>
						<td>{rida.sex === 'm' ? 'Mees' : rida.sex === 'f' ? 'Naine' : ''}</td>
						<td>{synniaeg}</td>
						<td>{rida.phone}</td>
					</tr>

					{clicked === `${rida.id}` ? (
						<tr>
							<td colSpan={5}>
								<div className='additionalInfoRow'>
									<div className='additionalPic'>
										<img src={rida.images[0].small} alt='rida.images[0].alt' />
									</div>
									<div className='additionalInfo'>
										<p>{inff}...</p>
									</div>
								</div>
							</td>
						</tr>
					) : null}
				</>
			);
		});
	};

	//for pagination
	//get current rows
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = data?.data.slice(indexOfFirstItem, indexOfLastItem);
	//change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	if (loading) {
		return <div className='lds-dual-ring'></div>;
	}
	return (
		<div>
			<h1 className='mainTitle'>nimekiri</h1>
			<table>
				<thead>
					<tr>
						<th
							onClick={() => {
								sortSmth('firstname');
							}}
						>
							eesnimi
						</th>
						<th onClick={() => sortSmth('surname')}>perekonnanimi</th>
						<th onClick={() => sortSmth('sex')}>sugu</th>
						<th onClick={() => sortSmth('personal_code')}>sünnikuupäev</th>
						<th onClick={() => sortSmth('phone')}>telefon</th>
					</tr>
				</thead>
				<tbody>{renderData(currentItems)}</tbody>
			</table>
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={data?.data.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default Nimekiri;
