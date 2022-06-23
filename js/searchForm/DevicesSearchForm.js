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

    build = () => {
        this.wrapper.innerHTML += `
        <div id="devices">Appareils</div>
    `;

    document.getElementById('devices').addEventListener('click', () => {
        document.getElementById('devices').style.display = "none"
        const inputDevices = document.createElement('input').classList.add('inputDevices');
        this.wrapper.appendChild(inputDevices)

        this.onChange();
    });
    }
}