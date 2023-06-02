const express = require('express')
const axios = require("axios");
const cors = require('cors');

const port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors());

/* TODO: Replace this with your own API key */
const API_KEY = 'pQCBCi9KYLxy7GU0ekrd0m3I756tJ2E6kTMWowJO'

app.get("/apod-for-date", async function (req, res) {
	const date = req.query.date;
	// const title = res.data.title;
	// const url = res.data.url;

	

	/* TODO for Task 1: Make an API call to NASA's APOD API to get the APOD for the given date */
	axios
		.get('https://api.nasa.gov/planetary/apod', {
			params: {
				api_key: API_KEY,
				date: date
			},
		})
		.then(body => res.json({ name: body.data.title, url: body.data.url, date: body.data.date}));
});

app.get("/apods-for-april", function (req, res) {
	const start_date = "2022-04-01";
	const end_date = "2022-04-30";

	/* TODO for Task 2: Make an API call to NASA's APOD API to get all the APOD images for April 2022 */
	axios
		.get('https://api.nasa.gov/planetary/apod', {
			params: {
				api_key: API_KEY,
				start_date: start_date,
				end_date: end_date
			},
		})
		.then(body => {
			const finalObj = new Array();
			finalObj.push({name: body.data[0].title, url: body.data[0].url, date: body.data[0].date});
			for (let i = 1; i < body.data.length; i++) {
				// console.log(body.data.length);
				finalObj.push({ name: body.data[i].title, url: body.data[i].url, date: body.data[i].date});
			}
			res.json(finalObj);
		})
});


app.get("/apods-for-month", function (req, res) {
	const month = req.query.month;
	const year = req.query.year;

	// const month = '02';
	// const year = '2020';
	var d = new Date(Number(year), Number(month), 0);
	// console.log(d.toString());
	var lastDay = d.getDate().toString();

	/* TODO for Task 3: Make an API call to NASA's APOD API to get all the APOD images for the specified month and year */
	axios
		.get('https://api.nasa.gov/planetary/apod', {
			params: {
				api_key: API_KEY,
				start_date: year + '-' + month + '-01',
				end_date: year + '-' + month + '-' + lastDay
			},
		})
		.then(body => {
			const finalObj = new Array();
			finalObj.push({name: body.data[0].title, url: body.data[0].url, date: body.data[0].date});
			for (let i = 1; i < body.data.length; i++) {
				// console.log(body.data.length);
				finalObj.push({ name: body.data[i].title, url: body.data[i].url, date: body.data[i].date});
			}
			res.json(finalObj);
		})
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});