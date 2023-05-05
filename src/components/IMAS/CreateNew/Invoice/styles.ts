import styled from 'styled-components';

export default styled.div`
    .custom-scrollbar-data {
        overflow-y: scroll;
        overflow-x: hidden;
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0);
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 1em;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
        }
        height: 45em;
    }

    .invoice-preview {
        padding: 2em;
        margin: 0.5em;
        border-radius: 1em;
        box-shadow: 0 0 2px var(--header-color);
        background-color: var(--body-accent-color-2);
    }

    .invoice-editor {
        height: 50em;
        padding: 2em;
        margin: 0.5em;
        border-radius: 1em;
        box-shadow: 0 0 2px var(--header-color);
        background-color: var(--body-accent-color-2);
        .inner-invoice-editor {
            height: 48em;
        }
    }
`;
