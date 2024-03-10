const Bargain = require('../model/Bargain');

exports.createBargain = async (req, res) => {
    try{
        const bargain = new Bargain(req.body);
        const doc = await bargain.save();
        res.status(201).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.fetchBargains = async (req, res) => {
    try{
        const bargains = await Bargain.find({}).exec();
        res.status(200).json(bargains);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.fetchBargainsOfProductByUser = async (req, res) => {
    try{
        const bargains = await Bargain.find({product: req.params.productId, user: req.params.userId}).exec();
        res.status(200).json(bargains);
    }
    catch(err){
        res.status(400).json(err);
    }
}