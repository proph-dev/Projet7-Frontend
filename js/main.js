class App {
    recipesWrapper;
    recipesList;
    constructor () {
        this.recipesWrapper = document.querySelector("main");
    }
    
    getRecipes = async () => {
        const response = await fetch('./data/recipes.json')
        const recipes = await response.json();
        this.recipesList = recipes.map(recipe => new RecipeFactory(recipe));
    }
    
    run = async () => {
        await this.getRecipes();

        this.recipesSubject = new RecipesSubject();
        this.recipesObserver = new RecipesObserver(this.recipesList);
        this.recipesSubject.subscribe(this.recipesObserver);

        const SearchForm = new MainSearchForm(this.recipesSubject);
        SearchForm.build();

        this.recipesList.forEach(recipe => {
            this.recipesWrapper.appendChild(new RecipeCard(recipe).createRecipeCard());
        })
    }
}


const app = new App();
app.run();