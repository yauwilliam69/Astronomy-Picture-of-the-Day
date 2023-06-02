const load_q1 = () => {
	const date = document.getElementById("q1-input").value;
	document.getElementById("q1-header").innerHTML = "Loading...";
	document.getElementById("q1-img").src = "";
	document.getElementById("q1-load").disabled = true;

	axios.get(`http://localhost:3000/apod-for-date?date=${date}`, {timeout: 10 * 1000}).then((body) => {
		console.log("Received response from server for Q1: ", body.data);
		document.getElementById("q1-header").innerHTML = `${body.data.name} (${body.data.date})`;
		document.getElementById("q1-img").src = body.data.url;
		document.getElementById("q1-load").disabled = false;
	}, (err) => {
		console.log("Error: ", err);
		document.getElementById("q1-header").innerHTML = "Error!";
		document.getElementById("q1-load").disabled = false;
	});
}

const load_q2 = () => {
	document.getElementById("q2-header").innerHTML = "Loading...";
	document.getElementById("q2-container").innerHTML = "";
	document.getElementById("q2-load").disabled = true;

	axios.get(`http://localhost:3000/apods-for-april`, {timeout: 10 * 1000}).then((body) => {
		console.log("Received response from server for Q2: ", body.data);
		const apods = body.data;
		document.getElementById("q2-header").innerHTML = `Loaded ${apods.length} images`;
		document.getElementById("q2-load").disabled = false;
		for (const apod of apods) {
			const img = document.createElement("img");
			img.src = apod.url;
			const a = document.createElement("a");
			a.href = apod.url;
			a.target = "_blank";
			a.appendChild(img)
			document.getElementById("q2-container").appendChild(a);
		}
	}, (err) => {
		console.log("Error: ", err);
		document.getElementById("q2-header").innerHTML = "Error!";
		document.getElementById("q2-load").disabled = false;
	});
}

const load_q3 = () => {
	const input = document.getElementById("q3-input").value;
	if (input !== "") {
		document.getElementById("q3-header").innerHTML = "Loading...";
		document.getElementById("q3-container").innerHTML = "";
		document.getElementById("q3-load").disabled = true;

		const month_tokens = input.split("-");

		axios.get(`http://localhost:3000/apods-for-month?month=${month_tokens[1]}&&year=${month_tokens[0]}`, {timeout: 10 * 1000}).then((body) => {
			console.log("Received response from server for Q3: ", body.data);
			const apods = body.data;
			document.getElementById("q3-header").innerHTML = `Loaded ${apods.length} images`;
			document.getElementById("q3-load").disabled = false;
			for (const apod of apods) {
				console.log(apod); 
				const img = document.createElement("img");
				img.src = apod.url;
				const a = document.createElement("a");
				a.href = apod.url;
				a.target = "_blank";
				a.appendChild(img)
				document.getElementById("q3-container").appendChild(a);
			}
		}, (err) => {
			console.log("Error: ", err);
			document.getElementById("q3-header").innerHTML = "Error!";
			document.getElementById("q3-load").disabled = false;
		});
	}
}