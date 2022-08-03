const router = require("express").Router();
const Banner = require("../model/banner");


//Add User
router.post("/", async (req, res) => {
    const banner = new Banner(req.body);
  
    try {
      const savebanner = await banner.save();
      res.status(200).json(savebanner);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//GetAll user
router.get("/allbanner",async(req, res)=>{
    try {
        const banner = await Banner.find()
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json(err);
    }
})

//Get user by id

router.get("/:_id",async(req, res)=>{
  const bannerId = req.params._id
  
    try {
        const banner = await Banner.findById(bannerId)
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json(err);
    }
})

//update

router.put("/:_id",async (req,res)=>{
    try {
      var update={
        title:req.body.title,
        color:req.body.color,
        description: req.body.description,
        location:req.body.location,
        background:req.body.background,
      };
      const Newupdate = await Banner.findByIdAndUpdate(req.params._id,{$set:update});
     
      res.status(200).json(Newupdate);
    } catch (error) {
        res.status(500).json(error);
    }
  })

//Delete user
router.delete("/:_id", async (req, res) => {
    try {
      const user = await Banner.deleteOne({
        _id: req.params._id,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router; 

