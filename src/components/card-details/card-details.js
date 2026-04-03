import { DivComponent } from "../../common/div-component.js";

import "./card-details.css"

export class CardDetails extends DivComponent {
    constructor(appState, cardState) {
        super();
        this.appState = appState;
        this.cardState = cardState;
    }

    #deleteFromFavorites() {
        this.appState.favorites = this.appState.favorites.filter(b => b.id !== this.cardState.id);
    }

    #addToFavorites() {
        this.appState.favorites.push(this.cardState);
    }

    render() {
        this.el.classList.add('card-details');
        const existInFavorites = this.appState.favorites.find(b => b.id == this.cardState.id);
        this.el.innerHTML = `
            <h2 class="card-details__name">
                ${this.cardState.name}
            </h2>
            <div class="card-details__info">
                <div class="card-details__image">
                    <img src="${this.cardState.image}" alt="Изображение" />
                </div>
                <div class="card-details__right">
                    <div class="card-details__row">
                        Сложность:&nbsp<span>${this.cardState.difficulty}</span>
                    </div>
                    <div class="card-details__row">
                        Кухня:&nbsp<span>${this.cardState.cuisine}</span>
                    </div>
                    <div class="card-details__row">
                        Рейтинг:&nbsp<span>${this.cardState.rating}</span>
                    </div>
                    <div class="card-details__footer">
                        <button class="button__add">
                            <img src="${existInFavorites ? '/static/favorites_filled.svg' : '/static/favorites.svg'}" alt="Избранное иконка" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-details__instruction">
                Инструкция
            </div>
        `;
        const instructionsList = document.createElement('ol');
        this.cardState.instructions.forEach(i => {
            const el = document.createElement('li');
            el.innerHTML = `${i}`;
            instructionsList.append(el);
        });
        this.el.querySelector('.card-details__instruction').append(instructionsList);

        if (existInFavorites) {
            this.el.querySelector('.button__add').addEventListener('click', this.#deleteFromFavorites.bind(this));
        } else {
            this.el.querySelector('.button__add').addEventListener('click', this.#addToFavorites.bind(this));
        }
        return this.el;
    }
}