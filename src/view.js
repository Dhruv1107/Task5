import Model from './model.js';
import Controller from './controller.js';

let model;
window.onload = () => {
	model = new Model();
};

export default class View {
	constructor(data) {
		this.dataJSON = data;
		this.controllerObj = new Controller(data);
		this.displayPage();
		this.fullData = ``;
	}
	displayPage = () => {
		this.header();
		this.footer();
		this.displayForm();
		this.createDisplayDiv();
		this.displayNews(this.dataJSON, this.controllerObj);
	};

	header = () => {
		let html = `<h1 class="header__heading">NEWSFEED</h1><p class="header__caption">Yet another newsfeed</p>
						<input type='text' id='subscribe' class='form__subscribe-textbox' placeholder='Email Address'/>
						<button class='form__subscribe-button' id='subBtn'>Subscribe</button>`;
		document.getElementById('header').innerHTML = html;
		document.getElementById('subBtn').addEventListener("click", this.controllerObj.validate);
	};

	footer = () => {
		let html = `<p class="footer__copyright">&copy; NewsFeed 2019</p>`;
		document.getElementById('footer').innerHTML = html;
	};

	displayForm = () => {
		let channels = [];
		this.dataJSON.forEach((e) => {
			channels.push(e.source.name);
		});
		channels = [...new Set(channels)];
		let formDivision = document.createElement('div');
		formDivision.setAttribute('id', 'iamform');
		let mainDivision = document.getElementById('main');
		mainDivision.appendChild(formDivision);

		let allChannels = '';
		for (let i = 0; i < channels.length; i++) {
			allChannels += `<option value='${channels[i]}'>${channels[i]}</option>`;
		}

		document.getElementById('iamform').innerHTML = `<div class='form'>
		<label for='sel-category' class='form__select-label'><b>SELECT CATEGORY</b></label>
		<select id='sel-category' class='form__select-box'>
		${allChannels} 
		</select>
		</div>`;
		document.getElementById('sel-category').addEventListener("change", this.selectCategoryNews);
	};

	createDisplayDiv = () => {
		let displayNews = document.createElement('div');
		displayNews.setAttribute('id', 'displaynews');
		let main = document.getElementById('main');
		main.appendChild(displayNews);
	}

	displayNews = (dataJSON, controller) => {
		this.fullData = '';
		for (let index = 0; index < dataJSON.length; index++) {
			this.fullData += `<div class='content' id='content'>
			<div class='content__sub' id='content__display'>
			<img src='${dataJSON[index].urlToImage}' class='content__img' ></img>
			<h3 class='content__modifier content__head' id='myBtn'>
			${dataJSON[index].title}
			</h3>
			<p class='content__modifier content__date'>
			${dataJSON[index].publishedAt}
			</p>
			<p class='content__modifier content__matter'>
			${dataJSON[index].description}
			</p>
			<a href='#!' class='content__modifier btn btn--pink' id='myBtn${index}'>Continue Reading</a>
			</div>
			<hr>`;
		}
		document.getElementById('displaynews').innerHTML = this.fullData;

		for (let index = 0; index < dataJSON.length; index++) {
			document.getElementById(`myBtn${index}`).addEventListener('click', function () {
				controller.showpopup(index, dataJSON);
			});
		}

	};

	//Function to display the selected news category
	selectCategoryNews = () => {
		let selectedCategory = document.getElementById('sel-category').value;
		let display = ' ';
		let indexDisplay = [];
		let data = this.dataJSON;

		let selectedData = data.filter(function (e, index) {
			if (selectedCategory === e.source.name) {
				indexDisplay.push(index);
			}
			return selectedCategory === e.source.name;
		});
		this.displayNews(selectedData, this.controllerObj);
	};
}


