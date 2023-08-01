const { Router } = require('express');
const pokemonsRouter = require('./pokemonRouter')
const typeRouter = require('../routes/typeRouter')


const router = Router();

router.use('/pokemons', pokemonsRouter)
router.use('/types', typeRouter)


module.exports = router;
