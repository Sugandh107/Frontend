const url = 'https://burgers-hub.p.rapidapi.com/burgers';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1aa73ba331msh30c34d9dfec5e84p138967jsn5a87d91e22c3',
		'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}