const express = require('express');
const router = express.Router();

//model
const Color = require("../models/color");
const Image = require("../models/images");
const Cousin = require("../models/cousins");
const User = require('../models/user');


// @route GET Images
router
    .get("/get/images/:id", function(req, res){
        console.log("finding...");
        var userId = req.params.id;
        imagesArr = [];
        ImageObj = {};
        ImageObjList = [];

        ColorList = [];

        User.findOne({ _id: userId})
            .then(user => {
                imagesArr = user.images
                console.log(imagesArr)

                for (var i = 0; i < imagesArr.length; i++)
                {
                    Image.findOne({id:imagesArr[i]}, function(err, images){
                        if (err) console.log(err);
                        // res.json(images);
                        ImageObj = {};

                        ImageObj.imgId = images.id;
                        ImageObj.img_url = images.img_url;
        
                        ColorList = [];
                        ColorList.push(images.color1);
                        ColorList.push(images.color2);
                        ColorList.push(images.color3);
                        ColorList.push(images.color4);
                        ColorList.push(images.color5);
                        ColorList.push(images.color6);
        
                        ImageObj.colors = ColorList;
                        ImageObjList.push(ImageObj);
                           
                    });
                }
        })

       
        // .catch(err => res.status(400).json('Error: ' +  err));

        setTimeout(function() {
            console.log(ImageObjList);
            res.json({ "Results":ImageObjList });
        },3000);
    });


// @route GET Image and Child
router
    .get("/ViewSaved/:id", function (req, res) {
        var imgID = req.params.id;

        ImageObj = {};
        ColorObj = {};
        ColorObjList = [];
        CousinObj = {};
        CousinObjList = [];


        Image.findOne({id: imgID}, function (err, image){
            if(err) console.log(err);
            console.log("Image Found!")

            ImageObj.id = image.id;
            ImageObj.img_url = image.img_url;
        });

        Color.find({img_id: imgID}, function(err, color){
            if(err) console.log(err);
            console.log("Child Color Found!")
            // console.log(color);
            
            for (i = 0; i < color.length; i++)
            {
                ColorObj = {};
                // ColorObj = color[i];
                ColorObj.id = color[i].id;
                ColorObj.img_id=  color[i].img_id;
                ColorObj.name = color[i].name;
                ColorObj.hex = color[i].hex;
                ColorObj.rgb = color[i].rgb;
                ColorObj.hsl = color[i].hsl;
                ColorObj.hsv = color[i].hsv;
                ColorObj.cmyk = color[i].cmyk;
                ColorObj.img_bare = color[i].img_bare;
                ColorObj.cousins = [];

                ColorObjList.push(ColorObj);

            }
            // console.log(ColorObjList);
            // console.log("COLOR", color)


           
        });
        
        Cousin.find({parent: imgID}, function(err, cousin) {
            if(err) console.log(err);
            console.log("Color Cousins Found!");


            for (j = 0; j < ColorObjList.length; j++){
                cousinList = []
                // ColorObjList[j].cousins = cousinList;
                // console.log(ColorObjList[j].name);
                c = 0;
                for(i = 0; i < cousin.length; i++) {
                    if(c == 5) break;
                    if(cousin[i].big_cousin == ColorObjList[j].id){
                        
                        CousinObj ={};
                        CousinObj = cousin[i];
                        cousinList.push(CousinObj);
                        c = c  + 1
                        // console.log("Add", i)
                    }

                }
                ColorObjList[j].cousins = [];
                ColorObjList[j].cousins = cousinList;
                // console.log(ColorObjList[j])

                // console.log("Color "+ j);
                // console.log("color: ", ColorObjList[j].cousins);
            }
            ImageObj.colors = ColorObjList;
            // console.log(ImageObj.colors[0].cousins)


        });
        

        setTimeout(function() {
            res.json({"image":ImageObj});
        },3000);
    });

// @route GET Colors
router
    .get("/get/colors", function(req, res){
        console.log("finding...");
        Color.find()
            .then(colors => {
                res.json(colors);
                console.log(colors);
            })
            .catch(err => res.status(400).json('Error: ' +  err));
    });


// @route GET Cousins
router
    .get("/get/cousins", function(req, res){
        console.log("finding...");

        Cousin.find({})
        .then(cousins => {
            res.json(cousins);
            console.log(cousins);
            // saveCousins (cousins);
        })
        .catch(err => res.status(400).json('Error: ' +  err));
    });


// @route Clear Database
router
    .delete("/clear", function(req, res){
        console.log("deleting all...");

        Image.deleteMany({}, function(err) {
            if(err) console.log(err);
            console.log("Image deleted!")
        });
        Color.deleteMany({}, function(err) {
            if(err) console.log(err);
            console.log("Color deleted!")
        });
        Cousin.deleteMany({}, function(err) {
            if(err) console.log(err);
            console.log("Cousin deleted!")
            
        });

        setTimeout(function() {
            res.json("Image, Color, Cousin deleted!");
            console.log("Image, Color, Cousin deleted!");
        },5000);
    });

// @route Remove Image and children
router
    .delete("/removeImage", function (req, res) {
        var userId = req.query.id;
        var imgId = req.query.imgId;
        console.log(imgId, userId);

        Image.deleteOne({id: imgId}, function(err) {
            if(err) console.log(err);
            console.log("Image deleted!")
        });
        Color.deleteMany({img_id: imgId}, function(err) {
            if(err) console.log(err);
            console.log("Child Color deleted!")
        });
        Cousin.deleteMany({parent: imgId}, function(err) {
            if(err) console.log(err);
            console.log("Color Cousins deleted!")
        });

        User.update(
            { "_id": userId},
            { "$pull": { "images": imgId} },
            function (err) {
                if (err) return handleError(err);
                console.log("updated!")
            }
         );
        setTimeout(function() {
            res.json("Image, Color, Cousin deleted!");
        },5000)
    });

module.exports = router;