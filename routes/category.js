const  express = require ("express");
const router= express.Router();
const Category = require ("../models/Category");
const slugify = require("slugify");

router.post ("/category/create", (req,res) => {

    const categoryObj = {
        name:req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId){
        categoryObj.parentId= req.body.parentId;
    }

    const cat= new Category (categoryObj);
    cat.save((error,category) => {
        if(error) return res.status(400).json({error});
        if(category){
            return res.status(200).json ({category});
        }
    });

});

module.exports = router;

