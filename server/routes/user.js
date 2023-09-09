const express = require('express')
const User = require('../models/User')
const moment = require('moment')
const router = express.Router()

// Router to POST data
router.post('/', async (req, res) => {
  try {
    const { mail, from, to, rdate, rtime } = req.body
    const existingUser = await User.findOne({ mail, from, to, rdate })

    if (existingUser) {
      console.log("Data exists")
      return res.status(200).json(existingUser)
    }
    const user = await User.create({ mail, from, to, rdate, rtime })
    return res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

//Router to send Connection Requests
router.post('/con', async (req, res) => {
  try{
    const {id, mail} = req.body
    const connectionTo = await User.findById(id)
    if(connectionTo){
      return res.status(200).json(connectionTo)
    }
  }catch(error){
    console.log(error)
  }
})

// Router to get Data
router.get('/', async (req, res) => {
  try {
    // console.log(req.query.rdate)
    const users = await User.find({
      from: req.query.from,
      to: req.query.to,
      rdate: req.query.rdate
    }).sort({ rtime: 1 })
    // const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})

module.exports = router
