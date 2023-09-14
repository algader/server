const express = require('express');
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const isLoggedIn = require('../middlewares/authentication');
const  {userValidationRules, updateUserValidationRules, postValidationRules, validate } = require('../middlewares/validtor');
const upload = require('../middlewares/upload')

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "اهلا بالعالم"
    })
})

router.post('/account/register', userValidationRules(), validate, userController.register); 
router.post('/account/login', userController.login);
router.get('/account/profile', isLoggedIn, userController.getProfile)
router.put('/account/profile/upload-photo', upload.single('avatar'), isLoggedIn, userController.uploadUserPhoto);
router.put('/account/profile/update', updateUserValidationRules(), validate, isLoggedIn, userController.updateProfile);


// Post Router

router.post('/posts/create', upload.array('postImg', 5), postValidationRules(), validate, isLoggedIn, postController.newPost);
router.get('/posts', isLoggedIn, postController.getAllPosts);
router.get('/posts/:postId', isLoggedIn, postController.getPost);
router.get('/my-posts', isLoggedIn, postController.getMyAllPosts);
router.get('/my-posts/:postId', isLoggedIn, postController.getMyPost);
router.put('/my-posts/:postId/update', postValidationRules(), validate, isLoggedIn, postController.updateMyPost);
router.delete('/my-posts/delete', isLoggedIn, postController.deleteMyPost);

module.exports = router;

