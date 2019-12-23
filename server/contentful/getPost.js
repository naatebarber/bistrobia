module.exports = contentfulClient => (req, res) => {
	const postType = req.query.type == 'custom'
		? 'customPosting'
		: 'posting';
	contentfulClient.getEntries({ 'content_type': postType })
		.then(res => JSON.stringify(res))
		.then(data => res.status(200).send(data))
		.catch(err => res.status(500).send(JSON.stringify({
			success: false,
			error: err
		})));
};
