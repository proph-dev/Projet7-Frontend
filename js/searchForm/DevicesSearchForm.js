class DevicesSearchForm extends AbstractSearchForm {
    recipeFiltered;
    choiceDevices = [];

    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'device_search',
                        value
                    }
                )
        });
    }

    addToListDevices = async (value) => {
        this.subject.fire(
            {
                'type': 'add_device',
                value
            }
        )
        this.choiceDevices.push(value.toLowerCase());
        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            if(this.choiceDevices.includes(recipe._appliance.toLowerCase())) {
                countValid++;
            }

            return countValid === this.choiceDevices.length;
            }
        )
        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    }

    removeToListDevices = async (value) => {
        this.subject.fire(
            {
                'type': 'remove_device',
                value
            }
        )
        const index = this.choiceDevices.indexOf(value.toLowerCase());
        this.choiceDevices.splice(index, 1);

        this.recipeFiltered = this._defaultRecipes.filter(recipe => {
            let countValid = 0;

            if(this.choiceDevices.includes(recipe._appliance.toLowerCase())) {
                countValid++;
            }

            return countValid === this.choiceDevices.length;
        })

        this.build(this.recipeFiltered, false);
        this.buildAutoComplete();
    } 

    buildAutoComplete = async () => {
        //const devicesList = document.querySelector('.devices-list');
        const deviceLis = document.querySelectorAll('.devices-list li');
        console.log(deviceLis)

        deviceLis.forEach(li => li.remove())

        /*const deviceArray = [];
        this.recipeFiltered.forEach(recipe => {
            if(!deviceArray.includes(recipe._appliance) && !this.choiceDevices.includes(recipe._appliance.toLowerCase())) {
                deviceArray.push(recipe._appliance);

            }
        });

        deviceArray.forEach(appliance => {
            const deviceLi = document.createElement('li');
            deviceLi.classList.add('tagDevice');
            deviceLi.textContent = appliance;
            devicesList.appendChild(deviceLi);
        });*/
    }

    // Croix permettant de fermer le menu des tags
    closeUl = async () => {
        document.addEventListener('click', (e) => {
            const element = e.target;
            if(element.classList.contains("device-close-ul")) {
                const devicesList = document.querySelector('.devices-list');
                const inputDevices = document.querySelector('.inputDevices');
                const deviceSpan = document.querySelector('#devicesSpan');

                devicesList.remove();
                inputDevices.remove();
                deviceSpan.style.display = "block";
                element.remove();

                const divDevice = document.getElementById('devices');
                divDevice.style.width = '170px';
            }
        });
    }

    build = async (needRemove = null, isAdd = true) => {
        let devicesDiv = document.querySelector('#devices');
        let deviceSpan = document.querySelector('#devicesSpan');

        if(devicesDiv === null) {
            devicesDiv = document.createElement('div');
            deviceSpan = document.createElement('span');
            devicesDiv.id = "devices";
            deviceSpan.id = "devicesSpan";
            devicesDiv.appendChild(deviceSpan);
            deviceSpan.innerText = 'Appareils';
        }
        
        this.closeUl();
        
        devicesDiv.addEventListener('click', () => {
            deviceSpan.style.display = "none";

            const inputDevices = document.createElement('input');
            inputDevices.placeholder = "Rechercher un appareil";

            if(!devicesDiv.querySelector('input')) {
                inputDevices.classList.add('inputDevices');
                devicesDiv.appendChild(inputDevices);

                const divIngredient = document.getElementById('devices');
                divIngredient.style.width = '700px';

                this.onChange();
            }

            // initialise la liste des appareils par rapport aux recettes
            this._listDevices = [];
            const devicesAllList = this.recipeFiltered && this.recipeFiltered.length > 0 ? this.recipeFiltered.map(recipe => recipe._appliance.toLowerCase()) : this._defaultRecipes.map(recipe => recipe._appliance.toLowerCase());
            const devicesSet = new Set();

            // récupère chaque nom d'appareils
            for (let devicesList of devicesAllList) {
                for(let deviceName of devicesList) {
                    if(!this.choiceDevices.includes(deviceName.toLowerCase())) {
                        devicesSet.add(devicesList);
                    }
                }
            }

            // boucle qui supprime le ul s'il existe déjà
            const deviceDOM = document.getElementsByClassName('devices-list');
            for (let devicesList of deviceDOM) {
                devicesList.remove()
            }            
            
            // Création du ul qui liste les appareils
            const devicesList = document.createElement('ul');
            devicesList.classList.add('devices-list');
            devicesDiv.appendChild(devicesList);

            //Ajout d'une croix permettant de femer le ul
            if(!document.querySelector('.device-close-ul')) {
                const closeUl = document.createElement('span');
                closeUl.classList.add('device-close-ul', 'close-ul');
                closeUl.textContent = "x";

                devicesDiv.appendChild(closeUl);
            }

            for (let deviceName of devicesSet) {
                // Je crée un élément li qui sera l'appeil (il génère la sélection des filtres possibles)
                const deviceLi = document.createElement('li');
                deviceLi.classList.add('tagDevice');
                // Lui donne son nom
                deviceLi.textContent = deviceName;
                devicesList.appendChild(deviceLi);

                // Crée le tag de l'appareil sélectionné
                deviceLi.addEventListener('click', () => {
                    const liDevice = document.createElement('li');
                    liDevice.classList.add('deviceTag');

                    liDevice.textContent = deviceName;
                    this.tags.appendChild(liDevice);
                    this.addToListDevices(deviceName)

                    // Supprimer le tag de l'appareil des filtres
                    liDevice.addEventListener('click', () => {
                        liDevice.remove();
                        deviceSpan.style.display = "block";
                        this.removeToListDevices(deviceName);
                    })
                })
            }
            
        })
        if(needRemove === null) {
            this.wrapper.appendChild(devicesDiv);
        }
    }
}