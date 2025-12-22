import {Introduction} from "@/pages/Introduction/index.jsx";
import {Gameplay} from "@/pages/Gameplay/index.jsx";
import {Stats} from "@/pages/Stats/index.jsx";

const componentsPages = {
    start: {
        component: Introduction,
        title: 'Introduction',
        url: '/',
        id: 'start'
    },
    game: {
        component: Gameplay,
        title: 'Gameplay',
        url: '/game',
        id: 'game'
    },
    results: {
        component: Stats,
        title: 'Statistics',
        url: '/results',
        id: 'results'
    },
};

export {componentsPages};