class IngredientsSearchForm extends AbstractSearchForm {
    recipeFiltered;
    choiceIngredients = [];

    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'ingredient_search',
                        value
                    }
                )
        });
    }

    addToListIngredients = async (value) => {
        this.subject.fire(
            {
                'type': 'add_ingredient',
                value
            }
        )
        this.choiceIngredients.push(value.toLowerCase());
        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            recipe._ingredients.forEach(ingredient => {
                if(this.choiceIngredients.includes(ingredient.ingredient.toLowerCase())) {
                    countValid++;
                }
            });

            return countValid === this.choiceIngredients.length;
            }
        )
        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    }

    removeToListIngredient = async (value) => {
        this.subject.fire(
            {
                'type': 'remove_ingredient',
                value
            }
        )
        const index = this.choiceIngredients.indexOf(value.toLowerCase());
        this.choiceIngredients.splice(index, 1);
        
        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            recipe._ingredients.forEach(ingredient => {
                if(this.choiceIngredients.includes(ingredient.ingredient.toLowerCase())) {
                    countValid++;
                }
            });

            return countValid === this.choiceIngredients.length;
            }
        )
        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    }

    buildAutoComplete = async () => {
        const ingredientsList = document.querySelector('.ingredients-list');
        const ingredientLis = document.querySelectorAll('.ingredients-list li');

        ingredientLis.forEach(li => li.remove())

        const ingredientArray = [];
        this.recipeFiltered.forEach(recipe => {
            recipe._ingredients.forEach(ingredient => {
                if(!ingredientArray.includes(ingredient.ingredient) && !this.choiceIngredients.includes(ingredient.ingredient.toLowerCase())) {
                    ingredientArray.push(ingredient.ingredient);
                }
            });
        });

        ingredientArray.forEach(ingredient => {
            const ingredientLi = document.createElement('li');
            ingredientLi.classList.add('tagIngredient');
            ingredientLi.textContent = ingredient;
            ingredientsList.appendChild(ingredientLi);
        });
    }

    // Croix permettant de fermer le menu des tags
    closeUl = async () => {
        document.addEventListener('click', (e) => {
            const element = e.target;
            if(element.classList.contains("ingredient-close-ul")) {
                const ingredientsList = document.querySelector('.ingredients-list');
                const inputIngredients = document.querySelector('.inputIngredients');
                const ingredientSpan = document.querySelector('#ingredientSpan');

                ingredientsList.remove();
                inputIngredients.remove();
                ingredientSpan.style.display = "block";
                element.remove();

                const divIngredient = document.getElementById('ingredients');
                divIngredient.style.width = '170px';
            }
        });
    }

    build = async (needRemove = null, isAdd = true) => {
        let ingredientsDiv = document.querySelector('#ingredients');
        let ingredientSpan = document.querySelector('#ingredientSpan');

        if(ingredientsDiv === null) {
            ingredientsDiv = document.createElement('div');
            ingredientSpan = document.createElement('span');
            ingredientsDiv.id = "ingredients";
            ingredientSpan.id = "ingredientSpan";
            ingredientsDiv.appendChild(ingredientSpan);
            ingredientSpan.innerText = 'Ingrédients';
        }

        this.closeUl();

        ingredientsDiv.addEventListener('click', () => {
            ingredientSpan.style.display = "none";

            const inputIngredients = document.createElement('input');
            inputIngredients.placeholder = "Rechercher un ingrédient";

            if(!ingredientsDiv.querySelector('input')) {
                inputIngredients.classList.add('inputIngredients');
                ingredientsDiv.appendChild(inputIngredients);
                
                const divIngredient = document.getElementById('ingredients');
                divIngredient.style.width = '700px';

                this.onChange();
            }

            // initialise la liste des ingrédients par rapport aux recettes
            this._listIngredients = [];
            const recipesList = this.recipeFiltered && this.recipeFiltered.length > 0 ? this.recipeFiltered.map(recipe => recipe._ingredients) : this._defaultRecipes.map(recipe => recipe._ingredients);
            const ingredient = recipesList.map(listIngredients => listIngredients.map(ingredient => ingredient.ingredient))
            const ingredientsSet = new Set();

            // récupère chaque nom d'ingrédient
            for (let ingredientsList of ingredient) {
                for(let ingredientName of ingredientsList) {
                    if(!this.choiceIngredients.includes(ingredientName.toLowerCase())) {
                        ingredientsSet.add(ingredientName.toLowerCase());
                    }
                }
            }

            // boucle qui supprime le ul s'il existe déjà
            const ingredientDOM = document.getElementsByClassName('ingredients-list');
            for (let ingredientsList of ingredientDOM) {
                ingredientsList.remove()
            }

            // Création du ul qui liste les ingrédients
            const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('ingredients-list');
            ingredientsDiv.appendChild(ingredientsList);


            //Ajout d'une croix permettant de femer le ul
            if(!document.querySelector('.ingredient-close-ul')) {
                const closeUl = document.createElement('span');
                closeUl.classList.add('ingredient-close-ul', 'close-ul');
                closeUl.textContent = "x";

                ingredientsDiv.appendChild(closeUl);
            }
            
            for (let ingredientName of ingredientsSet) {
                // Je crée un élément li qui sera l'ingrédient (il génère la sélection des filtres possibles)
                const ingredientLi = document.createElement('li');
                ingredientLi.classList.add('tagIngredient');
                // Lui donne son nom
                ingredientLi.textContent = ingredientName;
                ingredientsList.appendChild(ingredientLi);
                
                // Crée le tag de l'ingrédient sélectionné
                ingredientLi.addEventListener('click', () => {
                    const liIngredient = document.createElement('li');
                    liIngredient.classList.add('ingredientTag');

                    liIngredient.textContent = ingredientName;
                    this.tags.appendChild(liIngredient);
                    this.addToListIngredients(ingredientName)
                    
                    // Supprimer le tag de l'ingrédient des filtres
                    liIngredient.addEventListener('click', () => {
                        liIngredient.remove();
                        ingredientSpan.style.display = "block";
                        this.removeToListIngredient(ingredientName);
                    })
                })
            }
        })
        if(needRemove === null) {
            this.wrapper.appendChild(ingredientsDiv);
        }
    }
}