const router = require("express").Router();
const Doctor = require("../model/doctor");


// add doctor

router.post("/", async (req, res) => {
    const doctor = new Doctor(req.body);
  
    try {
      const savedoctor = await doctor.save();
      res.status(200).send(savedoctor);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//logindoc

router.post("/login", async (req, res) => {
	try {
		
		const user = await Doctor.findOne({ username: req.body.username });
		if (!user)
			return res.status(401).send({ message: "Invalid user" });

		const validPassword = await Doctor.findOne({password:req.body.password})
		if (!validPassword)
			return res.status(401).send({ message: "Invalid password" });

		const DocId = user._id
		res.status(200).send({docid:DocId, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;