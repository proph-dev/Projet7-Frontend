class DevicesSearchForm extends AbstractSearchForm {
    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'devices_search_add',
                        value
                    }
                )
        });
    }

    build = async () => {
        const devicesDiv = document.createElement('div');
        devicesDiv.id = "devices";
        devicesDiv.innerText = 'Appareils';
        
        devicesDiv.addEventListener('click', () => {
            devicesDiv.style.display = "none"
            const inputDevices = inputDevices.createElement('input').classList.add('inputDevices');
            devicesDiv.appendChild(inputIngredients)
    
            this.onChange();
        })
        this.wrapper.appendChild(devicesDiv);
    }
}