import { FavoritesView } from "./views/favorites/favorites.js";
import { MainView } from "./views/main/main.js";
import { RecipeView } from "./views/recipe/recipe.js";

class App {
    routes = [
        { path: '', view: MainView },
        { path: '#favorites', view: FavoritesView },
        { path: '#recipe', view: RecipeView },
    ];
    appState = {
        favorites: [],
    };
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
    }
    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(r => r.path == window.location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render();
    }
}

new App();

