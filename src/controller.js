export default class Controller {
	constructor(data) {
		this.dataJSON = data;
		this.email = [];
	}

	validate = () => {
		if (
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
				document.getElementById('subscribe').value
			)
		) {
			let loc = localStorage.getItem('iamkey');
			if (loc) {
				this.email = JSON.parse(loc);
			}
			this.email.push(document.getElementById('subscribe').value);
			localStorage.setItem('iamkey', JSON.stringify(this.email));
			console.log(localStorage.getItem('iamkey'));
			alert('You have entered a valid email address!');
			return true;
		}
		alert('You have entered an invalid email address!');
		return false;
	};

	showpopup = (index, data) => {
		// console.log("in show popup");

		document.getElementById('popup_head').innerHTML = data[index].title;
		document.getElementById('popup_content').innerHTML = data[index].content;
		document.getElementById('myModal').classList.remove('modal-none');
		document.getElementById('myModal').classList.add('modal-block');
	};

	closepopup = () => {
		document.getElementById('myModal').classList.add("modal-none");
	}

	showLoader = () => {
		let loader = document.createElement('div');
		loader.setAttribute('id', 'loader');
		loader.setAttribute('class', 'loader');
		let main = document.getElementById('main');
		main.appendChild(loader);
	}

	closeLoader = () => {
		let loader = document.getElementById('loader');
		loader.style.display = 'none';
	}

	// lazyLoadHeadlines = (data) => {

	// }
}
window.onclick = function (event) {
	let modal = document.getElementById('myModal');
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
