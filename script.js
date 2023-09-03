const apiKey = '95f7597b3c5f48388a71ace295b5a79f';
const count = 10;
const apiUrl = `https://api.spoonacular.com/recipes/random?number=${count}&apiKey=${apiKey}`;

async function getRecipes () {
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
    console.log(recipes);
}

init();