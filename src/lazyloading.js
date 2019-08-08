export class LazyLoading {
    constructor() {
        this.headlines;
        this.fetchHeadlines();
    }
    fetchHeadlines = () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9fdb04ee4078412b82f9dd7f760464f8`;
        let req = new Request(url);
        let res = fetch(req).then((res) => res.json()).then((data) => {
            this.headlines = data.articles;
            console.log(this.headlines);
            this.lazyLoadHeadlines(this.headlines);
        }).catch(err => {
            console.log(err);
        });
    }

    lazyLoadHeadlines = data => {
        let titles = data.map(element => {
            return element.title;
        });
        // titles = titles.toString();
        console.log(titles);
        this.showPopup(titles);
    }

    showPopup = data => {
        let headlineData = `<div class="modal-block" id="myHeadline">`;
        data.forEach(currentItem => {
            headlineData += `<div class="modal-content">
                                <p>${currentItem}</p>
                            </div>`;
        });
        headlineData += `</<div>`;
        // console.log(headlineData);

        let headlineDivision = document.createElement('div');
        headlineDivision.setAttribute('id', 'iamheadline');
        let contentDivision = document.getElementById('main');
        contentDivision.appendChild(headlineDivision);
        document.getElementById('iamheadline').innerHTML = headlineData;
        document.getElementById('myHeadline').classList.remove('modal-none');
        document.getElementById('myHeadline').classList.add('modal-block');
    }

    closepopup = () => {
        console.log("in close popup");
        document.getElementById('myHeadline').classList.add("modal-none");
    }

}
