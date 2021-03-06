var dbhandle = require('../dbmodel/');

var User = dbhandle.UserModel;

var show = function(req, res) {
    var cart = req.session.cart,
        user = req.session.user;
    var renderopt = {
        title: '购物车',
        cart: [],
        user: user,
        category: GLOBAL.category[0].category
    };
    if(cart && cart.length !== 0){
        var promise = 0;
        var getDetail = function(elem) {
            User.getBook(elem.uid, elem.bid, function(err, result) {
                if(!err){
                    if(result){
                        var obj = {
                            uid: elem.uid,
                            bid: elem.bid,
                            book: result,
                            count: elem.count,
                            money: elem.money
                        };
                        renderopt.cart.push(obj);
                    }
                }
                promise++;
                if(promise === cart.length){
                    res.render('cart/show', renderopt);
                }
            });
        };
        for (var i = 0; i < cart.length; i++) {
            getDetail(cart[i]);
        }
    }else{
        res.render('cart/show', renderopt);
    }
};

module.exports = show;
