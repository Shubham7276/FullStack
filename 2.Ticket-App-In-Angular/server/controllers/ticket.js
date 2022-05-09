const Tickets = require('../models/ticket.js')
var ObjectId=require('mongoose').Types.ObjectId;

exports.add = async (req, res) => {
	try {
		const ticket = await new Tickets(req.body)

		await ticket.save((err, ticket) => {
			if (err) {
				return res.status(400).json({ err })
			}
			res.status(200).json({ ticket })
		})
	} catch (err) {
		console.error(err.message)
	}
}

exports.send=async(req,res)=>{
    Tickets.find((err,docs)=>{
        if(err) throw err;
        console.log(docs);
        res.send(docs);
    }
    )

}

exports.update=async(req,res)=>{
    console.log(req.body)
	var updateticket={
        desc:req.body.desc,
        UpdateDate:req.body.Date
    };
    Tickets.findByIdAndUpdate(req.params.id,{$set:updateticket},{new:true},(err,docs)=>{
        if(err) throw err;
        res.send(docs);
    });
}

exports.deleteTicket=async(req,res)=>{
    console.log(req.body)
    var deleteticket={
        DeleteDate:req.body.DeleteDate,
        isDelete:req.body.isDelete
    };
    Tickets.findByIdAndUpdate(req.params.id,{$set:deleteticket},{new:true},(err,docs)=>{
        if(err) throw err;
        res.send(docs);
    });
}

exports.getTicketbyId=async(req,res)=>{
	console.log("the ticket id from client  "+req.params.id)
    
    if(ObjectId.isValid(req.params.id))
    {    
        Tickets.findById(req.params.id,(err,docs)=>{
            if(err) throw err;
            console.log(docs)
            res.send(docs);
        });
    }else
    {
        return res.status(200).send("No Record Found with Given Id: "+req.params.id);
    }
}