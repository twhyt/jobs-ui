import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
// import ChevronRightIcon from "@/assets/icons/chevron-right";

export interface MenuHorizonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    icon: ReactNode
    description?: string
    disabled?:boolean
    onClick?: () => void
}

const MenuHorizon = ({
    title,
    description,
    disabled=false,
    icon,
    onClick
}:MenuHorizonProps) => {
    return (
        <MenuHorizonBox disabled={disabled} onClick={onClick}>
            <span className="menu-horizon-icon">{icon}</span>
            <article className="menu-horizon-text">
                <p className="__title font-h9">{title}</p>
                <p className="__description font-footnote">{description}</p>
            </article>
            <ChevronRight/>
        </MenuHorizonBox>
    )
}

function ChevronRight(){
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.2071 12.7071C16.5976 12.3166 16.5976 11.6834 16.2071 11.2929L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z" 
                fill="#141414"
            />
        </svg>
    )
}

const MenuHorizonBox = styled.button`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    width: 100%;
    background-color: var(---white-100);

    .menu-horizon-icon {
        background-color: var(--blue-1);
        padding: 12px;
        border-radius: var(--border-radius-s);
        max-height: fit-content;
        min-width: 48px;
        aspect-ratio: 1;
        
        path {
            fill: var(--blue-6);
        }
    }

    .menu-horizon-text {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;
        .__title {
            color: var(--text-title);
        }
        .__description {
            color: var(--text-secondary);
        }
    }

    &:active:not(:disabled) {
        .menu-horizon-text .__title{
            color: var(--blue-6);
        }
    }

    &:disabled {
        .menu-horizon-icon {
            background-color: var(--gray-2);
            path {
                fill: var(--text-disable);
            }
        }
        .menu-horizon-text .__title{
            color: var(--text-disable);
        }
    }

    @media screen and (hover: hover) {
        &:hover:not(:disabled) {
            cursor: pointer;
            .menu-horizon-text .__title{
                color: var(--blue-6);
            }
        }
    }

`

export default MenuHorizon;