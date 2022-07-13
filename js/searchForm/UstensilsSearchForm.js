class UstensilsSearchForm extends AbstractSearchForm {
    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'ustensil_search_add',
                        value
                    }
                )
        });
    }

    build = async () => {
        const ustensilsDiv = document.createElement('div');
        ustensilsDiv.id = "ustensils";
        ustensilsDiv.innerText = 'Ustentiles';
        
        ustensilsDiv.addEventListener('click', () => {
            ustensilsDiv.style.display = "none"
            const inputUstensils = inputUstensils.createElement('input').classList.add('inputUstensils');
            ustensilsDiv.appendChild(inputUstensils)
    
            this.onChange();
        })
        this.wrapper.appendChild(ustensilsDiv);
    }
}