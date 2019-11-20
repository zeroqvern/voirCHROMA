const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/user');

var ColorObj = {};
var CousinObj ={};
var ImageObj = {};

var ColorObjList = [];
var CousinObjList = [];

var parentID = 0;
var userId = 0;

// @route use API
router
    .get("/api", function(req, res){
        console.log("extracting...");

        // const exist = Color.exists({});
        // if(exist) console.log("exist");
        var url = req.query.url;
        userId = req.query.id;
        
        console.log("url:", url);

        ColorObjList = [];
        CousinObjList = [];
        ImageObj = {};

        parentID = 0;

        getColors(url)

        setTimeout(function() {
            res.json({"image":ImageObj})

            console.log(ImageObj);
        },18000);
        

    });
    

// extract colors from image
function getColors(imageUrl)
{
    const apiKey = require('../config/keys').apiKey;
    const apiSecret = require('../config/keys').apiSecret;

    // console.log("api key: ", apiKey);
    // console.log("api secret: ", apiSecret);

    // const imageUrl = 'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg';
    const query = 'https://api.imagga.com/v2/colors?image_url='+encodeURIComponent(imageUrl);

    axios
        .get(query,{
        auth : {
            username : apiKey,
            password : apiSecret
        }})
        .then(function(response) {
            colorsArr = [];

            console.log("Images");
            console.log("image URL: ",imageUrl);

            bgColors = response.data.result.colors.background_colors;
            console.log("background: ", bgColors.length);
            //[0].closest_palette_color_html_code
            for (i = 0; i < bgColors.length; i++)
            {
                a = response.data.result.colors.background_colors[i].closest_palette_color_html_code;
                // console.log(a);
                colorsArr.push(a);
            }

            fgColors = response.data.result.colors.foreground_colors;
            console.log("foreground: ", fgColors.length);
            for (i = 0; i < fgColors.length; i++)
            {
                b = response.data.result.colors.foreground_colors[i].closest_palette_color_html_code;
            // console.log(b);

            colorsArr.push(b);
            }

            //write to Images collection
            parentID = createUID()
            addToImages(imageUrl, colorsArr);
            getColorInfos(colorsArr);

            return 1;

         })
         .catch(function(err){
             console.log(err);
             return err;
         });
}
    
// get color details (normally 6 colors)
function getColorInfos(colorsArr) {
// all the stuff you want to happen after that pause

    colorList = [];
    var regexp = new RegExp('#','g');
    colorsArr.forEach(function(element){
        c = element.replace(regexp, '');
        console.log(c);
        colorList.push(c);
    });
    console.log("getting details....");
    getDetails(colorList, 0)
}

// get cousins of color (normally 5 cousins)
function getDetails(c, index)
{

    colorQuery = `http://www.thecolorapi.com/scheme?hex=${c[index]}`
    axios.get(colorQuery)
    .then ((response, err) => {
        if(err ) console.log(err);

        console.log("-------------------------------------------------------------");
        console.log("-------------------------------------------------------------");
        console.log(index);

        console.log("Colors");
            
        hex = response.data.seed.hex.value;
        rgb = response.data.seed.rgb.value.match(/\((.*?)\)/)[1];
        hsl = response.data.seed.hsl.value.match(/\((.*?)\)/)[1];
        hsv = response.data.seed.hsv.value.match(/\((.*?)\)/)[1];
        cmyk = response.data.seed.cmyk.value.match(/\((.*?)\)/)[1];
        
        image_bare = response.data.seed.image.bare;
        name = response.data.seed.name.value;

        
        //write to Colors collection
        var ID = createUID();
        console.log("parent", parentID);
        addToColors(ID, name, hex, rgb, hsl, hsv, cmyk, image_bare);
        
        console.log("name: ", name);
        console.log("hex: " ,hex);
        console.log("URL: ", image_bare)
        console.log("");
        console.log("rgb: " ,rgb);
        console.log("hsl: " ,hsl);
        console.log("hsv: " ,hsv);
        console.log("cmyk: " ,cmyk);
        console.log("");
        
        cousins = response.data.count;
        valueArr = [];

        console.log("cousins:", cousins)
        for(i = 0; i < cousins; i++)
        {
            console.log(response.data.colors[i].hex.value);
            v = response.data.colors[i].image.named;
            console.log("URL:", v);
            valueArr.push(v);
            console.log("");

        }

        // add to Cousins collection
        addToCousins (ID, valueArr, index);

        if(index < c.length - 1)
        {
            index += 1;
            
            getDetails(c, index)
        }
        else
        {
            
            ImageObj.colors = ColorObjList;
            console.log("done", index);
        }


    })
    .catch((error) => {
        console.log(error);
    });
    
}

// create unique ID
function createUID()
{
    //create unique id
    var now = new Date();
    var ID= new Date().valueOf();
    ID += now.getSeconds();
    return ID;
}

//model
const Color = require("../models/color");
const Image = require("../models/images");
const Cousin = require("../models/cousins");

// write to database
// write to Images Collection
function addToImages(img_url, colorArr) {
    const newImage = new Image({
        id: parentID,
        img_url: img_url,
        color1: colorArr[0],
        color2: colorArr[1],
        color3: colorArr[2],
        color4: colorArr[3],
        color5: colorArr[4],
        color6: colorArr[5]
    });
    newImage.save()
    .then(console.log(newImage))
    .catch(err => console.log('Error' + err));


    ImageObj.id = parentID;
    ImageObj.img_url = img_url;

    User.update(
        { "_id": userId},
        { "$push": { "images": parentID} },
        function (err) {
            if (err) console.log(err);
            console.log("updated!")
        }
     );

}

// write to Colors Collection
function addToColors(ID,n,h,RGB,HSL,HSV,CMYK,bare){
    const newColor = new Color({
        id: ID,
        img_id: parentID,
        name: n,
        hex: h,
        rgb: RGB,
        hsl: HSL,
        hsv: HSV,
        cmyk: CMYK,
        img_bare: bare
    });
    newColor.save()
    .then(
        // console.log(newColor)
        )
    .catch(err => console.log('Error' + err));
    
    ColorObj = {};
    ColorObj.id = ID;
    ColorObj.img_id= parentID;
    ColorObj.name = n;
    ColorObj.hex = h;
    ColorObj.rgb = RGB;
    ColorObj.hsl = HSL;
    ColorObj.hsv = HSV;
    ColorObj.cmyk = CMYK;
    ColorObj.img_bare = bare;
    ColorObjList.push(ColorObj);

}

// write to Cousins Collection
function addToCousins(bigCousin, valueArr, index){
    var cousinsList = [];
    CousinObjList =[];
    for (i = 0; i < valueArr.length; i++ ) {
        const newCousin = new Cousin({
            parent: parentID,
            big_cousin: bigCousin,
            img_value: valueArr[i]
        });

        CousinObj = {};
        CousinObj.parent = parentID;
        CousinObj.big_cousin = bigCousin;
        CousinObj.img_value = valueArr[i];

        cousinsList.push(newCousin);
        CousinObjList.push(CousinObj);

    }

    ColorObjList[index].cousins = CousinObjList;

    Cousin.insertMany(cousinsList)
    .then(function(docs){
        // console.log(docs)
    })
    .catch(err => res.status(400).json('Error' + err));

    

}

// export getColors function so it can be used
module.exports = {callApi: getColors};
module.exports = router;
