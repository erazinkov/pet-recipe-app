import { DivComponent } from "../../common/div-component.js";

import "./card.css"

export class Card extends DivComponent {
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
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(b => b.id == this.cardState.id);
        this.el.innerHTML = `
            <div class="card__image">
                <img src="${this.cardState.image}" alt="Изображение" />
            </div>
            <div class="card__info">
                <div class="card__name">
                    <a class="card__name_recipe" href="?id=${this.cardState.id}#recipe">
                        ${this.cardState.name}
                    </a>
                </div>
                <div class="card__tag">
                    ${this.cardState.tags ? this.cardState.tags[0] : "-"}
                </div>
                <div class="card__footer">
                     <button class="button__add">
                        <img src="${existInFavorites ? '/static/favorites_filled.svg' : '/static/favorites.svg'}" alt="Избранное иконка" />
                     </button>
                </div>
            </div>
        `;
        if (existInFavorites) {
            this.el.querySelector('.button__add').addEventListener('click', this.#deleteFromFavorites.bind(this));
        } else {
            this.el.querySelector('.button__add').addEventListener('click', this.#addToFavorites.bind(this));
        }
        return this.el;
    }
}