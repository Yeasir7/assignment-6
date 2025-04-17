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
    latestCard.innerHTML = ''; // Clear existing content

    news.forEach(item => {
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-sm p-6 rounded-lg m-4';
        div.innerHTML = `
        <figure>
            <img src="${item.cover_image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg" />
        </figure>
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

const loadData2 = async(value) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`);
        const data = await res.json();
        // console.log(data)
        displayData2(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayData2 = (data) => {
    const discussContainer = document.getElementById('discuss-container');
    discussContainer.innerHTML = ''; // Clear old posts

    data.posts.forEach(post => {
        const div = document.createElement('div');
        div.classList = 'bg-white shadow-md rounded-xl p-6 mb-6';

        div.innerHTML = `
            <div class="flex flex-col gap-4">
                <div class="flex gap-3 text-sm text-gray-500">
                    <p>#${post.category}</p>
                    <p>Author: ${post.author.name}</p>
                </div>
                <h2 class="text-xl font-bold">${post.title}</h2>
                <p>${post.description}</p>
                <hr class="my-4 border-dashed">
                <div class="flex justify-between items-center">
                    <div class="flex space-x-6 text-sm text-gray-600">
                        <div class="flex items-center gap-1">
                            <img src="images/tabler-icon-message-2.png" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img src="images/tabler-icon-eye.png" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img src="images/tabler-icon-clock-hour-9.svg" alt="">
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <button class="btn btn-square" onclick='showModal(${JSON.stringify(post)})'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-[1.2em]"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    </button>
                </div>
            </div>
        `;
        discussContainer.appendChild(div);
    });
}


const handleSearch = () => {
    const inputValue = document.getElementById('input-value')
    loadData2(inputValue.value)
}