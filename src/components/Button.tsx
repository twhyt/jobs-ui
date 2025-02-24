import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonGroupProps } from 'antd/es/button';

interface ButtonProps extends ButtonGroupProps {
  label: string;
  type?: 'primary' | 'default' | 'dashed';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, type = 'primary', onClick }) => {
  return <AntButton type={type} onClick={onClick}>{label}</AntButton>;
};

export default Button;