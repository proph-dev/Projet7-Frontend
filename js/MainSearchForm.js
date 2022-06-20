class MainSearchForm {
    constructor(subject) {
        this.subject = subject;
        this.wrapper = document.querySelector('.search-bar');
    }

    onChange = () => {
        this.wrapper.querySelector('input').addEventListener('keyup', (e) => {
            const value = e.target.value;
                this.subject.fire(
                    {
                        'type': 'main_search',
                        value
                    }
                )
        });
    }

    build = () => {
        this.wrapper.innerHTML = `
            <form>
                <input type="text" placeholder="Rechercher une recette" name="search" id="search">
                <button id="search-submit">
                    <img src="./img/icons/search.svg" alt="Rechercher une recette">
                </button>
            </form>
        `;
        this.onChange();
    }
}