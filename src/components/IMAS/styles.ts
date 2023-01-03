import styled from 'styled-components';

export default styled.div`
    .imas-layout {
        overflow: hidden;
        overflow-y: hidden;
        height: 94vh;
        .imas-sider {
            background-color: var(--body-accent-color-2);

            .ant-typography {
                padding-top: 1rem;
                text-align: center;
            }

            .imas-sider-menu {
                background-color: inherit;
                .ant-menu-item-selected {
                    background-color: var(--body-accent-color);
                }
            }
            .ant-layout-sider-trigger {
                position: relative;
                background-color: inherit;
            }
        }

        .imas-content-head {
            .anticon {
                font-size: 1.5rem;
            }
        }
    }
`;
