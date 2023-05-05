import styled from 'styled-components';

export default styled.div`
    .custom-scrollbar {
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
    }

    .template-editor {
        padding: 2em;
        margin: 0.5em;
        border-radius: 1em;
        box-shadow: 0 0 2px var(--header-color);
        background-color: var(--body-accent-color-2);
        height: 50rem;
        .inner-template-editor {
            width: 40rem;
            height: 45rem;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        .editor-collapse {
            max-width: 40rem;
        }
    }
    .invoice-preview {
        padding: 2em;
        margin: 0.5em;
        border-radius: 1em;
        box-shadow: 0 0 2px var(--header-color);
        background-color: var(--body-accent-color-2);
    }
`;
