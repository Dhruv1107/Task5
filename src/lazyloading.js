export class LazyLoading {
    constructor() {
        this.headlines;
        this.fetchHeadlines();
    }
    fetchHeadlines = () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=9fdb04ee4078412b82f9dd7f760464f8`;
        let req = new Request(url);
        let res = fetch(req)
            .then((res) => res.json())
            .then((data) => {
                this.headlines = data.articles;
                console.log(this.headlines);
                let titles = this.headlines.map(element => {
                    return element.title;
                });
                let headlineData = `<div class="modal-block" id="myHeadline">`;
                titles.forEach(currentItem => {
                    headlineData += `<div class="modal-content">
                                    <p>${currentItem}</p>
                                </div>`;
                });
                headlineData += `</<div>`;

                let headlineDivision = document.createElement('div');
                headlineDivision.setAttribute('id', 'iamheadline');
                let contentDivision = document.getElementById('main');
                contentDivision.appendChild(headlineDivision);
                document.getElementById('iamheadline').innerHTML = headlineData;
                document.getElementById('myHeadline').classList.remove('modal-none');
                document.getElementById('myHeadline').classList.add('modal-block');
                // document.getElementById('headlineClose').addEventListener('click', this.closepopup);

            }).catch(err => {
                console.log(err);
            });
    }
}
document.getElementById('main').onclick = function headlineLoad(event) {
    console.log("in headline window");
    let modal = document.getElementById('myHeadline');
    console.log(modal);
    if (event.target == modal) {
        document.getElementById('myHeadline').classList.add('modal-none');
    }
};
