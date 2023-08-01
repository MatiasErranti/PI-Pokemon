const {Type} = require('../db')
const axios = require('axios')
const { URL_API_TYPES} = process.env;
///usar un bulk create para los type de la api la primera vez, ya despues utilizar la base de datos con un find 
const getTypes = async()=>{
    const typesdb = await Type.findAll()
    if(typesdb.length){
        return typesdb
    } else{
        const types = (await axios.get(URL_API_TYPES)).data.results.map((t)=>{return {name:t.name}})
    await Type.bulkCreate(types)
    return await Type.findAll()
    }


}

module.exports ={
    getTypes
}