import {Introduction} from "@/pages/Introduction/index.jsx";
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
};

export {componentsPages};