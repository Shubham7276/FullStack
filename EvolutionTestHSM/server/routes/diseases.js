const router = require("express").Router();
const Diseases = require("../model/diseases");

router.post("/", async (req, res) => {
    const diseases = new Diseases(req.body);
  
    try {
      const savediseases = await diseases.save();
      res.status(200).send(savediseases);
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.get("/",async(req,res)=>{
    try{
        const diseases= await Diseases.find()
        res.json(diseases);
    }catch(error){
        console.log(error)
    }
});


module.exports = router;