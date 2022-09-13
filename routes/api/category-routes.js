const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [ { model: Product} ]}
  ).then((tagData) => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  Category.findAll({
    where: {
      id: req.params.id
    },
    include: [ { model: Product} ]}
  ).then((tagData) => {
    res.json(tagData);
  });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(catData => res.json(catData))
    .catch(err => {
      res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'The specified category was not found' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.delete('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCatData => {
      if (!dbCatData) {
        res.status(404).json({ message: 'The specified category was not found' });
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
