const stripe = require('stripe')('sk_test_51J2o63INbXUH9eYLi0r3h90dAcIayEHdBmPQ7ziKRf3B4l5mer1nWc0XGHLYcIG8pjg8A5Bs4FlTvAdvYcLq8M6N006sMhYAdi')

exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if(typeName !== 'Mutation'){
        throw new Error('Request is not a mutation');
    }

    if(!arguments?.amount){
        throw new Error('Amount argument is required');
    }

    //create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd',
    });

    return {
        clientSecret: paymentIntent.client_secret, 
    }
};
