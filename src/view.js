import '../static/style.css';
import Model from './model.js';
import Controller from './controller.js';

let model, controller;
window.onload = () => {
	model = new Model();
	controller = new Controller();
};

export default class View {
	constructor(data) {
		this.dataJSON = data;
		this.displayPage();
	}
	displayPage = () => {
		this.header();
		this.footer();
		this.displayForm(controller);
		this.createDisplayDiv();
		this.displayNews(this.dataJSON, controller);
		this.createPopup(controller);
	};

	header = () => {
		let html = `<h1 class="header__heading">NEWSFEED</h1><p class="header__caption">Yet another newsfeed</p>
						<input type='text' id='subscribe' class='form__subscribe-textbox' placeholder='Email Address'/>
						<button class='form__subscribe-button' id='subBtn'>Subscribe</button>`;
		document.getElementById('header').innerHTML = html;
		document.getElementById('subBtn').addEventListener("click", controller.validate);
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
		<button class='form__headlines' id='headlinesBtn'>Headlines</button>
		</div>`;
		document.getElementById('sel-category').addEventListener("change", this.selectCategoryNews);
		document.getElementById('headlinesBtn').addEventListener("click", function () {
			import('./lazyloading.js')
				.then(module => {
					new module.LazyLoading();
				})
				.catch(error => {
					console.log(error + "hey");
				});
		});
	};

	createDisplayDiv = () => {
		let displayNews = document.createElement('div');
		displayNews.setAttribute('id', 'displaynews');
		let main = document.getElementById('main');
		main.appendChild(displayNews);
	}

	displayNews = (dataJSON, controller) => {
		this.fullData = `<div class='content' id='content'>`;
		for (let index = 0; index < dataJSON.length; index++) {
			this.fullData += `<div class='content__sub' id='content__display'>
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
		this.fullData += `</div>`
		document.getElementById('displaynews').innerHTML = this.fullData;

		for (let index = 0; index < dataJSON.length; index++) {
			document.getElementById(`myBtn${index}`).addEventListener('click', function () {
				controller.showpopup(index, dataJSON);
			});
		}

	};

	createPopup = (controller) => {
		let modalData = `<div id="myModal">
						<div class="modal-content">
								<div class="modal-header">
									<span class="close" id="spanClose">&times;</span>
									<h2 id="popup_head"></h2>
								</div>

								<div class="modal-body">
									<p id="popup_content" class="popup_content"></p>
								</div>

								<div class="modal-footer">
									<h3 id="popup_foot">&copy; NewsFeed 2019</h3>
								</div>
						</div>
					</div>`;
		let modelDivision = document.createElement('div');
		modelDivision.setAttribute('id', 'iammodal');
		let contentDivision = document.getElementById('main');
		contentDivision.appendChild(modelDivision);
		document.getElementById('iammodal').innerHTML = modalData;
		document.getElementById('myModal').classList.add("modal-none");
		document.getElementById('spanClose').addEventListener('click', controller.closepopup);
	}

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
		this.displayNews(selectedData, controller);
	};
}


