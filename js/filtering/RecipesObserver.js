class RecipesObserver {
    constructor(defaultRecipes) {
        this.recipesWrapper = document.querySelector("main");
        this._defaultRecipes = defaultRecipes;
        this._mainSearch = '';
        this._listIngredients = [];
        this._listDevices = [];
        this._listUstensils = [];
    }

    update = (action) => {
        this.recipesWrapper.innerHTML = '';
        switch(action.type) {
            //Main search
            case 'main_search':
                this._mainSearch = action.value;
                this._defaultRecipes.filter(recipe => {
                    let hasResult = recipe._name.toLowerCase().includes(action.value.toLowerCase()) ||
                        recipe._description.toLowerCase().includes(action.value.toLowerCase()) ||
                        recipe._ingredients.filter(ingredient => {
                            return ingredient.ingredient.toLowerCase()
                                .includes(action.value.toLowerCase());
                        }).length > 0;
                    if(this._listIngredients.length > 0 && hasResult) {
                        hasResult = recipe._ingredients.filter(ingredient => this._listIngredients.includes(ingredient._ingredient)).length > 0;
                    }

                    return hasResult ? recipe : false;
                })
                .forEach(recipe => {
                    this.recipesWrapper.appendChild(new RecipeCard(recipe).createRecipeCard());
                })
                break;
            // Ingredients
            case 'ingredient_search':
                const ingredientDOM = document.getElementsByClassName('ingredients-list');
                const firstIngredient = ingredientDOM[0];
                
                for(let li of firstIngredient.children) {
                    var liContent = li.textContent;

                    if(this._mainSearch.length > 2) {
                        if(liContent.toLowerCase().includes(action.value.toLowerCase())) {
                            li.style.display = 'block';
                        } else {
                            li.style.display = 'none';
                        }
                    }
                }
                break;
            //Devices 
            case 'devices_search_add':
                break;
            //Ustensils
            case 'ustensil_search_add':
                break;
            case 'ingredient_search_remove':
                break;
            case 'devices_search_remove':
                break;
            case 'ustensil_search_remove':
                break;
        }
    }
}