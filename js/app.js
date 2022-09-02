const newsCategories = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();

    //return data;
    displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = (data) => {
    const newsCategory = document.getElementById('news-category');

    data.forEach(category => {
        //console.log(category);
        const { category_name } = category;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <a class="block p-3" href="#">${category_name}</a>`;
        newsCategory.appendChild(newsDiv);
    });
}

newsCategories()