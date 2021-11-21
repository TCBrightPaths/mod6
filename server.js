const express = require('express')
const path = require('path')

//adding rollbar
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f594a00ad0804b7286d4e757e19b8ef5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')


app.use(express.json())

app.use(express.static('public')) //Added this to bring in the docs in the public folder.

//To fix CORS error. 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

//Handles the Get request for stylesheet.
app.get('/styles', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.css"))
    
})

//Handles the Get request for functions related to the buttons on the page. 
app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.js"))
    
})

app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(bots)
    } catch (error) {
        Rollbar.error('Cannot show bots')
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        rollbar.critical('Cannot Get bots')
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.wins++
            res.status(200).send('You won!')
        }
    } catch (error) {
        rollbar.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        rollbar.warning('Warning: Cannot load stats')
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})