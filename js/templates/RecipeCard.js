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
        let divClock = document.createElement('div');
        divClock.classList.add('divClock');
        let cardClock = document.createElement('span');
        cardClock.classList.add('clock');
        let cardClockImg = document.createComment('img');

        let cardList = document.createElement('div');
        cardList.classList.add('cardList')
        let cardUl = document.createElement('ul');
        let cardLi = document.createElement('li');
        let cardExplication = document.createElement('p');

        
        // appendChilds
        this.$wrapper.appendChild(cardTop);
        this.$wrapper.appendChild(cardContent);
        cardContent.appendChild(cardInfos);
        cardContent.appendChild(cardList);

        cardInfos.appendChild(cardTitle);
        cardInfos.appendChild(divClock);
        divClock.appendChild(cardClockImg);
        divClock.appendChild(cardClock);

        cardList.appendChild(cardUl);
        cardUl.appendChild(cardLi);
        cardList.appendChild(cardExplication);


        // Content
        cardTitle.textContent = this.recipeData.name;
        cardClock.textContent = this.recipeData.time + " min";
        cardClockImg.src = "~/img/icons/clock.svg";
        cardClockImg.alt = "Horloge";

        cardExplication.textContent = this.recipeData.description;
        return this.$wrapper;
    }

}