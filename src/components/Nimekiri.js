import React, { useState, useEffect } from 'react';
import { dob } from '../helpers';

const Nimekiri = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sorting, setSorting] = useState({ key: undefined, order: 0 });
	const [originalData, setOriginalData] = useState(null);
	const [clicked, setClicked] = useState(false);

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
				let valueA = a[keyy].toLowerCase();
				let valueB = b[keyy].toLowerCase();
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

	if (loading) {
		return <div class='lds-dual-ring'></div>;
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
						<th>sünnikuupäev</th>
						<th onClick={() => sortSmth('phone')}>telefon</th>
					</tr>
				</thead>
				<tbody>
					{data?.data.map(rida => {
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
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Nimekiri;
