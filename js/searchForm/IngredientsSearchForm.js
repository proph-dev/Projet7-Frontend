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

    build = () => {
        this.wrapper.innerHTML = `
        <div id="ingredients">Ingrédients</div>
    `;

    document.getElementById('ingredients').addEventListener('click', () => {
        document.getElementById('ingredients').remove();
        let inputIngredient = document.createElement('input');
        inputIngredient.classList.add('inputIngredient');
    });

    this.onChange();
    }
}