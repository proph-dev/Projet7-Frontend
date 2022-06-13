let recipeData = "";
class RecipeCard {
    constructor(recipe) {
        this.recipeData = recipe;

        this.$wrapper = document.createElement('article');
    }

    get recipe() {
        return this.recipeData;
    }

    createRecipeCard() {
        // cardTop
        let cardTop = document.createElement("div");
        cardTop.classList.add('top');

        // cardContent
        let cardContent = document.createElement("div");
        cardContent.classList.add('content');

        // cardContent content
        let cardInfos = document.createElement('div');
        let cardTitle = document.createElement('h2');
        let cardClock = document.createElement('span');
        cardClock.classList.add('clock');
        let cardClockImg = document.createComment('img');

        let cardList = document.createElement('div');
        let cardUl = document.createElement('ul');
        let cardLi = document.createElement('li');
        let cardExplication = document.createElement('p');

        
        // appendChilds
        this.$wrapper.appendChild(cardTop);
        this.$wrapper.appendChild(cardContent);
        cardContent.appendChild(cardInfos);
        cardContent.appendChild(cardList);

        cardInfos.appendChild(cardTitle);
        cardInfos.appendChild(cardClock);
        cardClock.appendChild(cardClockImg);

        cardList.appendChild(cardUl);
        cardList.appendChild(cardLi);
        cardList.appendChild(cardExplication);


        // Content
        cardTitle.textContent = this.recipeData.name;
        cardClock.textContent = this.recipeData.time, "min";
        cardClockImg.src = "~/img/icons/clock.svg";
        cardClockImg.alt = "Horloge";

        cardExplication.textContent = this.recipeData.description;

        return this.$wrapper;
    }

}