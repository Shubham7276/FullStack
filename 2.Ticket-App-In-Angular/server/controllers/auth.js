const User = require("../models/user")
const jwt = require("jsonwebtoken") // to generate signed token
const expressJwt = require("express-jwt") // for authorization check


exports.signup = async (req, res) => {
	console.log(req.body)
	try {
		const user = new User(req.body)

		await user.save((err, user) => {
			if (err) {
				console.log(err)
				return res.json({ err })
			}
			res.status(200).json({ user })
		}) 
	} catch (err) {
		console.log(err)
		
	}
}

exports.signin = async (req, res) => {
	// find the user based on email
	try {
		const { username, password } = req.body
		await User.findOne({ username }, (err, user) => {
			if (err || !user) {
				return res.json({
					error: "User with that email does not exist. Please signup",
				})
			}
			// if user is found make sure the email and password match
			// create authenticate method in user model
			if (!user.authenticate(password)) {
				return res.json({
					error: "Email and password dont match",
				})
			}
			// generate a signed token with user id and secret
			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
			// persist the token as 't' in cookie with expiry date
			res.cookie("t", token, { expire: new Date() + 9999 })
			// return response with user and token to frontend client
			const { _id, firstname, lastname,username, email, authorities } = user
			return res.json({user,accessToken:token })
		})
	} catch (err) {
		console.log(err)
	}
}

exports.signout = (req, res) => {
	res.clearCookie("t")
	res.json({ message: "Signout success" })
}

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id
	if (!user) {
		return res.status(403).json({
			error: "Access denied",
		})
	}
	next()
}


