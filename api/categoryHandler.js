module.exports = function (app) {
    function getCategories(req, res) {
        return app.categories.getCategories()
            .then(function (data) {
                res.send(data);
            })
            .catch(function(){
                res.send("Error, rejected query promise");
            })
    }

    function getCategoriesByLetter(req, res) {
        return app.categories.getCategoriesByLetter({ letter: req.params.letter })
            .then(function (data) {
                res.send(data);
            })
            .catch(function(){
                res.send("Error, rejected query promise");
            })
    }

    app.get('/categories/', getCategories);
    app.get('/categories/:letter', getCategoriesByLetter);
};
