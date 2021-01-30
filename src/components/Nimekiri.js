import React, { useEffect, useState } from 'react';
import { dob } from '../helpers';

const Nimekiri = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let res = await fetch('http://proovitoo.twn.ee/api/list.json');
			let data = await res.json();
			setData({ data: data.list });
			return data;
		}
		fetchData();
	}, []);

	return (
		<div>
			<h1 className='mainTitle'>nimekiri</h1>
			<table>
				<thead>
					<tr>
						<th>eesnimi</th>
						<th>perekonnanimi</th>
						<th>sugu</th>
						<th>sünnikuupäev</th>
						<th>telefon</th>
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
