// will be writing the inhertance classes and logic over here


class bankingSystem {
    constructor() {
        if (new.target === bankingSystem) {
            throw new Error('Abstract class cannot be instantiated')
        }
    }


    processPayment(amount) {
        throw new Error('processPayment method must be implemented')
    }

}

class paytmBankingSystem extends bankingSystem {
    constructor() {
        super()
    }
    processPayment(amount) {
        // this is give 80% success
        console.log(`executing a paytm payment service with amount ${amount}`);
        const r = Math.floor(Math.random() * 100);
        // console.log('payment failed');
        return r < 80;
    }
}

class RazorPaySystem extends bankingSystem {
    constructor() {
        super()
    }
    processPayment(amount) {
        // this is give 50% success
        console.log(`executing a RazorPay payment service with amount ${amount}`);
        const r = Math.floor(Math.random() * 100);
        // console.log('payment failed');
        return r < 50;
    }
}

class paymentGateway {
    constructor(bankingSystem) {
        this.bankingSystem = bankingSystem
    }

    async validatePayment(reqobj) {
        throw new Error('validatePayment method must be implemented')
    }
    async initiatePayment(reqobj) {
        throw new Error('initiatePayment method must be implemented')
    }
    async confirmPayment(reqobj) {
        throw new Error('confirmPayment method must be implemented')
    }

    async processPayment(request) {
        if (!(await this.validatePayment(request))) {
            console.log(`Validation failed for ${request.sender}`);
            return false;
        }

        if (!(await this.initiatePayment(request))) {
            console.log(`Initiation failed for ${request.sender}`);
            return false;
        }

        if (!(await this.confirmPayment(request))) {
            console.log(`Confirmation failed for ${request.sender}`);
            return false;
        }

        console.log("payment complete");
        return true;
    }
}


class paytmPaymentGateway extends paymentGateway {
    constructor() {
        super( new paytmBankingSystem())
    }
    async validatePayment(request) {
        console.log(`Paytm validating for ${request.sender}`);
        return (await request.amount) > 0 && request.currency === "INR";
    }

    async initiatePayment(request) {
        console.log(`Paytm initiation for ${request.sender}`);
        return await this.bankingSystem.processPayment(request.amount);
    }
    async confirmPayment(request) {
        console.log(`Paytm confirming for ${request.sender}`);
        return true;
    }
}

class RazorPayPaymentGateway extends paymentGateway {
    constructor() {
        super( new RazorPaySystem())
    }
    async validatePayment(request) {
        console.log(`RazorPay validating for ${request.sender}`);
        return (await request.amount) > 0 && request.currency === "INR";
    }

    async initiatePayment(request) {
        console.log(`RazorPay initiation for ${request.sender}`);
        return await this.bankingSystem.processPayment(request.amount);
    }
    async confirmPayment(request) {
        console.log(`RazorPay confirming for ${request.sender}`);
        return true;
    }
}


// making final proxy gateway

class proxyPaymentGateway extends paymentGateway{
    constructor(retries, gateway) {
        super(gateway.bankingSystem)
        this.retries = retries,
            this.gateway = gateway
    }

    async paymetProcess() {
        let result = false;
        for (let attempt = this.retries; attempt > 0; attempt--) {
            if (attempt > 0) {
                console.log(
                    `[Proxy] Retrying payment (attempt ${this.retries - attempt + 1}) for ${request.sender}`,
                );
            }
            const result = await this.gateway.processPayment(request);
            if (result) {
                break;
            }
            if (!result) {
                console.log(
                    `[Proxy] Payment failed after ${this.retries - attempt + 1} attempts for ${request.sender}`,
                );
            }
        }
    }
}

class paymentRequest {
  constructor(sender, receiver, currency, amount) {
    ((this.sender = sender),
      (this.receiver = receiver),
      (this.amount = amount),
      (this.currency = currency));
  }
}


  const request =  new paymentRequest('chris','fonseca','INR',1000);

  const gateway = new paytmPaymentGateway();
  const proxy = new proxyPaymentGateway(3,gateway)

  const result = proxy.paymetProcess(request);
  console.log(result)

  module.exports ={
    paymentRequest,
    paytmPaymentGateway,
    RazorPayPaymentGateway,
    proxyPaymentGateway
  }