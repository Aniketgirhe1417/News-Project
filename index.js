
// const apiKey = "2f85e766bae04fbdb372ad4ed035c058";
const apiKey = "2f85e766bae04fbdb372ad4ed035c058";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('Search-input');
const searchButton = document.getElementById('Search-button');


async function fetchRandomNews() {
    try {
        // const apiUrl  = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

        const apiUrl  = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
        

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}



searchButton.addEventListener("click", async ()=> {
    const query = searchField.value.trim
    ();
    if(query != ""){
        try {
            const articles = await fetchNewsQuery
            (query) 
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
});


async function fetchNewsQuery(query) {
    try {
        const apiUrl  = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
        
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }

}

 function  displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement
        ("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        
        const description = document.createElement("p");
        
        description.textContent =  article.description;
        // description.textContent = article.description;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", ()=> {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);


        
    });
 }

(async () => {

    try {
        const article = await fetchRandomNews();
        displayBlogs(article);
        
    } catch (error) {
        console.error("Error fetching random news", error);
    }
}) (); 
