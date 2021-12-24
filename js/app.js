const clock = document.getElementById('clock');
const date = document.getElementById('date');
// const btn24hr = document.getElementById('24hr');
// const btn12hr = document.getElementById('12hr');
const colorpicker = document.getElementById('colorpicker');

// btn12hr.addEventListener('click', () => {
// 	// TODO: Implement 12hr mode
// });
// btn24hr.addEventListener('click', () => {
// 	// TODO: Implement 24hr mode
// });
colorpicker.addEventListener('change', e => {
	const color = e.target.value;
	document.body.style.backgroundColor = color;
});

// Get the current time in the client's timezone, will return an array of [hours, hours, minutes, minutes, seconds, seconds].
const getTime = () => {
	const dt = new Date();
	const hours = dt.getHours();
	const minutes = dt.getMinutes();
	const seconds = dt.getSeconds();

	const time = [];

	if (hours < 10) {
		time.push('0');
		time.push(hours.toString());
	} else {
		const [hour, ...rest] = hours.toString().split('');
		time.push(hour);
		time.push(...rest);
	}

	if (minutes < 10) {
		time.push('0');
		time.push(minutes.toString());
	} else {
		const [minute, ...rest] = minutes.toString().split('');
		time.push(minute);
		time.push(...rest);
	}

	if (seconds < 10) {
		time.push('0');
		time.push(seconds.toString());
	} else {
		const [second, ...rest] = seconds.toString().split('');
		time.push(second);
		time.push(...rest);
	}

	return time;
};

// Update the HTML with the current time.
const printTime = () => {
	const time = getTime();

	time.forEach((element, index) => {
		if (index === 2 || index === 4) {
			const colon = document.createElement('span');
			colon.innerHTML = ':';
			clock.appendChild(colon);
		}
		const div = document.createElement('div');
		div.classList.add('clock__time-digit');
		div.innerText = element;
		clock.appendChild(div);
	});
};

// Get the current date in the client's timezone, render the HTML in format: 'Monday, January 1, 2020'
const getDate = () => {
	const dt = new Date();
	const day = dt.toLocaleString('en-US', { weekday: 'long' });
	const month = dt.toLocaleString('en-US', { month: 'long' });
	const date = dt.getDate();
	const year = dt.getFullYear();

	const dateString = `${day}, ${month} ${date}, ${year}`;
	document.getElementById('date').innerText = dateString;
};

// Update the time every second and render the HTML
const updateTime = () => {
	setTimeout(() => {
		clock.innerHTML = '';
		printTime();
		getDate();
		updateTime();
	}, 1000);
};

const init = () => {
	printTime();
	getDate();

	updateTime();
};

init();
