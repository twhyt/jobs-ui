import { Button as AntButton } from "antd"
import { ButtonProps } from "antd/es/button/button"
import styled from "styled-components"

export default function BaseButton({
    children,
    ...rest
}:ButtonProps){
    return (
        <Button {...rest}>
            {children}
        </Button>
    )
}

const Button = styled(AntButton)`
    background-color: #1A34FF;
    border-radius: 32px;
    padding: 4px 15px;
    border-color: #1A34FF;

    font-size: 16px;
    color: #FFFFFF;

    &:disabled {
        border-color: var(--gray-5);
        background-color: var(--gray-3);
        color: var(--black-25);
    }

    &.ant-btn-default:hover, &.ant-btn-default:focus {
        &:not(.ant-btn-disabled) {
            background-color: #4099FF;
            color: #FFFFFF;
            border-color: #4099FF;
        }
        &:disabled, &.ant-btn-disabled {
            border-color: #D9D9D9;
            background-color: #F5F5F5;
            color: #D9D9D9;
        }
    }

    &.ant-btn-default:active {
        &:not(.ant-btn-disabled) {
            background-color: #0947D9;
            color: #FFFFFF;
            border-color: #0947D9;
        }
        &:disabled, &.ant-btn-disabled {
            background-color: #D9D9D9;
        }
    }
`