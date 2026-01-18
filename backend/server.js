
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;;

app.use(express.json());
app.use(cors());

//db
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB Atlas!'))
    .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
//task model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);



// Create a new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const payload = { user: { id: user._id } };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});



// get tasks
app.get('/api/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// new task create
app.post('/api/tasks', auth, async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            user: req.user.id
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
});

// update, change something
app.put('/api/tasks/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
});

// delete
app.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });


        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

// start of server
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
