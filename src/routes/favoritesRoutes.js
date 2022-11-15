const { Router } = require('express');
const router = Router();
const Favorities = require('../models/FavoritiesModel');

router.get('/:id', async (req, res) => {
    let response = {success:false, result:null, message:null};

    try {
        const resp = await Favorities.find({userId:req.params.id});
        response = {success:true, result:resp, message:null};
    } catch (error) {
        response = {success:false, result:null, message:error};
    }
    
    res.json(response);
});

router.post('/', async (req, res) => {
    let response = {success:false, result:null, message:null};
    const { userId, name, products } = req.body;

    try {
        if (userId != undefined && typeof userId == 'number' && name != undefined && name != '' && products != undefined) {
            const resp = await Favorities.find({userId, name});
            let re_name = resp.length > 0 ? name.concat('(',resp.length,')') : name;
            //let re_products = typeof products == 'object' ? products : [];
    
            const newFavorities = new Favorities({userId, name:re_name, products});
            await newFavorities.save();
            
            response = {success:true, result:'Item save', message:null};
        } else {
            response = {success:false, result:null, message:'Bad request'};
        }
    } catch (error) {
        response = {success:false, result:null, message:error};
    }
    
    res.json(response);
});

router.put('/', async (req, res) => {
    let response = {success:false, result:null, message:null};
    const { userId, name, products } = req.body;

    try {
        const resp = await Favorities.find({userId, name});
        if (resp.length > 0) {
            if (products?.length > 0) {
                let updateList = resp[0].products.concat(products);
                await Favorities.updateOne({ userId, name }, { products:updateList });
                response = {success:true, result:'Item update', message:null};
            }
        } else {
            response = {success:false, result:null, message:'El userId/name no existen.'};
        }
    } catch (error) {
        response = {success:false, result:null, message:error};
    }

    res.json(response);
});


module.exports = router;