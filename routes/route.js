'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const commentModelSchema = new mongoose.Schema({
  name: { type: String },
  comments: { type: String },
  mbti: { type: String },
  enneagram: { type: String },
  zodiac: { type: String },
  likes: {type: Number }
});

const CommentModel = mongoose.model('Comment', commentModelSchema);

// Init Data for comments with ID 1
const comments = [{
  "name": "A Martinez",
  "comments": `I want Elon Musk to be an INTJ more than anyone, but he isn't... People think that Elon has Ni because of his long-term vision for humanity becoming a multi-planetary species, but the way he got to this conclusion is through Ti-Ne - by envisioning all the possibilities and choosing the Ti path the makes the most sense. Elon's mannerisms, jokes, are very based on Ne. He has so much Ne that I even considered ENTP, but INTP is the most likely choice; watch the video if you're still not convinced.`,
  "mbti": "ISFJ",
  "enneagram": "1w2",
  "zodiac": "Aries",
  "likes": 2,
},
{
  "name": "Marquez",
  "comments": `I want Elon Musk to be an INTJ more than anyone, but he isn't... People think that Elon has Ni because of his long-term vision for humanity becoming a multi-planetary species, but the way he got to this conclusion is through Ti-Ne - by envisioning all the possibilities and choosing the Ti path the makes the most sense. Elon's mannerisms, jokes, are very based on Ne. He has so much Ne that I even considered ENTP, but INTP is the most likely choice; watch the video if you're still not convinced.`,
  "mbti": "ISFJ",
  "enneagram": "6w5",
  "zodiac": "Leo",
  "likes": 1
},
{
  "name": "Channiaz",
  "comments": `I want Elon Musk to be an INTJ more than anyone, but he isn't... People think that Elon has Ni because of his long-term vision for humanity becoming a multi-planetary species, but the way he got to this conclusion is through Ti-Ne - by envisioning all the possibilities and choosing the Ti path the makes the most sense. Elon's mannerisms, jokes, are very based on Ne. He has so much Ne that I even considered ENTP, but INTP is the most likely choice; watch the video if you're still not convinced.`,
  "mbti": "ESTP",
  "enneagram": "2w1",
  "zodiac": "Taurus",
  "likes": 4
}];

CommentModel.insertMany(comments)
  .then(function () {
    console.log("Data inserted successfully");
  })
  .catch(function (error) {
    console.error(error);
});

module.exports = function () {
  router.get('/comments', async function (req, res, next) {
    const sortBy = req.query.sortBy; // Get the value of the 'sortBy' query parameter
    const mbtiFilter = req.query.mbti; // Get the value of the 'mbti' query parameter
    const enneagramFilter = req.query.enneagram; // Get the value of the 'enneagram' query parameter
    const zodiacFilter = req.query.zodiac; // Get the value of the 'zodiac' query parameter

    try {
      let comments;      

      if (sortBy === 'best') {
        // Sort by likes descending
        comments = await CommentModel.find().sort({ likes: -1 });
      } else if (sortBy === 'recent') {
        // Sort by id descending
        comments = await CommentModel.find().sort({ _id: -1 });
      } else {
        // Default behavior (no sorting specified)
        comments = await CommentModel.find();
      }

      // Apply filters dynamically
      if (mbtiFilter !== undefined) {
        comments = comments.filter(comment => comment.mbti === mbtiFilter);
      }
      if (enneagramFilter !== undefined) {
        comments = comments.filter(comment => comment.enneagram === enneagramFilter);
      }
      if (zodiacFilter !== undefined) {
        comments = comments.filter(comment => comment.zodiac === zodiacFilter);
      }
  
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve comments' });
    }
  });

  router.post('/comments', async function (req, res, next) {   
    const { name, comments, mbti, enneagram, zodiac } = req.body;

    // Valid MBTI types
    const validMbtiTypes = [
      'INFP', 'INFJ', 'ENFP', 'ENFJ', 'INTJ', 'INTP',
      'ENTP', 'ENTJ', 'ISFP', 'ISFJ', 'ESFP', 'ESFJ',
      'ISTP', 'ISTJ', 'ESTP', 'ESTJ'
    ];

    // Valid Enneagram types
    const validEnneagramTypes = [
      '1w2', '2w3', '3w2', '3w4', '4w3', '4w5',
      '5w4', '5w6', '6w5', '6w7', '7w6', '7w8',
      '8w7', '8w9', '9w8', '9w1'
    ];

    // Valid Enneagram types
    const validZodiacTypes = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];

    try {
      // Validate name (must be a non-empty string)
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({message:'Invalid name'});
      }

      // Validate Comment (must be a non-empty string)
      if (typeof comments !== 'string' || comments.trim() === '') {
        return res.status(400).json({message:'Invalid comments'});
      }

      // Validate MBTI type
      if (!validMbtiTypes.includes(mbti)) {
        return res.status(400).json({message:'Invalid MBTI type'});
      }

      // Validate Enneagram type
      if (!validEnneagramTypes.includes(enneagram)) {
        return res.status(400).json({message:'Invalid Enneagram type'});
      }

      // Validate Zodiac type
      if (!validZodiacTypes.includes(zodiac)) {
        return res.status(400).json();
      }

      const newComment = new CommentModel({
        name: name,
        comments: comments,
        mbti: mbti,
        enneagram: enneagram,
        zodiac: zodiac,
        likes: 0
      });

      await newComment.save();

      res.status(201).json({message:'Comment saved successfully'});
    } catch (err) {
      console.error(err);
      res.status(500).json({message:'Failed to save comment'});
    }
  });

  router.patch('/comments/:id', async function (req, res, next) {
    try {
      const commentId = req.params.id;
  
      // Find the comment by ID
      const existingComment = await CommentModel.findById(commentId);
  
      if (!existingComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      // Update the likes (increment by 1)
      existingComment.likes += 1;
  
      // Save the updated comment
      await existingComment.save();
  
      res.status(200).json({ message: 'Likes updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update likes' });
    }
  });
  

  return router;
}