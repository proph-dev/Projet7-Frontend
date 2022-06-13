class App {
    getRecipes = async () => {
        const response = await fetch('./data/recipes.json')
        const recipesList = await response.json();
        return recipesList;
    }
    
    displayData = async (recipesList) => {
        const recipesSection = document.querySelector("main");
    
        recipesList.forEach((recipeList) => {
            const model = new RecipeFactory(recipeList).createRecipeModel();
            recipesSection.appendChild(new RecipeCard(model).createRecipeCard());
        });
    };

    run = async () => {
        const recipes = await this.getRecipes();

        await this.displayData(recipes);
    }
}


const app = new App();
app.run();