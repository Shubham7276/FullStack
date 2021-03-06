const Tickets = require('../models/ticket.js')
var ObjectId=require('mongoose').Types.ObjectId;

exports.add = async (req, res) => {
	try {
		const ticket = new Tickets(req.body)

		await ticket.save((err, ticket) => {
			if (err) {
				return res.status(400).json({ err })
			}
			res.status(200).json({ ticket })
		})
	} catch (err) {
		console.log(err)
	}
}

exports.send=async(req,res)=>{
    try{
        await Tickets.find((err,docs)=>{
            if(err) throw err;
            console.log(docs);
            res.send(docs);
        }
        )
    }catch (err) {
		console.log(err)
	}
    

}

exports.update=async(req,res)=>{
    try{
        var updateticket={
            desc:req.body.desc,
            UpdateDate:req.body.Date
        };
        await Tickets.findByIdAndUpdate(req.params.id,{$set:updateticket},{new:true},(err,docs)=>{
            if(err) throw err;
            res.send(docs);
        });
    }catch (err) {
		console.log(err)
	}
	
}

exports.deleteTicket=async(req,res)=>{
    try{
        var deleteticket={
            DeleteDate:req.body.DeleteDate,
            isDelete:req.body.isDelete
        };
        await Tickets.findByIdAndUpdate(req.params.id,{$set:deleteticket},{new:true},(err,docs)=>{
            if(err) throw err;
            res.send(docs);
        });
    }catch (err) {
		console.log(err)
	}
    
}

exports.getTicketbyId=async(req,res)=>{
	
    try{
        if(ObjectId.isValid(req.params.id))
    {    
        await Tickets.findById(req.params.id,(err,docs)=>{
            if(err) throw err;
            console.log(docs)
            res.send(docs);
        });
    }else
    {
        return res.status(200).send("No Record Found with Given Id: "+req.params.id);
    }
    }catch (err) {
		console.log(err)
	}
    
}