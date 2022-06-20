class RecipesSubject {
    constructor() {
        this.observers  = [];
    }

    subscribe = (observer) => {
        this.observers.push(observer);
    }

    fire = (action) => {
        this.observers.forEach(observer => observer.update(action));
    }
}