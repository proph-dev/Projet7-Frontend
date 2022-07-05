class AbstractSearchForm {
    constructor(subject, defaultRecipes) {
        this.subject = subject;
        this.wrapper = document.querySelector('.filters');

        this._defaultRecipes = defaultRecipes;
    }
}