export function dob(isikukood) {
	let synniaasta = '';
	if (isikukood.charAt(0) === '5' || isikukood.charAt(0) === '6') {
		synniaasta = '20';
	} else {
		synniaasta = '19';
	}
	synniaasta += isikukood.substr(1, 2);
	parseInt(synniaasta);
	let synnikuu = isikukood.substr(3, 2);
	let synnipaev = isikukood.substr(5, 2);
	return `${synniaasta}.${synnikuu}.${synnipaev}`;
}
