export function generateTemplate(title: string): string {
    return `<!DOCTYPE html>
<style>
    .main-body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        margin: 1rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .heading-text {
        font-size: 1.5rem;
    }

    .container-main {
        display: grid;
        margin: 2rem;
    }

    .header-container {
        display: flex;
    }

    .header-child {
        width: 100%;
    }

    .contact-line {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .contact-line-2 {
        display: grid;
    }

    .inner-contact-text {
        line-height: 0.7rem;
        white-space: pre-line;
    }

    .invoice-info-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        line-height: 0.7rem;
    }

    .commodity-sale-table {
        margin-top: 1rem;
        border-collapse: collapse;
        width: 100%;
    }

    .commodity-sale-table-total {
        border-collapse: collapse;
        width: 100%;
    }

    .table-row {
        height: 3.5rem;
        border: 1px solid silver;
    }

    .table-total-row {
        height: 3.5rem;
    }

    .table-column {
        border: 1px solid silver;
        padding-left: 0.5rem;
    }

    .table-column-total-lable {
        border: 1px solid silver;
        padding-left: 0.5rem;
    }

    .table-column-empty {
        border: none;
    }

    .amount-column {
        width: 20%;
        text-align: end;
        padding-right: 0.5rem;
    }

    .total-column {
        font-weight: bold;
    }

    .index-column {
        width: 8%;
    }

    .column-header {
        text-align: left;
        padding-bottom: 1rem;
        padding-left: 0.2rem;
        padding-top: 1rem;
    }

    .cross-border-top {
        border-top: 0px;
    }

    /* strict */

    .centered-text {
        text-align: center;
    }

    .fb {
        border: 1px solid black;
    }

    .list-element {
        display: inline-flex;
    }


    .logo-container {
        text-align: end;
    }

    .sub-heading-big {
         font-size: 1.8rem;
    }

    .sub-heading {
        font-size: 1.2rem;
    }

    .footer {
        height: 15rem;
        max-height: 15rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .footer-image-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer-image {
        padding: 50px;
        height: 200px;
        width: 400px;
    }

    .terms-and-conditions {
        padding: 2rem;
        border-right: 1px solid silver;

    }

    .terms-and-conditions > p {
        line-height: 1.5rem;
    }

    
    
</style>
<body class="main-body">
    <div class="container-main">
        <div class="header-container">
            <div class="header-child">
                <h1 class="heading-text">Title</h1>
            </div>
            <div class="header-child centered-text heading-text">
                <h1>INVOICE</h1>
            </div>
            <div class="header-child logo-container">
                <img height="80px" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png" alt="LOGO">
            </div>
        </div>
        <div> 
            <h2>Company data</h2>
            <p class="inner-contact-text">1912 harves <br> 
                            2 court <br>
                            New York<br>
                            +37259595930</p>
        </div>
        <div class="contact-line">
            <div>
                <h2>Bill to</h2>
                <p class="inner-contact-text">1912 harves <br> 
                                2 court <br>
                                New York</p>

            </div>
             <div>
                <h2>Ship to</h2>
                 <p class="inner-contact-text">1912 harves <br> 
                    2 court <br>
                New York</p>
            </div>
            <div class="contact-line-2">
                <ul class="invoice-info-list">
                    <li>
                          <p class="sub-heading-big"><b>Invoice nr.</b> 12345</p>
                    </li>
                    <li>
                        <p><b class="sub-heading">Option:</b> 1</p>
                    </li>
                    <li>
                          <p><b class="sub-heading">Option:</b> 2</p>
                    </li>
                    <li>
                          <p><b class="sub-heading">Option:</b> 3</p>
                    </li>
                    <li>
                          <p><b class="sub-heading">Option:</b> 4</p>
                    </li>
                </ul>
            </div>
            
        </div>
        <div>
            <table class="commodity-sale-table">
                <thead>
                    <tr >
                        <th class="column-header">ID</th>
                        <th class="column-header">Item & Description</th>
                        <th class="column-header">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-row">
                        <td class="table-column index-column">1</td>
                        <td class="table-column">Item #1</td>
                        <td class="table-column amount-column">5$</td>
                    </tr>
                    <tr class="table-row">
                        <td class="table-column index-column">2</td>
                        <td class="table-column">Item #2</td>
                        <td class="table-column amount-column">5$</td>
                    </tr>
                    <tr class="table-row">
                        <td class="table-column index-column">3</td>
                        <td class="table-column">Item #3</td>
                        <td class="table-column amount-column">5$</td>
                    </tr>
                    <table class="commodity-sale-table-total">
                         <tr class="table-total-row">
                            <td></td>
                            <td class="table-column total-column" width="10%">Subtotal: </td>
                            <td class="table-column total-column amount-column" width="20%">10$</td>
                        </tr>
                        <tr class="table-total-row">
                            <td></td>
                            <td class="table-column total-column cross-border-top" width="10%">Tax: </td>
                            <td class="table-column total-column amount-column cross-border-top" width="20%">20%</td>
                        </tr>
                         <tr class="table-total-row">
                            <td></td>
                            <td class="table-column total-column" width="10%">Total: </td>
                            <td class="table-column total-column amount-column" width="20%">12$</td>
                        </tr>
                    </table>
                </tbody>
            </table>
        </div>
        
    </div>
    <div class="footer">
        <div class="terms-and-conditions">
            <h2>Terms & Conditions</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make
                a type specimen book. It has survived not only five centuries, 
                but also the leap into electronic typesetting, 
                remaining essentially unchanged. 
                It was popularised in the 1960s with the release of 
                Letraset sheets containing Lorem Ipsum passages, and more 
                recently with desktop publishing software like Aldus 
                PageMaker including versions of Lorem Ipsum.
            </p>
        </div>
        <div class="footer-image-container">
            <img class="footer-image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png" />
        </div>
    </div>
</body>
</html>
`;
}
