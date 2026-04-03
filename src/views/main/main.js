import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0,
    };

    constructor(appState) {
        super();
        this.setTitle('Поиск рецептов');
        this.appState = appState;
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

    async loadList(q, offset) {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${q}&skip=${offset}`);
        return response.json(); 
    }

    async stateHook(path) {
        if (path == 'searchQuery') {
           this.state.loading = true;
           const data = await this.loadList(this.state.searchQuery, this.state.offset);
           this.state.loading = false;
           this.state.list = data.recipes;
        }
        if (path == 'list' || path == 'loading') {
            this.render();
        }
    }

    render() {
        const main = window.document.createElement('div');
        main.innerHTML = `
            <h1>Найдено рецептов - ${this.state.list.length}</h1>
        `;
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}
