const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const local = require('./strategies/local')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const store = new session.MemoryStore();

app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 300000},
    saveUninitialized: false,
    resave: false,
    store
}))

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const moviesRouter = require('./routes/movies')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const myMoviesRouter = require('./routes/myMovies')

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser("some secret"))

app.use('/movies', moviesRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/myMovies', myMoviesRouter)

app.listen(3001, () => console.log('Server is Up'))