import '../../../styles/paymentComplete.css';

function PaymentComplete(){
    return(
      <body className='payment-complete-body' id="div1">
        <div class="payment-complete-card">
        <div className='round-frame'><i class="checkmark">✓</i></div>
        <h1>Success</h1> 
        <p>We received your purchase request<br/> directing back to home!</p>
      </div>
      </body>
    )
    
}

export default PaymentComplete;