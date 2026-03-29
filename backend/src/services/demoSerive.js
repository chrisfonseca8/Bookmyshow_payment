const {    paymentRequest,
    paytmPaymentGateway,
    RazorPayPaymentGateway,
    proxyPaymentGateway} = require('./paymentService')


    
  const request =  new paymentRequest('chris','fonseca','INR',1000);

  const gateway = new paytmPaymentGateway();
  const proxy = new proxyPaymentGateway(3,gateway)

  const result = proxy.paymetProcess(request);
  console.log(result)
