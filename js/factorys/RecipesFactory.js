class RecipeFactory {
    constructor(data) {
        this.data = data;
    }
    createRecipeModel() {
        return new Recipe(this.data);
    }
}