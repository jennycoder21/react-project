import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import Course from '../models/Course.js';

const router = express.Router();

// ✅ 1. Teacher creates course
router.post('/create', protect, restrictTo('teacher'), async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const course = await Course.create({
      title,
      description,
      category,
      teacher: req.user._id
    });

    res.status(201).json({ message: '✅ Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ 2. All users can view courses
router.get('/', protect, async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ 3. Students enroll in a course
router.post('/:id/enroll', protect, restrictTo('student'), async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({ message: '🎉 Enrolled successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
