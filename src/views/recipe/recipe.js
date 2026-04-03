import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../components/header/header.js";
import { CardDetails } from "../../components/card-details/card-details.js";

export class RecipeView extends AbstractView {
    state = {
        loading: false,
        data: null
    };
    constructor(appState) {
        super();
        this.setTitle(`Рецепт - ${this.id}`);
        this.appState = appState;
        const paramsString = window.location.search;
        const searchParams = new URLSearchParams(paramsString);
        this.id = searchParams.get('id');
        this.appState = onChange(this.appState, (path) => this.appStateHook(path));
        this.state = onChange(this.state, (path) => this.stateHook(path));
    }

    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path == 'favorites') {
            this.render();
        }
    }

    async loadData(id) {
        const response = await fetch(`https://dummyjson.com/recipes/${this.id}`);
        return response.json(); 
    }

    async stateHook(path) {
        console.log(path);
        if (path == 'loading') {
            const data = await this.loadData(this.id);
            console.log(data);
            this.state.data = data;
        }
        if (path == 'data') {
            this.state.loading = false;
            this.render();
        }
    }

    render() {
        const main = window.document.createElement('div');
        main.innerHTML = `
            <h1>Рецепт - ${this.id}</h1>
        `;
        
        if (this.state.data == null) {
            this.state.loading = true;
        }
        if (this.state.loading) {
            const loader = document.createElement('div');
            loader.innerHTML = `
                <div class="recipe__loader">Загрузка...</div>
            `;
            main.append(loader);
        } else {
            main.append(new CardDetails(this.appState, this.state.data).render());
        }
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
