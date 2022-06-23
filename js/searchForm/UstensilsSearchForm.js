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

    build = () => {
        this.wrapper.innerHTML += `
        <div id="ustensils">Ustensiles</div>
    `;

    document.getElementById('ustensils').addEventListener('click', () => {
        document.getElementById('ustensils').style.display = "none"
        const inputUstensils = document.createElement('input').classList.add('inputUstensils');
        this.wrapper.appendChild(inputUstensils)

        this.onChange();
    });

    
    }
}