const recipeListEl = document.querySelector('.recipe__list');

const apiKey = '95f7597b3c5f48388a71ace295b5a79f';
const count = 10;
const apiUrl = `https://api.spoonacular.com/recipes/random?&number=${count}&apiKey=${apiKey}&diet=vegetarian`;

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";

    recipes.forEach((recipe) => {
        const item = document.createElement("li");
        item.classList.add("recipe");

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = recipe.title;
        img.classList.add("recipe__image");
        
        const title = document.createElement("h3");
        title.innerText = recipe.title;
        title.classList.add("recipe__name");

        const description = document.createElement("p");
        description.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")} `;

        const link = document.createElement("a");
        link.href = recipe.sourceUrl;
        link.innerText = "VIEW RECIPE";
        link.classList.add("recipe__link");

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(link);

        recipeListEl.appendChild(item);
    });
}

////////////////////////////////////////////////////////

async function getRecipes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return data.recipes;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();