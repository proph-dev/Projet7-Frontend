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
        ingredientsDiv.id = "ingredients";
        ingredientsDiv.innerText = 'Ingrédients';
        
        ingredientsDiv.addEventListener('click', () => {
            ingredientsDiv.style.display = "none"
            const inputIngredients = document.createElement('input').classList.add('inputIngredients');
            ingredientsDiv.appendChild(inputIngredients)
    
            this.onChange();
        })
        this.wrapper.appendChild(ingredientsDiv);
    }
}