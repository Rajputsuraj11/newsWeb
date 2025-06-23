const apiKey = "a408bd279a174035a09c7780f758c492";

async function fetchNews() {
    const domain = document.getElementById("domain").value;
    const date = document.getElementById("date").value;

    if (!domain || !date) {
        alert("Please enter both a topic and a date.");
        return;
    }

    const url = `https://newsapi.org/v2/everything?q=${domain}&from=${date}&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news found for this topic and date.</p>";
        return;
    }

    articles.forEach(article => {
        const newsElement = document.createElement("div");
        newsElement.classList.add("news-article");
        
        newsElement.innerHTML = `
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <p>${article.description || "No description available."}</p>
            <small>Published on: ${new Date(article.publishedAt).toLocaleString()}</small>
        `;

        newsContainer.appendChild(newsElement);
    });
}
