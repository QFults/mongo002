const router = require('express').Router()
const { Item, User } = require('../models')
const passport = require('passport')

// GET all items
// router.get('/items', (req, res) => {
//   Item.find()
//     .populate('user')
//     .then(items => res.json(items))
//     .catch(err => console.log(err))
// })

// POST one item
router.post('/items', passport.authenticate('jwt'), (req, res) => {
  Item.create({
    text: req.body.text,
    isDone: req.body.isDone,
    user: req.user._id
  })
    .then(item => {
      User.findByIdAndUpdate(item.user, { $push: { items: item._id } })
        .then(() => res.json(item))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/items/bulk', passport.authenticate('jwt'), (req, res) => {
  const items = req.body.map(item => ({
    ...item,
    user: req.user._id
  }))

  Item.create(items)
    .then(items => {
      const itemIds = items.map(item => item._id)
      User.findById(req.user._id)
        .then(user => {
          const allItems = [...user.items, ...itemIds]
          User.findByIdAndUpdate(req.user._id, { items: allItems })
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
        })
    })
})

// PUT one item
router.put('/items/:id', passport.authenticate('jwt'), (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err))
})

// DELETE one item
router.delete('/items/:id', passport.authenticate('jwt'), (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
