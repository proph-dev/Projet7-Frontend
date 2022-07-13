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
        let cardExplication = document.createElement('div');
        cardExplication.classList.add('paragraph');

        
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
        cardList.appendChild(cardExplication);


        // Content
        cardTitle.textContent = this.recipeData.name;
        cardClock.textContent = this.recipeData.time + " min";
        cardClockImg.src = "~/img/icons/clock.svg";
        cardClockImg.alt = "Horloge";


        for(let i = 0; i < this.recipeData.ingredients.length; i++) {
            let cardLi = document.createElement('li');
            const ingredientsInfo = this.recipeData.ingredients[i];

            cardLi.innerHTML = `
            <p class="ingredientsName">
                ${ingredientsInfo.ingredient}:
                <span>${ingredientsInfo.quantity}${ingredientsInfo.unit ? ingredientsInfo.unit : ""}</span>
            </p>
            `;
            cardUl.appendChild(cardLi);
        }

        if(this.recipeData.description.length > 200) {
            cardExplication.textContent = this.recipeData.description.substring(0,200) + "...";
        } else {
            cardExplication.textContent = this.recipeData.description;
        }
        
        
        return this.$wrapper;
    }

}