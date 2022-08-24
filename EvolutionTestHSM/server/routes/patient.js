const router = require("express").Router();
const Patient = require("../model/patient");


// add doctor

router.post("/", async (req, res) => {
    const patient = new Patient(req.body);
  
    try {
      const savepatient = await patient.save();
      res.status(200).send(savepatient);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Get All Patient
router.get("/",async(req, res)=>{
    try {
        const patient = await Patient.find()
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(err);
    }
})

// Patient login

router.post("/login", async (req, res) => {
	try {
		
		const patientname = await Patient.findOne({ patientname: req.body.username });
		if (!patientname)
			return res.status(401).send({ message: "Invalid patient Name" });

		const mobileNo = await Patient.findOne({mobileNo:req.body.password})
		if (!mobileNo)
			return res.status(401).send({ message: "Invalid mobileNo" });
    const PID=patientname._id

		res.status(200).send({pid:PID, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Get patient by Id

router.get("/:_id",async(req, res)=>{
  const patientid = req.params._id
  
    try {
        const patient = await Patient.findById(patientid)
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(err);
    }
})


// update paitent
router.put("/:_id",async (req,res)=>{
  try {
    var update={
      diseases:req.body.diseases,
      medicines:req.body.medicines,
      condiation: req.body.condiation,
    };
    const Newupdate = await Patient.findByIdAndUpdate(req.params._id,{$set:update});
    if(!Newupdate){
      res.status(400).send(Newupdate);
    }
    res.status(200).send(Newupdate);
    
  } catch (error) {
      res.status(500).send(error);
  }
})

// delete paitient

router.delete("/:_id", async (req, res) => {
  try {
    const patient = await Patient.deleteOne({
      _id: req.params._id,
    });
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;

