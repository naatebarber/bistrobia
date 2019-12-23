module.exports = contentfulClient => (req, res) => {
    const { entryID } = req.query;
    if(!(entryID)) 
        return res.writeHead(400).send(JSON.stringify({
            success: false,
            body: "Must include Contentful Entry ID parameter as entryID"
        }));
    contentfulClient.getEntry(entryID)
        .then(res => JSON.stringify(res))
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(JSON.stringify({
            success: false,
            error: err
        })));
}