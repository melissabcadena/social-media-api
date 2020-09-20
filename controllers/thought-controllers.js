const { Thought, User } = require('../models');

const thoughtController = {

    // Thought Controllers 

    // get all thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(500).json(err);
        });
    },
    // Get a single thought by its ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    // POST new thought and push thought to associated user
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        })
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought with this id! '});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }
            return User.findOneAndUpdate(
                { thoughts: params.id },
                { $pull: { thoughts : params.id } },
                { new: true }
            )
        })

        .then((dbUserData) => {

            if(!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id'});
            }
            res.json({ message: 'Thought has been deleted' })
        })
        .catch((err) => {
            console.log(err)
            res.json(err);
        });
    },

    // Reaction Controllers 

    // create reaction stored in single thoughts reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete reaction by id
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { runValidators:true, new: true }
        )
          .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id' });
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
      }
}


module.exports = thoughtController;