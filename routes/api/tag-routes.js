const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');



// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [ { model: Product, through: ProductTag} ]}
  ).then((tagData) => {
    res.json(tagData);
  });
});


//  GET one tags
router.get('/:id', (req, res) => {
    Tag.findAll({
      where: {
        id: req.params.id
      },
      include: [ { model: Product, through: ProductTag} ]}
    ).then((tagData) => {
      res.json(tagData);
    });
  });


// Create a new Tag 
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
      if (req.body.tagIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag.id,
            tag_id,
          };
        });
        return Tag.bulkCreate(tagIdArr);
      }
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData){
        res.status(404).json({message:'No tag found with this id'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete one tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'The specified Tag was not found' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;