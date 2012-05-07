var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var edit = function(req, res) {
    var user = req.session.user,
        uid = user.uid,
        params = req.params,
        bid = params.bid;
    User.getBook(uid, bid, function(err, result) {
        if(!err){
            console.log('edit get book success');
            var renderopt = {
                title: "图书修改",
                book: result,
                user: user
            };
            res.render('book/edit', renderopt);
        }
    });
};

module.exports = edit;