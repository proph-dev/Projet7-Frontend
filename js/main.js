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

        const IngredientsSearch = new IngredientsSearchForm(this.recipesSubject, this.recipesList);
        await IngredientsSearch.build();

        const UstensilsSearch = new UstensilsSearchForm(this.recipesSubject, this.recipesList);
        await UstensilsSearch.build();
        
        const DevicesSearch = new DevicesSearchForm(this.recipesSubject, this.recipesList);
        await DevicesSearch.build();

        this.recipesList.forEach(recipe => {
            this.recipesWrapper.appendChild(new RecipeCard(recipe).createRecipeCard());
        })
    }
}


const app = new App();
app.run();


/* 
TODOLIST
- Gérer le problème où il n'y a pas de recettes
*/