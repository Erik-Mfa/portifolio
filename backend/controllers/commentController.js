const Comment = require('../models/Comment');

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Create a new comment
const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Error saving comment' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

module.exports = { getComments, createComment, deleteComment };
