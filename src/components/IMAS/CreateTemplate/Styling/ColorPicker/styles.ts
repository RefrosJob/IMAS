import styled from 'styled-components';

export default styled.div`
    .color-picker-button {
        height: 2em;
        width: 2em;
        background-color: ${(props) => props.color};
        border-radius: 0.2em;
        border: 1px solid rgba(94, 94, 94, 0.8);
    }
    .color-picker {
        z-index: 9999 !important;
        position: absolute;
        top: 0em;
        right: 8.5em;
    }

    .color-picker-bg {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: -9999 !important;
    }
`;
