exports.handler = async event => {
  // TODO implement
  const body = JSON.parse(event.body);

  switch (body.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = body.data.object;
      //update database and set order to successfull
      break;
    case 'payment_method.attached':
      const paymentMethod = body.data.object;
      break;
    default:
      console.log('Unhandled event type');
  }

  const response = {
    statusCode: 200,

    body: JSON.stringify({received: true}),
  };
  return response;
};
