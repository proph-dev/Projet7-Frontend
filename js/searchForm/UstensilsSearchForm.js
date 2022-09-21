class UstensilsSearchForm extends AbstractSearchForm {
    recipeFiltered;
    choiceUstensils = [];

    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'ustensil_search',
                        value
                    }
                )
        });
    }

    addToListUstensils = async (value) => {
        this.subject.fire(
            {
                'type': 'add_ustensil',
                value
            }
        )
        this.choiceUstensils.push(value.toLowerCase());
        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            recipe._ustensils.forEach(ustensil => {
                if(this.choiceUstensils.includes(ustensil.toLowerCase())) {
                    countValid++;
                }
            });

            return countValid === this.choiceUstensils.length;
        })

        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    }

    removeToListUstensils = async (value) => {
        this.subject.fire(
            {
                'type': 'remove_ustensil',
                value
            }
        )
        const index = this.choiceUstensils.indexOf(value.toLowerCase());
        this.choiceUstensils.splice(index, 1);

        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            recipe._ustensils.forEach(ustensil => {
                if(this.choiceUstensils.includes(ustensil.toLowerCase())) {
                    countValid++;
                }
            });

            return countValid === this.choiceUstensils.length;
        })

        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    }
    
    buildAutoComplete = async () => {
        const ustensilsList = document.querySelector('.ustensils-list');
        const ustensilLis = document.querySelectorAll('.ustensils-list li');

        ustensilLis.forEach(li => li.remove())

        const ustensilArray = [];
        this.recipeFiltered.forEach(recipe => {
            recipe._ustensils.forEach(ustensil => {
                if(!ustensilArray.includes(ustensil) && !this.choiceUstensils.includes(ustensil.toLowerCase())) {
                    ustensilArray.push(ustensil);
                }
            });
        });

        ustensilArray.forEach(ustensil => {
            const ustensilLi = document.createElement('li');
            ustensilLi.classList.add('tagUstensil');
            ustensilLi.textContent = ustensil;
            ustensilsList.appendChild(ustensilLi);
        });
    }

    // Croix permettant de fermer le menu des tags
    closeUl = async () => {
        document.addEventListener('click', (e) => {
            const element = e.target;
            if(element.classList.contains("ustensil-close-ul")) {
                const ustensilsList = document.querySelector('.ustensils-list');
                const inputUstensils = document.querySelector('.inputUstensils');
                const ustensilSpan = document.querySelector('#ustensilSpan');

                ustensilsList.remove();
                inputUstensils.remove();
                ustensilSpan.style.display = "block";
                element.remove();

                const divUstensil = document.getElementById('ustensils');
                divUstensil.style.width = '170px';
            }
        });
    }

    build = async (needRemove = null, isAdd = true) => {
        let ustensilsDiv = document.querySelector('#ustensils');
        let ustensilSpan = document.querySelector('#ustensilSpan');

        if(ustensilsDiv === null) {
            ustensilsDiv = document.createElement('div');
            ustensilSpan = document.createElement('span');
            ustensilsDiv.id = "ustensils";
            ustensilSpan.id = "ustensilSpan";
            ustensilsDiv.appendChild(ustensilSpan);
            ustensilSpan.innerText = "Ustensils"
        }

        this.closeUl();
        
        ustensilsDiv.addEventListener('click', () => {
            ustensilSpan.style.display = "none";

            const inputUstensils = document.createElement('input');
            inputUstensils.placeholder = "Rechercher un ustensil";

            if(!ustensilsDiv.querySelector('input')) {
                inputUstensils.classList.add('inputUstensils');
                ustensilsDiv.appendChild(inputUstensils);

                const divUstensil = document.getElementById('ustensils');
                divUstensil.style.width = '700px';

                this.onChange();
            }

            // initialise la liste des ustensils par rapport aux recettes
            this._listUstensils = [];
            const recipesList = this.recipeFiltered && this.recipeFiltered.length > 0 ? this.recipeFiltered.map(recipe => recipe._ustensils) : this._defaultRecipes.map(recipe => recipe._ustensils);
            const ustensil = recipesList.map(listUstensils => listUstensils.map(ustensil => ustensil.toLowerCase()))
            const ustensilSet = new Set();

            // récupère chaque nom d'ustensils
            for (let UstensilsList of ustensil) {
                for(let ustensilName of UstensilsList) {
                    if(!this.choiceUstensils.includes(ustensilName.toLowerCase())) {
                        ustensilSet.add(ustensilName);
                    }
                }
            }

            // boucle qui supprime le ul s'il existe déjà
            const ustensilDOM = document.getElementsByClassName('ustensils-list');
            for (let UstensilsList of ustensilDOM) {
                UstensilsList.remove()
            }            

            // Création du ul qui liste les ustensils
            const UstensilsList = document.createElement('ul');
            UstensilsList.classList.add('ustensils-list');
            ustensilsDiv.appendChild(UstensilsList);


            //Ajout d'une croix permettant de femer le ul
            if(!document.querySelector('.ustensil-close-ul')) {
                const closeUl = document.createElement('span');
                closeUl.classList.add('ustensil-close-ul', 'close-ul');
                closeUl.textContent = "x";

                ustensilsDiv.appendChild(closeUl);
            }

            for (let ustensilName of ustensilSet) {
                // Je crée un élément li qui sera l'ingrédient (il génère la sélection des filtres possibles)
                const ustensilLi = document.createElement('li');
                ustensilLi.classList.add('tagUstensil');
                // Lui donne son nom
                ustensilLi.textContent = ustensilName;
                UstensilsList.appendChild(ustensilLi);

                // Crée le tag de l'ingrédient sélectionné
                ustensilLi.addEventListener('click', () => {
                    const liUstensil = document.createElement('li');
                    liUstensil.classList.add('ustensilTag');

                    liUstensil.textContent = ustensilName;
                    this.tags.appendChild(liUstensil);
                    this.addToListUstensils(ustensilName)

                    // Supprimer le tag l'ingrédient des filtres
                    liUstensil.addEventListener('click', () => {
                        liUstensil.remove();
                        ustensilSpan.style.display = "block";
                        this.removeToListUstensils(ustensilName);
                    })
                })
            }
        })
        if(needRemove === null) {
            this.wrapper.appendChild(ustensilsDiv);
        }
    }
}