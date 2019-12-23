module.exports = stripeClient => (req, res) => {
    const { token, description, amt } = req.body;
    stripeClient.charges.create({
            amount: amt,
            currency: 'usd',
            description: description,
            source: token
        })
        .then(data => res.status(200).send({
            success: true,
            body: data
        }))
        .catch(err => res.status(500).send({
            success: false,
            error: err
        }));
}