import express from 'express';
import connectDB from './config/connectDB.mjs';
import {body, validationResult} from 'express-validator';
import * as exercises from './model/exerciseModel.mjs';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;

connectDB();

//Date validator
function isDateValid(date) {
    // Test using a regular expression. 
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function dateValidator(date) {
    if (!isDateValid(date)) {
        return false;
    } else {
        return true;
    }
}

/**
 * ROUTES
*/

// Get all exercises
app.get('/exercises' , (req , res) => {
    let filter = {};
    exercises.findExercise(filter, '', 0)
        .then(exercises => {
            res.send(exercises)
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});


//Create an exercise
app.post(
    '/exercises',
    body('name').isLength({min: 1}),
    body('sets').isInt({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isString().isIn(['kgs', 'lbs']),
    body('date').exists({checkFalsy: true}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || dateValidator(req.body.date) === false) {
            return res.status(400).json({ Error: "Invalid request" });
        }
        exercises.createExercise(req.body.name, req.body.sets, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            })
            .catch(error => {
                res.status(400).json({Error: 'Request failed'});
            })
        }
);

//Get exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercises => {
            if(exercises !== null) {
                res.json(exercises);
            } else {
                res.status(404).json({Error: 'Not found'});
            }
        })
        .catch(error => {
            res.status(400).json({Error: 'Request failed'});
        })
});

//Update an exercise
app.put(
    '/exercises/:_id',
    body('name').isLength({min: 1}),
    body('sets').isInt({min: 1}),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isString().isIn(['kgs', 'lbs']),
    body('date').exists({checkFalsy: true}),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: "Invalid request" });
        }
        exercises.replaceExercise(req.params._id, req.body.name, req.body.sets, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(numUpdated => {
                if (numUpdated === 1) {
                    res.status(200).json({_id: req.params._id, name: req.body.name, sets: req.body.sets, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date});
                } else {
                    res.status(404).json({Error: 'Resource not found'});
                }
            })
            .catch (error => {
                console.error(error);
                res.status(400).json({Error: 'Request failed'});
            });
    }
);

//Delete an exercise
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deleteCount => {
            if (deleteCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'Resource not found'});
            }
        })
        .catch (error => {
            console.error(error);
            res.status(400).json({Error: 'Request failed'});
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})