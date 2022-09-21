class RecipesObserver {
    constructor(defaultRecipes) {
        this.recipesWrapper = document.querySelector("main");
        this._defaultRecipes = defaultRecipes;
        this._mainSearch = '';
        this._listIngredients = [];
        this._listDevices = [];
        this._listUstensils = [];
    }

    // Initialise les recettes selon la recherche de leurs ingrédients
    applyIngredientFilter = (initRecipe) => {
        return initRecipe.filter(recipe => {
            const ingredientRecipe = recipe._ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
            // Récupérer les ingredients en commun entre ceux des recettes et de la recherche
            function intersection(ingredientInRecipe, _listIngredients) {
                ingredientInRecipe = new Set(ingredientInRecipe);
                _listIngredients = new Set(_listIngredients);
                return [...ingredientInRecipe].filter(item => _listIngredients.has(item));
            };
            const common = intersection(ingredientRecipe, this._listIngredients);
            // Afficher les recettes ayant les ingrédient sélectionnés
            return common.length === this._listIngredients.length;
        });
    }

    // Initialise les recettes selon la recherche de leurs ustensils
    applyUstentilFilter = (initRecipe) => {
        return initRecipe.filter(recipe => {
            const ustensilRecipe = recipe._ustensils.map(ustensil => ustensil);

            // Récupérer les ingredients en commun entre ceux des recettes et de la recherche
            function intersection(ustensilInRecipe, _listUstensils) {
                ustensilInRecipe = new Set(ustensilInRecipe);
                _listUstensils = new Set(_listUstensils);
                return [...ustensilInRecipe].filter(item => _listUstensils.has(item));
            };
            const common = intersection(ustensilRecipe, this._listUstensils);
            // Afficher les recettes ayant les ingrédient sélectionnés
            return common.length === this._listUstensils.length;
        });
    }

    // Initialise les recettes selon la recherche de leurs appareils
    applyDeviceFilter = (initRecipe) => {
        return initRecipe.filter(recipe => {
            const deviceRecipe = [recipe._appliance.toLowerCase()];
            
            // Récupérer les ingredients en commun entre ceux des recettes et de la recherche
            function intersection(deviceInRecipe, _listDevices) {
                deviceInRecipe = new Set(deviceInRecipe);
                _listDevices = new Set(_listDevices);
                return [...deviceInRecipe].filter(item => _listDevices.has(item));
            };
            const common = intersection(deviceRecipe, this._listDevices);
            // Afficher les recettes ayant les ingrédient sélectionnés
            return common.length === this._listDevices.length;
        });
    }


    update = (action) => {
        const errorMsg = document.getElementById('errorMsg');

        switch(action.type) {
            // Main search
            case 'main_search':
                this.recipesWrapper.innerHTML = '';
                this._mainSearch = action.value;

                let initRecipe = this._defaultRecipes;
                if(this._mainSearch.length >= 3) {
                    initRecipe = initRecipe.filter(recipe => {
                        return this._mainSearch.length >= 3 ? recipe._name.toLowerCase().includes(action.value.toLowerCase()) ||
                        recipe._description.toLowerCase().includes(action.value.toLowerCase()) ||
                        recipe._ingredients.filter(ingredient => {
                            return ingredient.ingredient.toLowerCase()
                                .includes(action.value.toLowerCase());
                        }).length > 0 : false;
                    });
                
                    if(this._listIngredients.length > 0) {
                        initRecipe = this.applyIngredientFilter(initRecipe);
                    }
                    if(this._listUstensils.length > 0) {
                        initRecipe = this.applyUstentilFilter(initRecipe);
                    }
                    if(this._listDevices.length > 0) {
                        initRecipe = this.applyDeviceFilter(initRecipe);
                    }

                } else {
                    if(this._listIngredients.length > 0) {
                        initRecipe = initRecipe = this.applyIngredientFilter(initRecipe);
                    }
                    if(this._listUstensils.length > 0) {
                        initRecipe = initRecipe = this.applyUstentilFilter(initRecipe);
                    }
                    if(this._listDevices.length > 0) {
                        initRecipe = this.applyDeviceFilter(initRecipe);
                    }

                }
                if(initRecipe.length > 0) {
                    errorMsg.style.display = "none";
                    initRecipe.forEach(recipe => {
                        this.recipesWrapper.appendChild(new RecipeCard(recipe).createRecipeCard());
                    })
                } else {
                    errorMsg.style.display = "block";
                }
                return initRecipe;
                break;
            // Ingredients
            case 'ingredient_search':
                const ingredientDOM = document.getElementsByClassName('ingredients-list');
                const firstIngredient = ingredientDOM[0];
                
                for(let li of firstIngredient.children) {
                    var liContent = li.textContent;

                    if(liContent.toLowerCase().includes(action.value.toLowerCase())) {
                        li.style.display = 'block';
                    } else {
                        li.style.display = 'none';
                    }
                }
                break;
            //Ustensils
            case 'ustensil_search':
                const ustensilDOM = document.getElementsByClassName('ustensils-list');
                const firstUstensil = ustensilDOM[0];
                
                for(let li of firstUstensil.children) {
                    var liContent = li.textContent;

                    if(liContent.toLowerCase().includes(action.value.toLowerCase())) {
                        li.style.display = 'block';
                    } else {
                        li.style.display = 'none';
                    }
                }
                break;
            //Devices 
            case 'device_search':
                const deviceDOM = document.getElementsByClassName('devices-list');
                const firstDevice = deviceDOM[0];
                
                for(let li of firstDevice.children) {
                    var liContent = li.textContent;

                    if(liContent.toLowerCase().includes(action.value.toLowerCase())) {
                        li.style.display = 'block';
                    } else {
                        li.style.display = 'none';
                    }
                }
                break;
            case 'add_ingredient': 
                this._listIngredients.push(action.value);
                const toto = this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                );
                break;
            case 'add_ustensil': 
                this._listUstensils.push(action.value.toLowerCase());
                this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                );
                break;
            case 'add_device': 
                this._listDevices.push(action.value.toLowerCase());
                this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                );
                break;
            case 'remove_ingredient':
                const indexOfIngredient = this._listIngredients.findIndex(element => element.toLowerCase() === action.value.toLowerCase());
                this._listIngredients.splice(indexOfIngredient, 1);
                this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                )
                break;
            case 'remove_ustensil':
                const indexOfUstensil = this._listUstensils.findIndex(element => element.toLowerCase() === action.value.toLowerCase());
                this._listUstensils.splice(indexOfUstensil, 1);
                this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                )
                break;
            case 'remove_device':
                const indexOfDevices = this._listDevices.findIndex(element => element.toLowerCase() === action.value.toLowerCase());
                this._listDevices.splice(indexOfDevices, 1);
                this.update(
                    {
                        'type': 'main_search',
                        value : this._mainSearch
                    }
                )
                break;
        }
    }
}