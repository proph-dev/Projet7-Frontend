class IngredientsSearchForm extends AbstractSearchForm {
    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'ingredient_search_add',
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
        })
        this.wrapper.appendChild(ingredientsDiv);
    }
}