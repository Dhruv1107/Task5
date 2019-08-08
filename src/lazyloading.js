export class LazyLoading {
    constructor() {
        this.headlines;
        this.fetchHeadlines();
    }
    fetchHeadlines = () => {
        console.log("fetchHeadlines");
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=9fdb04ee4078412b82f9dd7f760464f8`;
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

    }
}