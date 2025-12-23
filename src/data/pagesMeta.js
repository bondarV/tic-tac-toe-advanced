import {Introduction} from "@/pages/Introduction/index.jsx";
import {Stats} from "@/pages/Stats/index.jsx";
import {Gameplay} from "@/pages/Gameplay/index.jsx";

const componentsPages = {
    start: {
        component: Introduction,
        title: 'Головна',
        url: '/',
        id: 'start'
    },
    game: {
        component: Gameplay,
        title: 'Гра',
        url: '/game',
        id: 'game',
        hidden: true
    },
    results: {
        component: Stats,
        title: 'Статистика',
        url: '/results',
        id: 'results'
    },
};

export {componentsPages};