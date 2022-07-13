class AbstractSearchForm {
    constructor(subject, defaultRecipes) {
        this.subject = subject;
        this.wrapper = document.querySelector('.filters');
        this.tags = document.querySelector('.tags');

        this._defaultRecipes = defaultRecipes;
    }
}