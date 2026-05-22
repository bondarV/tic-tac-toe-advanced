import {Button} from './Button.jsx';

export default {
    title: 'Components/UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'danger'],
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
        },
        disabled: {control: 'boolean'},
    },
};

export const Primary = {
    args: {
        label: 'Primary button',
        variant: 'primary',
    },
};

export const Secondary = {
    args: {
        label: 'Secondary button',
        variant: 'secondary',
    },
};

export const Ghost = {
    args: {
        label: 'Ghost button',
        variant: 'ghost',
    },
};

export const Danger = {
    args: {
        label: 'Danger button',
        variant: 'danger',
    },
};

export const Disabled = {
    args: {
        label: 'Disabled button',
        variant: 'primary',
        disabled: true,
    },
};


