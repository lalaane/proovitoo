import React, { useEffect, useState } from 'react';
import { dob } from '../helpers';

const Nimekiri = () => {
	const [data, setData] = useState(null);
	const apiUrl = 'http://proovitoo.twn.ee/api/list.json';
	const getData = () => fetch(`${apiUrl}`).then(res => res.json());

	useEffect(() => {
		getData().then(data => setData({ data: data.list }));
	}, []);

	if (data === null) {
		return <p>No data</p>;
	} else {
		let tableData = data.data;
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
						{tableData.map(rida => {
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
	}
};

export default Nimekiri;
