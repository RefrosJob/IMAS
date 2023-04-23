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

    .preview-card {
        display: inline-flex;
        border: 1px solid black;
    }

    .invoice-preview {
        height: 45rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }
`;
