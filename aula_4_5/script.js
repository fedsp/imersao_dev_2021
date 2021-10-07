var movies = {
    'Ação': [],
    'Aventura': [
        {imageUrl:"./media/movie1.jpg",movieTitle:"A viagem de Chihiro"},
        {imageUrl:"./media/movie2.jpg",movieTitle:"Meu amigo Totoro"},        
        {imageUrl:"./media/movie4.jpg",movieTitle:"Princesa Mononoke"},
        {imageUrl:"./media/movie7.jpg",movieTitle:"Laputa castelo no céu"}
    ],
    'Suspense': [
        {imageUrl:"./media/movie5.jpg",movieTitle:"Um lugar silencioso"},
        {imageUrl:"./media/movie6.jpg",movieTitle:"Um lugar silencioso pt.2"}
    ],
    'Drama': [
        {imageUrl:"./media/movie3.jpg",movieTitle:"O túmulo dos vagalumes"}
    ],
    'Romance': [],
    'Comédia': [],
    'Terror': []
}
const movieCategories = Object.keys(movies);
render();

async function expandMenu(idDiv, idButton, className) {
    var menuObj = document.getElementById(idDiv);
    var buttonObj = document.getElementById(idButton);
    buttonObj.setAttribute("onClick", null);
    if (menuObj.className == `colapsibleMenu colapsibleMenuExpanded ${className}` || menuObj.className == `colapsibleMenu colapsibleMenuExpanding ${className}`) {
        menuObj.className = "colapsibleMenu colapsibleMenuShrinking "+className;
        await sleep(500);
        menuObj.className = "colapsibleMenu colapsibleMenuShrinked "+className;
    }
    else {
        menuObj.className = "colapsibleMenu colapsibleMenuExpanding "+className;
        await sleep(500);
        menuObj.className = "colapsibleMenu colapsibleMenuExpanded "+className;
    }
    buttonObj.setAttribute("onClick", `expandMenu('${idDiv}','${idButton}','${className}')`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addMovie() {
    var movieCategory = document.getElementById("movieCategorySelector").value
    var objectToBeAdded = {
        imageUrl: document.getElementById("movieImageUrl").value,
        movieTitle: document.getElementById("movieTitle").value
    }
    movies[movieCategory].push(objectToBeAdded);
    render();
}

function render() {    
    var moviesContainer = document.getElementById("moviesContainer");
    moviesContainer.innerHTML = "";
    movieCategories.forEach(renderMovieCategory);}

function renderMovieCategory(movieCategory) {
    var moviesContainer = document.getElementById("moviesContainer");
    var movieCategoryDiv = document.createElement("div");
    movieCategoryDiv.className= "movieCategoryContainer";
    movieCategoryDiv.innerHTML = `<div class="movieCategoryExpander" id=movieCategoryExpander${movieCategory} onclick="expandMenu('movieCategoryContainerContent${movieCategory}','movieCategoryExpander${movieCategory}','movieCategoryContainerContent')"><span>${movieCategory}&nbsp&nbsp&nbsp</span><img id="expandIcon"src="./media/up-arrow-svgrepo-com.svg"></div>`;
    var movieCategoryContentDiv = document.createElement("div");
    movieCategoryContentDiv.className = "colapsibleMenu colapsibleMenuShrinked movieCategoryContainerContent";
    movieCategoryContentDiv.id = `movieCategoryContainerContent${movieCategory}`;
    movies[movieCategory].forEach((item)=>{
        var movieElement = document.createElement("div");
        movieElement.className = "singleMovieContainer";
        movieElement.innerHTML = `<img src="${item.imageUrl}" class="movieImage"><div class="movieTitle"><span>${item.movieTitle}</span></div>`
        console.log(movieElement);
        movieCategoryContentDiv.appendChild(movieElement)
    });
    movieCategoryDiv.appendChild(movieCategoryContentDiv);
    moviesContainer.appendChild(movieCategoryDiv);
}