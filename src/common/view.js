export class AbstractView {
    constructor() {
        this.app = window.document.getElementById('root');
    }    
    setTitle(title) {
        window.document.title = title;
    }
    render() {
        return;
    }
    destroy() {
        return;
    }
}