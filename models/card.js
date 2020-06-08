var mongoose = require("mongoose");

var cardSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cardNo: String,
    expiryMonth: String,
    expiryYear: String,
    cvc: String,
    pin: String,
    created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Card", cardSchema);