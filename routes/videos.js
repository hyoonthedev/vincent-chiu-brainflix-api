const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();
const { API_URL, PORT } = process.env;
const { v4: uuidv4 } = require('uuid');

function getVideos() {
    const videosJson = fs.readFileSync("./data/videos.json");
    return JSON.parse(videosJson);
}

function addVideos(addedVideo) {
    fs.writeFileSync("./data/videos.json", JSON.stringify(addedVideo))
}

router.route('/')
    .get(function (req, res) {
        let videos = getVideos()
        res.status(200).json(videos.map((video) => {
            return {
                id: video.id,
                title: video.title,
                channel: video.channel,
                image: video.image
            }
        })
    )})

    .post(function (req, res) {
        const newVideo = {
         id: uuidv4(),
         title: req.body.title,
         channel: "",
         image: `${API_URL}:${PORT}/images/image9.jpeg`,
         description: req.body.description,
         views: 0,
         likes: 0,
         duration: 0,
         video: "https://project-2-api.herokuapp.com/stream",
         timestamp: Date.now(),
         comments: []
        }
        const videoList = getVideos();
        videoList.push(newVideo)

        addVideos(videoList)
        res.status(201).json(newVideo)
     })


router.route('/:id')
    .get(function (req, res) {
        let videos = getVideos()
        const foundVideos = videos.find((video) => {
        let foundVideo = video.id === req.params.id
        return foundVideo
        })
    if (!foundVideos) {
        res.status(404).json({
        message: "Video not found"
    })
    }else {
        res.send(foundVideos)}
    })

module.exports = router;