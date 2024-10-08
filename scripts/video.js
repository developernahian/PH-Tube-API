
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time%3600;
    const minute = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond%60;

    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}


const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons)
    for(let btn of buttons){
        btn.classList.remove("active")
    }
}



//1 - fetch, Load and show catagories on html

//create loadCategories
const loadCategories = () => {
        //fetch the data
        fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then((data) => displayCategories(data.categories))
        .then((error) => console.log(error))
}


//searchText="" default value empty
const loadVideos = (searchText= "") => {
    //fetch the data
    // fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)

    .then(res => res.json())
    .then((data) => displayVideos(data.videos))
    .then((error) => console.log(error))
}


const loadCategoryVideos = (id) => {
    // alert(id)
    //fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    // .then((data) => console.log(data.category))
    .then((data) => {
        //active and class remove
        removeActiveClass()

        //id er class active
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        console.log(activeBtn)
        displayVideos(data.category)
    })
    .then((error) => console.log(error))
}


const loadDetails = async(videoId) => {
    // console.log(videoId)

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    displayDetails(data.video)
}
const displayDetails = (video) => {
    console.log(video)
    const detailContainer = document.getElementById("modal-content")

    detailContainer.innerHTML = `
        <img src="${video.thumbnail}" />
        <p>${video.description}</p>
    `;

    //way-1
    // document.getElementById("showModalData").click();
    
    //way-2
    document.getElementById("customModal").showModal();//showModal() eta daisy ui diyeche. showModal() by default JS DOM e nai....
}



// const cardDemo = {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


const displayVideos = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById("videos")
    videoContainer.innerHTML = ""

    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col justify-center items-center gap-5">
            <img src="./assets/Icon.png" alt="no videos" class="w-1/3"/>
            <h2 class="text-center text-2xl font-bold">
            No Content Here In This Category
            </h2>
        </div>
        `;
        return
    }
    else{
        videoContainer.classList.add("grid")
    }


    videos.forEach((video) =>{
        console.log(video)

        const card = document.createElement("div")
        card.classList = "card card-compact"
        card.innerHTML = `
<figure class="h-[200px] relative">
    <img
      class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-white bg-black rounded p-1 text-xs">${getTimeString(video.others.posted_date)}</span>`}

      ${video.others.views?.length == 0 ? "" : `<span class="absolute left-2 top-2 text-white bg-red-700 rounded-md p-1">${video.others.views} views</span>`}
      
</figure>

<div class="px-0 py-2 flex gap-2">

        <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
        </div>

        <div>
            <h2 class="font-bold">${video.title}</h2>

            <div class="flex items-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>

            ${video.authors[0].verified == true
                ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />`
                : ""
             }
            

            </div>
            
            <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">Details</button> </p>

        </div>

</div>
        `;

        videoContainer.appendChild(card)
    })
}




/*
"category_id": "1001",
"category": "Music"
*/




const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    //add Data in html
    // console.log(categories)
    categories.forEach((item) =>{
        console.log(item)
        //create a button

        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
        </button>

        `;

        //add button to catagory cantainer
        categoryContainer.appendChild(buttonContainer)
    })
}


document.getElementById("search-input").addEventListener("keyup", (eee)=>{
    // console.log(eee.target.value)
    loadVideos(eee.target.value)
})
    
loadCategories()
loadVideos()




