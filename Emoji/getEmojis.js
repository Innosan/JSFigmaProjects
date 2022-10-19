async function fetchEmojis(path) {
	const request = new Request(path);
	const response = await fetch(request);

	return await response.json();
}

console.time("Fetch request time");

let str = "";
let allEmoji = [];
let itemsList = document.getElementById("items-list");

fetchEmojis("https://emoji-api-app.herokuapp.com/").then((emo) => {
	emo.forEach((emoji) => {
		str += `<div class="item">
        	<p class="emoji">${emoji.symbol}</p>
        	<p class="emoji-name">${emoji.title}</p>
        	<p class="emoji-keywords">${emoji.keywords}</p>
      	</div>`;
		allEmoji.push(emoji);
	});
	itemsList.innerHTML = str;
});

console.timeEnd("Fetch request time");

console.time("dsadq");

let descList = document.getElementsByClassName("item");

console.timeEnd("dsadq");
function dynamicSearch(searchQuery) {
	console.time("⏳ Search time:");

	for (let i = 0; i < descList.length; i++) {
		allEmoji;
		if (allEmoji[i].keywords.includes(searchQuery)) {
			descList[i].style.display = "block";
		} else {
			descList[i].style.display = "none";
		}
	}
	console.timeEnd("⏳ Search time:");
}
