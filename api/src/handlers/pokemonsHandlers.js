const {getAllPokemons,getPokemonById,getPokemonByName,postPokemon} = require('../controllers/pokemonsController')

const getPokemonsHandler = async (req,res) =>{
    const {name} = req.query
    console.log(name)
    try {
        if(name){
            const response = await getPokemonByName(name)
             return res.status(200).json(response)
        }
        const response = await getAllPokemons()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPokemonByIdHandler = async (req,res)=>{
    const {id} = req.params;
    try {
        const response = await getPokemonById(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postPokemonHandler = async (req,res) =>{
    const {name,img,hp,attack,defense,speed,height,weight,type}= req.body
    try {
        const response = await postPokemon(name,img,hp,attack,defense,speed,height,weight,type)
                res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    postPokemonHandler,
}