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
router.get("/allusers",async(req, res)=>{
    try {
        const users = await Banner.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(err);
    }
})

//update

router.put("/:_Id",async (req,res)=>{
    try {
      var update={
        color:req.body.color,
        location:req.body.location
      };
      const Newupdate = await Banner.findByIdAndUpdate(req.params._Id,{$set:update});
      console.log(Newupdate)
      res.status(200).json(Newupdate);
    } catch (error) {
        res.status(500).json(error);
    }
  })

//Delete user
router.delete("/:_Id", async (req, res) => {
    try {
      const user = await Banner.deleteOne({
        Id: req.params._Id,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// 
router.get ("/",async (req, res) => {
  const { page } = req.query;
  
  try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  
      const total = await PostMessage.countDocuments({});
      const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

      res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

) 

  module.exports = router; 

