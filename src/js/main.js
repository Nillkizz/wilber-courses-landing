import LazyLoad from 'vanilla-lazyload';
import index from './pages/index.js'

document.addEventListener('DOMContentLoaded', () => {
    switch (window.location.pathname) {
        case '/':
            index();
            break;
    }
    window.lazyContent = new LazyLoad(document.getElementsByTagName('IMG'));
})
