const gardenController = require("../controllers/gardenController");

// API Routes
// router.use("/api", apiRoutes);
function router(app) {

  // app.get('/api/garden', async function(req, res) {
  //   const data = await gardenController.getPosts()
  //   res.send(data)
  // });

  app.get('/api/garden/:user?', async function(req, res) {
    const userId = req.params.user || ""
    console.log("Checking userId: ", userId)
    const data = await gardenController.getPosts(userId)
    res.send(data)
  });
  
  app.post('/api/garden/:user', async function(req, res) {
    req.body.user = req.params.user
    console.log(`[posting]....................`, req.body)
    const data = await gardenController.createPost(req.body)
    res.send(data)
  });

  app.delete('/api/garden/:id', async function(req, res) {
    const postId = req.params.id
    await gardenController.removePost(postId)
    res.send( {message: "Just deleted recipe post"} )
  })

  app.put( '/api/garden/:id', async function( req, res ){
    const postId = req.params.id
    let postData = {...req.body}
    console.log(`[put request].... postId: `, postId )
    console.log(`[put request].... postData: `, postData )

    const updatingPost = await gardenController.updatePost( postId, postData)
    console.log(`[Checking updatingPost]...`, updatingPost)

    res.send( {message: "Update has just been saved!"} )
  });
}

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;