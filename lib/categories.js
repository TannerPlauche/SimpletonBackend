module.exports = function (server) {
    function getCategories(params) {
        return server.pool.query(server.sql.categoriesGet, params);
    }

    function getCategoriesByLetter(params) {
        params.letter = params.letter.toUpperCase();
        return server.pool.query(server.sql.categoriesGetByLetter, params);
    }

    return {
        getCategories,
        getCategoriesByLetter,
    };
};