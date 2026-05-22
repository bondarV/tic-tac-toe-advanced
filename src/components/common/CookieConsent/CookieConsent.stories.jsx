import CookieConsent from './CookieConsent.jsx';

const STORAGE_KEY = 'cookieConsent';

function ensureModalRoot() {
    if (typeof document === 'undefined') {
        return;
    }

    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
    }
}

function resetConsent() {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
}

resetConsent();
ensureModalRoot();

export default {
    title: 'Components/Common/CookieConsent',
    component: CookieConsent,
    parameters: {
        layout: 'fullscreen',
    },
};

export const Banner = {};

export const OpenPreferences = {
    play: async ({canvasElement}) => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        const configureButton = Array.from(canvasElement.querySelectorAll('button')).find((button) =>
            button.textContent?.includes('Налаштувати'),
        );

        configureButton?.click();
    },
};

