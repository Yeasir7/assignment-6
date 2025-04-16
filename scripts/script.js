const loadData = async() => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
        const news = await res.json();
        displayData(news);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayData = (news) => {
    const latestCard = document.getElementById('latest-card');
    latestCard.innerHTML = ''; 

    news.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-sm p-6 rounded-lg m-4';
        div.innerHTML = `
        <figure>
            <img src="${item.cover_image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg" />
        </figure>
        <div class="flex items-center space-x-3 mt-3">
           <img src="images/Frame4.png"/>
           <p>${item.author.posted_date  || 'Unknown' }</p>
        </div>
        <div class="card-body">
            <h2 class="card-title">
                ${item.title}
            </h2>
            <p>${item.description}</p>
            <div class="card-actions flex items-center mt-4">
                <div class="mr-3">
                    <img src="${item.profile_image}" alt="Author" class="w-10 h-10 rounded-full" />
                </div>
                <div>
                    <h1 class="font-semibold">${item.author.name}</h1>
                    <p class="text-sm text-gray-500">${item.author.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        latestCard.appendChild(div);
    });
}


loadData();