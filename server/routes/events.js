// grab the things we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// import models
var Events = require('../models/events');

// create router
var eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.route('/')
    // get all events
    .get(function(req, res, next) {
        Events.find({}, function(err, events) {
            if (err) next(err);
            res.json(events);
        });
    })
    // place a event
    .post(function(req, res, next) {
        Events.create(req.body, function(err, event) {
            if (err) next(err);

            //var name = event.name;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the event with name ');
        });
    });

eventRouter.route('/:eventId')
    // get a specific event
    .get(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);
            res.json(event);
        });
    })
    // update a specific event
    .put(function(req, res, next) {
        Events.findByIdAndUpdate(req.params.eventId, {
            $set: req.body
        }, {
            new: true
        }, function(err, event) {
            if (err) next(err);
            res.json(event);
        });
    })
    // delete a specific event
    .delete(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);

            event.remove({});
            res.json(event);
        });
    });

eventRouter.route('/:eventId/sessions')
    // get all sessions of a specific event
    .get(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);
            res.json(event.sessions);
        });
    })
    // place a event
    .post(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);

            event.sessions.push(req.body);
            event.save(function(err, event) {
                if (err) next(err);
                console.log('Posted a Event Session!');

                res.json(req.body);
            });
        });
    });

eventRouter.route('/:eventId/sessions/:sessionId')
    // get a specific event
    .get(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);
            res.json(event.sessions.id(req.params.sessionId));
        });
    })
    // update a specific event
    .put(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);

            if (req.body.name) {
                event.sessions.id(req.params.sessionId).name = req.body.name;
            }
            if (req.body.creatorName) {
                event.sessions.id(req.params.sessionId).creatorName = req.body.creatorName;
            }
            if (req.body.duration) {
                event.sessions.id(req.params.sessionId).duration = req.body.duration;
            }
            if (req.body.level) {
                event.sessions.id(req.params.sessionId).level = req.body.level;
            }
            if (req.body.abstract) {
                event.sessions.id(req.params.sessionId).abstract = req.body.abstract;
            }

            event.save(function(err, event) {
                if (err) next(err);
                console.log('Updated Event Session!');

                res.json(event.sessions.id(req.params.sessionId));
            });
        });
    })
    // delete a specific session
    .delete(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);

            event.sessions.id(req.params.sessionId).remove();

            event.save(function(err, newEvent) {
                if (err) next(err);
                console.log('Deleted the Session!')

                res.json(newEvent.sessions);
            });
        });
    });

eventRouter.route('/:eventId/sessions/:sessionId/vote')
    // update a specific event
    .put(function(req, res, next) {
        Events.findById(req.params.eventId, function(err, event) {
            if (err) next(err);

            if (event.sessions.id(req.params.sessionId).votedUsers.indexOf(req.body.userId) === -1) {
                event.sessions.id(req.params.sessionId).upVoteCount += req.body.vote;
                event.sessions.id(req.params.sessionId).votedUsers.push(req.body.userId);

                event.save(function(err, newEvent) {
                    if (err) next(err);
                    console.log('Updated Event Session!');

                    res.json({ "status": "success", "data": newEvent.sessions.id(req.params.sessionId) });
                });
            } else {
                console.log('Event Session not Updated!');
                res.json({ "status": "failed", "data": event.sessions.id(req.params.sessionId) });
            }
        });
    });

// export router
module.exports = eventRouter;