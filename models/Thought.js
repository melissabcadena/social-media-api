const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please add reaction text!',
            max: [280, 'Your reaction is too long!']
        }, 
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please add thought text!',
            min: 1,
            max: [260, 'Your thought is too long!']
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }, 
        username: {
            type: String,
            required: true
        }, 
        reactions: [ReactionSchema]
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;