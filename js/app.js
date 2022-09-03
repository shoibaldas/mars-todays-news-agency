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
        const { category_name, category_id } = category;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <a class="block p-3 md:hover:text-violet-700 md:no-underline md:hover:underline md:decoration-2 md:decoration-violet-700 md:underline-offset-8" href="#" onclick="showcard('${category_id}')">${category_name}</a>`;
        newsCategory.appendChild(newsDiv);
    });
}



const getNewsFromCategories = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayNewsByCategory(data.data);
}

const showcard = (category_id) => {

    getNewsFromCategories(category_id);
}

const displayNewsByCategory = (data) => {
    const getIdByCategory = document.getElementById('display-news');
    getIdByCategory.textContent = '';

    data.forEach(newsElement => {
        const { _id, thumbnail_url, author, title, details, rating, total_view } = newsElement;
        const { img, name, published_date } = author;
        const { number } = rating;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        newsDiv.innerHTML = `
        <div
                class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full hover:bg-gray-100">
                <img class="object-cover w-full h-96 rounded-t-lg p-4 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="${thumbnail_url}" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">${title}</h5>
                    <p class="mb-3 font-normal text-gray-400">${details.slice(0, 300)}...</p>
                    <div class="flex justify-between items-center">
                        <div class="flex">
                            <div>
                                <img class="object-contain w-12 rounded-full" src="${img}" alt="">
                            </div>
                            <div class="ml-2">
                                <p class="font-semibold">${name ? name : "No data Available"}</p>
                                <p class="text-gray-400">${published_date}</p>
                            </div>
                        </div>
                        <div class="ml-2">
                            <p><i class="fa-solid fa-eye text-violet-700"></i> ${total_view > 0 ? total_view : "No Data Available"}</p>
                        </div>
                        <div class="text-violet-700">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div>
                            <button class="text-violet-700" onclick="modalDataView('${_id}') type="button" data-modal-toggle="medium-modal"><i class="fa-brands fa-readme"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        getIdByCategory.appendChild(newsDiv);
    })
}

const modalDataView = async (news_id, id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    modalDataAdd(data.data[0]);

}

const modalDataAdd = (data) => {
    const { author, thumbnail_url } = data;
    const { img, name, published_date } = author;

    const getData = document.getElementById('modal-view');
    getData.textContent = '';
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col');
    newsDiv.innerHTML = `
                    <img class="object-cover w-full h-96 rounded-t-lg p-4 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                                src="${thumbnail_url}" alt="">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">${title}</h5>
                    <div class="flex">
                        <div>
                            <img class="object-contain w-12 rounded-full" src="${img}" alt="">
                        </div>
                        <div class="ml-2">
                            <p class="font-semibold">${name ? author.name : "No data Available"}</p>
                            <p class="text-gray-400">${published_date}</p>
                        </div>
                    </div>
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">${details}</p>
    `;

    getData.appendChild(newsDiv);
}

newsCategories();
getNewsFromCategories();
modalDataView();