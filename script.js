const recipeListEl = document.querySelector('.recipe__list');

const apiKey = '95f7597b3c5f48388a71ace295b5a79f';
const count = 10;
const apiUrl = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${apiKey}`;

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe");

        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";
        

        const recipeTitleEl = document.createElement("h3");
        recipeTitleEl.innerText = recipe.title;

        const recipeDescriptionEl = document.createElement("p");
        recipeDescriptionEl.innerHTML = `
        <strong>Ingredients:</strong> ${recipe.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")} `;

        const recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "VIEW RECIPE";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeDescriptionEl);
        recipeItemEl.appendChild(recipeLinkEl);

        recipeListEl.appendChild(recipeItemEl);
    });
}

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