import View from './view.js';
import Controller from './controller.js';

export default class Model {
	constructor() {
		this.fetchcall();
	}

	async fetchcall() {
		let dataJSON;
		let url = 'https://newsapi.org/v2/top-headlines?' + 'country=in&' + 'apiKey=9fdb04ee4078412b82f9dd7f760464f8';
		let req = new Request(url);
		let loader = new Controller();
		loader.showLoader();
		let res = await fetch(req).then((res) => res.json()).then((data) => {
			dataJSON = data.articles;
		}).catch(err => {
			console.log(err);
		});
		loader.closeLoader();
		let news = new View(dataJSON);
	};
}
