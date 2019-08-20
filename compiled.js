"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Controller = function Controller(_data) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "validate", function () {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(document.getElementById('subscribe').value)) {
      var loc = localStorage.getItem('iamkey');

      if (loc) {
        _this.email = JSON.parse(loc);
      }

      _this.email.push(document.getElementById('subscribe').value);

      localStorage.setItem('iamkey', JSON.stringify(_this.email));
      console.log(localStorage.getItem('iamkey'));
      alert('You have entered a valid email address!');
      return true;
    }

    alert('You have entered an invalid email address!');
    return false;
  });

  _defineProperty(this, "showpopup", function (index, data) {
    // console.log("in show popup");
    var modalData = "<div id=\"myModal\">\n\t\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t\t<span class=\"close\" id=\"spanClose\">&times;</span>\n\t\t\t\t\t\t\t\t<h2 id=\"popup_head\"></h2>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t\t\t\t<p id=\"popup_content\" class=\"popup_content\"></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t\t\t<h3 id=\"popup_foot\">&copy; NewsFeed 2019</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";
    var modelDivision = document.createElement('div');
    modelDivision.setAttribute('id', 'iammodal');
    var contentDivision = document.getElementById('content');
    contentDivision.appendChild(modelDivision);
    document.getElementById('iammodal').innerHTML = modalData;
    document.getElementById('spanClose').addEventListener('click', _this.closepopup);
    document.getElementById('popup_head').innerHTML = data[index].title;
    document.getElementById('popup_content').innerHTML = data[index].content;
    document.getElementById('myModal').classList.remove('modal-none');
    document.getElementById('myModal').classList.add('modal-block');
  });

  _defineProperty(this, "closepopup", function () {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
  });

  _defineProperty(this, "showLoader", function () {
    var loader = document.createElement('div');
    loader.setAttribute('id', 'loader');
    loader.setAttribute('class', 'loader');
    var main = document.getElementById('main');
    main.appendChild(loader);
  });

  _defineProperty(this, "closeLoader", function () {
    var loader = document.getElementById('loader');
    loader.style.display = 'none';
  });

  this.dataJSON = _data;
  this.email = [];
};

exports["default"] = Controller;

window.onclick = function (event) {
  var modal = document.getElementById('myModal');

  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("./view.js"));

var _controller = _interopRequireDefault(require("./controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);

    console.log('Model constructor');
    this.dataJSON;
    this.fetchcall();
  }

  _createClass(Model, [{
    key: "fetchcall",
    value: function () {
      var _fetchcall = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var url, req, loader, res, news;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('fetchcall');
                url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=9fdb04ee4078412b82f9dd7f760464f8';
                req = new Request(url);
                loader = new _controller["default"]();
                loader.showLoader();
                _context.next = 7;
                return fetch(req).then(function (res) {
                  return res.json();
                }).then(function (data) {
                  _this.dataJSON = data.articles;
                })["catch"](function (err) {
                  console.log(err);
                });

              case 7:
                res = _context.sent;
                loader.closeLoader();
                news = new _view["default"](this.dataJSON);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchcall() {
        return _fetchcall.apply(this, arguments);
      }

      return fetchcall;
    }()
  }]);

  return Model;
}();

exports["default"] = Model;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = _interopRequireDefault(require("./model.js"));

var _controller = _interopRequireDefault(require("./controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var model;

window.onload = function () {
  model = new _model["default"]();
};

var View = function View(_data) {
  var _this = this;

  _classCallCheck(this, View);

  _defineProperty(this, "displayPage", function () {
    _this.header();

    _this.footer();

    _this.displayForm();

    _this.createDisplayDiv();

    _this.displayNews(_this.dataJSON, _this.controllerObj);
  });

  _defineProperty(this, "header", function () {
    var html = "<h1 class=\"header__heading\">NEWSFEED</h1><p class=\"header__caption\">Yet another newsfeed</p>\n\t\t\t\t\t\t<input type='text' id='subscribe' class='form__subscribe-textbox' placeholder='Email Address'/>\n\t\t\t\t\t\t<button class='form__subscribe-button' id='subBtn'>Subscribe</button>";
    document.getElementById('header').innerHTML = html;
    document.getElementById('subBtn').addEventListener("click", _this.controllerObj.validate);
  });

  _defineProperty(this, "footer", function () {
    var html = "<p class=\"footer__copyright\">&copy; NewsFeed 2019</p>";
    document.getElementById('footer').innerHTML = html;
  });

  _defineProperty(this, "displayForm", function () {
    var channels = [];

    _this.dataJSON.forEach(function (e) {
      channels.push(e.source.name);
    });

    channels = _toConsumableArray(new Set(channels));
    var formDivision = document.createElement('div');
    formDivision.setAttribute('id', 'iamform');
    var mainDivision = document.getElementById('main');
    mainDivision.appendChild(formDivision);
    var allChannels = '';

    for (var i = 0; i < channels.length; i++) {
      allChannels += "<option value='".concat(channels[i], "'>").concat(channels[i], "</option>");
    }

    document.getElementById('iamform').innerHTML = "<div class='form'>\n\t\t<label for='sel-category' class='form__select-label'><b>SELECT CATEGORY</b></label>\n\t\t<select id='sel-category' class='form__select-box'>\n\t\t".concat(allChannels, " \n\t\t</select>\n\t\t</div>");
    document.getElementById('sel-category').addEventListener("change", _this.selectCategoryNews);
  });

  _defineProperty(this, "createDisplayDiv", function () {
    var displayNews = document.createElement('div');
    displayNews.setAttribute('id', 'displaynews');
    var main = document.getElementById('main');
    main.appendChild(displayNews);
  });

  _defineProperty(this, "displayNews", function (dataJSON, controller) {
    _this.fullData = '';

    for (var index = 0; index < dataJSON.length; index++) {
      _this.fullData += "<div class='content' id='content'>\n\t\t\t<div class='content__sub' id='content__display'>\n\t\t\t<img src='".concat(dataJSON[index].urlToImage, "' class='content__img' ></img>\n\t\t\t<h3 class='content__modifier content__head' id='myBtn'>\n\t\t\t").concat(dataJSON[index].title, "\n\t\t\t</h3>\n\t\t\t<p class='content__modifier content__date'>\n\t\t\t").concat(dataJSON[index].publishedAt, "\n\t\t\t</p>\n\t\t\t<p class='content__modifier content__matter'>\n\t\t\t").concat(dataJSON[index].description, "\n\t\t\t</p>\n\t\t\t<a href='#!' class='content__modifier btn btn--pink' id='myBtn").concat(index, "'>Continue Reading</a>\n\t\t\t</div>\n\t\t\t<hr>");
    }

    document.getElementById('displaynews').innerHTML = _this.fullData;

    var _loop = function _loop(_index) {
      document.getElementById("myBtn".concat(_index)).addEventListener('click', function () {
        controller.showpopup(_index, dataJSON);
      });
    };

    for (var _index = 0; _index < dataJSON.length; _index++) {
      _loop(_index);
    }
  });

  _defineProperty(this, "selectCategoryNews", function () {
    var selectedCategory = document.getElementById('sel-category').value;
    var display = ' ';
    var indexDisplay = [];
    var data = _this.dataJSON;
    var selectedData = data.filter(function (e, index) {
      if (selectedCategory === e.source.name) {
        indexDisplay.push(index);
      }

      return selectedCategory === e.source.name;
    });

    _this.displayNews(selectedData, _this.controllerObj);
  });

  this.dataJSON = _data;
  this.controllerObj = new _controller["default"](_data);
  this.displayPage();
  this.fullData = "";
};

exports["default"] = View;
