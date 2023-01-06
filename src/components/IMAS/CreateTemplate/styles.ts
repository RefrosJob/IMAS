import styled from 'styled-components';

export default styled.div`
    .preview-card {
        display: inline-flex;
        border: 1px solid black;
    }
    .template-editor {
        height: 50rem;
        overflow: scroll;
        .editor-collapse {
            min-width: 40rem;
        }
    }
    .invoice-preview {
        height: 45rem;
        overflow: scroll;
    }
`;
