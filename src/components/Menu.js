import { NavLink } from 'react-router-dom';

export default function Menu() {
	return (
		<>
			<a href='/'>
				<img id='logo' src='logo.svg' alt='logo' width='230px' />
				<i className='italicText'>proovitöö</i>
			</a>
			<ul className='menuLinks'>
				<li className='menuLink'>
					<NavLink className='navLink' to='/list'>
						Nimekiri
					</NavLink>
				</li>
				<li className='menuLink'>
					<NavLink className='navLink' to='/article'>
						Artikkel
					</NavLink>
				</li>
			</ul>
		</>
	);
}
