import React, { useState, useEffect } from 'react';
import { dob } from '../helpers';

const Nimekiri = () => {
	const [data, setData] = useState(null);
	const [sorting, setSorting] = useState({ key: undefined, order: 0 });
	const [originalData, setOriginalData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let res = await fetch('http://proovitoo.twn.ee/api/list.json');
			let dataa = await res.json();
			let data = dataa.list;
			setData({ data });
			setOriginalData({ data });
		}
		fetchData();
	}, []);

	const sortStrings = keyy => {
		const ascSort = () => {
			sorted.sort((a, b) => {
				let valueA = a[keyy].toLowerCase();
				let valueB = b[keyy].toLowerCase();
				if (valueA < valueB) {
					return -1;
				}
				if (valueA > valueB) {
					return 1;
				}
				// values are equal
				return 0;
			});
			setSorting({ key: keyy, order: 1 });
			return sorted;
		};
		const { key, order } = sorting;
		let sorted = [...data.data];
		if (key === keyy) {
			if (order === 0) {
				sorted = ascSort();
				return sorted;
			}
			if (order === 1) {
				console.log('key', key);
				sorted.sort((a, b) => {
					let valueA = a[keyy].toLowerCase();
					let valueB = b[keyy].toLowerCase();
					if (valueA > valueB) {
						return -1;
					}
					if (valueA < valueB) {
						return 1;
					}
					// values are equal
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
						<th>sünnikuupäev</th>
						<th onClick={() => sortSmth('phone')}>telefon</th>
					</tr>
				</thead>
				<tbody>
					{data?.data.map(rida => {
						let isikukood = rida.personal_code.toString();
						let synniaeg = dob(isikukood);
						return (
							<>
								<tr className='info' key={rida.id}>
									<td>{rida.firstname}</td>
									<td>{rida.surname}</td>
									<td>{rida.sex === 'm' ? 'Mees' : rida.sex === 'f' ? 'Naine' : ''}</td>
									<td>{synniaeg}</td>
									<td>{rida.phone}</td>
								</tr>
							</>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Nimekiri;
