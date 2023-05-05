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

    .floating-select {
        position: absolute;
        z-index: 100;
        left: 3em;
        top: 7em;
    }

    .invoice-preview-wrapper {
        height: 42rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }
`;
