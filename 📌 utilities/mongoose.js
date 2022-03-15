const mongoose  = require("mongoose");

async function mongooseConnect(MONGODB_URI = '') {
    try {
        mongoose.connect( MONGODB_URI , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        .catch(err => {
            console.error(err.stack);
            process.exit();
        })
        
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
        console.log("✔️ Connected to MongoDB");
        });
        
        exports.test = function(req,res) {
        res.render('test');
        };
    } catch(err) {
        console.log(err);
    }
}

module.exports = { mongooseConnect };