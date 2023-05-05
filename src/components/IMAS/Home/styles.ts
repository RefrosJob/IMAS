import styled from 'styled-components';

export default styled.div`
    .home-body {
        width: 100%;
        height: 50em;
    }

    .centered-text {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }

    .history {
        .history-list {
            border-radius: 0 !important;
            background-color: var(--body-accent-color);
            height: 100%;
            .history-item {
                display: flex;
                align-self: start;
                align-items: baseline;
                justify-content: baseline;
                text-align: start;
                height: 100%;

                background-color: var(--body-accent-color-2);
                border-radius: 1em;
                padding-top: 1.2em;
                margin: 1em;
                padding-left: 1em;
                transition: 0.3s;
                :hover {
                    cursor: pointer;
                    background-color: #76b5de;
                    div {
                        color: rgba(39, 245, 136, 0.8);
                    }
                }
            }
        }
    }
    .send-invoice {
        div {
            color: rgba(39, 245, 136, 1);
        }

        background-color: rgba(39, 245, 136, 0.35);
        transition: 0.3s;
        :hover {
            cursor: pointer;
            background-color: rgba(39, 245, 136, 0.5);
            div {
                color: rgba(39, 245, 136, 0.8);
            }
        }
    }
    .create-template {
        div {
            color: rgba(25, 255, 221, 1);
        }

        background-color: rgba(25, 255, 221, 0.35);
        transition: 0.3s;
        :hover {
            cursor: pointer;
            background-color: rgba(25, 255, 221, 0.5);
            div {
                color: rgba(25, 255, 221, 0.8);
            }
        }
    }
`;
