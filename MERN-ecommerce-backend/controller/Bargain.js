const Bargain = require('../model/Bargain');

exports.createBargain = async (req, res) => {
    try{
        const prevBargain = await Bargain.findOne({product: req.body.product, user: req.body.user}).exec();
        if(prevBargain){
            Bargain.findByIdAndDelete(prevBargain._id).exec();
        }

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

exports.acceptBargain = async (req, res) => {
    try{
        const bargain = await Bargain.findById(req.params.id).exec();
        bargain.accepted = true;
        const doc = await bargain.save();
        res.status(200).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.deleteBargain = async (req, res) => {
    try{
        const doc = await Bargain.findByIdAndDelete(req.params.id).exec();
        res.status(200).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.rejectBargain = async (req, res) => {
    try{
        const bargain = await Bargain.findById(req.params.id).exec();
        bargain.rejected = true;
        const doc = await bargain.save();
        res.status(200).json(doc);
    }
    catch(err){
        res.status(400).json(err);
    }
}