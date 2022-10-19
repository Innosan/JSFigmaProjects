async function fetchEmojis(path) {
	const request = new Request(path);
	const response = await fetch(request);

	return await response.json();
}

console.time("Fetch request time");

let str = "";
let allChars = [];
let itemsList = document.getElementById("items-list");

fetchEmojis("http://hp-api.herokuapp.com/api/characters").then((chars) => {
	chars.forEach((char) => {
		str += `<div class="item">
				<img src="${char.image}" alt="Hermione" class="char-image" />
				<p class="char-name">${char.name}</p>
				<p class="char-actor">Actor: ${char.actor}</p>
				<p class="char-gender">Gender: ${char.gender}</p>
				<p class="char-house">House: ${char.house}</p>
				<p class="char-wand-core">Wand core: ${char.wand.core}</p>
				<p class="char-status">Alive: ${char.alive}</p>
			</div>`;
		allChars.push(char);
	});
	itemsList.innerHTML = str;
});

console.timeEnd("Fetch request time");

let divList = document.getElementsByClassName("item");

function filterCharsByHouse(house) {
	for (let i = 0; i < divList.length; i++) {
		if (allChars[i].house.includes(house)) {
			divList[i].style.display = "block";
		} else divList[i].style.display = "none";
	}
	if (house === "Show All") {
		for (let i = 0; i < divList.length; i++) {
			divList[i].style.display = "block";
		}
	}
}

function searchChar(charName) {
	for (let i = 0; i < divList.length; i++) {
		if (allChars[i].name.toLowerCase().includes(charName)) {
			divList[i].style.display = "block";
		} else divList[i].style.display = "none";
	}
}
