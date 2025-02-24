import React from 'react';

interface ButtonProps {
    label: string;
    type?: 'primary' | 'default' | 'dashed';
    onClick?: () => void;
}
declare const Button: React.FC<ButtonProps>;

export { Button };
