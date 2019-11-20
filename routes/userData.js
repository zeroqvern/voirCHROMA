const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// User Model
const User = require('../models/user');

// @route   POST user/register 
// @desc    Register new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });
      images = [];
      const newUser = new User({
        name,
        email,
        password,
        images
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
              .then(user => {

                jwt.sign(
                    { id:user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                name: user.name,
                                email: user.email,
                                images: user.images
                            }
                        })
                    }
                )
              });
          })
      })
    })
});


//@route POST user/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if(!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    // Check for existing user
    User.findOne({ email })
      .then(user => {
        if(!user) return res.status(400).json({ msg: 'User does not exist' });
  
  
        // Create salt & hash
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});
                
                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                images: user.images
                            }
                        })
                    }
                )
            })
      })
  });


//@route GET user/getUser
router.get('/getUser', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


router.post('/updateImages', (req,res) => {
  // const { id, imagesId } = req.body;
  var id = req.query.id;
  var imagesId = req.query.imagesId;
  console.log(id, imagesId);

  User.update(
    { "_id": id},
    { "$push": { "images": imagesId} },
    function (err) {
        if (err) return handleError(err);
        console.log("updated!")
        res.json("updated!");
    }
 );
})

module.exports = router;