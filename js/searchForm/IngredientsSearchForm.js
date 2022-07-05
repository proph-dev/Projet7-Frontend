class IngredientsSearchForm extends AbstractSearchForm {
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

    build = async () => {
        const ingredientsDiv = document.createElement('div');
        const ingredientSpan = document.createElement('span');
        ingredientsDiv.appendChild(ingredientSpan);
        ingredientsDiv.id = "ingredients";
        ingredientSpan.innerText = 'Ingrédients';
        
        ingredientsDiv.addEventListener('click', () => {
            ingredientSpan.style.display = "none"
            const inputIngredients = document.createElement('input');
            inputIngredients.placeholder = "Rechercher un ingrédient"

            if(!ingredientsDiv.querySelector('input')) {
                inputIngredients.classList.add('inputIngredients');
                ingredientsDiv.appendChild(inputIngredients)

                this.onChange();
            }

            // initialise la liste des ingrédients par rapport aux recettes
            this._listIngredients = [];
            const recipesList = this._defaultRecipes.map(recipe => recipe._ingredients);
            const ingredient = recipesList.map(listIngredients => listIngredients.map(ingredient => ingredient.ingredient))

            const ingredientsSet = new Set();

            // récupère chaque nom d'ingrédient
            for (let ingredientsList of ingredient) {
                for(let ingredientName of ingredientsList) {
                    ingredientsSet.add(ingredientName);
                }
            }

            // condition qui supprime le ul s'il existe déjà
            const ingredientDOM = document.getElementsByClassName('ingredients-list');

            for (let ingredientsList of ingredientDOM) {
                ingredientsList.remove()
            }            
            

            const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('ingredients-list');

            ingredientsDiv.appendChild(ingredientsList);

            for (let ingredientName of ingredientsSet) {
                const ingredientLi = document.createElement('li');
                ingredientsList.appendChild(ingredientLi);

                ingredientLi.textContent = ingredientName;
            }
            
        })
        this.wrapper.appendChild(ingredientsDiv);

    }
}