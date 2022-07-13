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

        const UstensilsSearch = new UstensilsSearchForm(this.recipesSubject);
        await UstensilsSearch.build();
        
        const DevicesSearch = new DevicesSearchForm(this.recipesSubject);
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
- Autocomplete les ingrédients par rapport aux recettes affichées
- Corriger le fait que quand on écrit dans la recherche de tags les recettes disparaissent
- Les tags actualisent pas dynamiquement les recettes quand on les ajoute, à corriger
- Faire en sorte que le tag de filtre avancé se supprime une fois sélectionné
*/