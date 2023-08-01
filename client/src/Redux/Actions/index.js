import {POST_POKEMON,GET_POKEMONS,FILTER_NAME, PAGINATE, GET_ONE_POKEMON,LOADING_DETAILS,LOADING_POKEMONS,CLOSE_FILTER, GET_TYPES} from "./actions-types"
import axios from "axios"

export function postPokemon(info){
    return async function (dispatch) {
        try {
            await axios.post('http://localhost:3001/pokemons',info)
            alert('usuario creado correctamente')
            dispatch({
                type:POST_POKEMON,
                payload: 'ok'
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function getPokemons(){
    return async function(dispatch){
        try {
            const response = await axios.get("http://localhost:3001/pokemons")
            dispatch({
                type:GET_POKEMONS,
                payload: response.data,
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function pokemonsPage(info){
    return {
            type:PAGINATE,
            payload:info,
        }
    }

export function filterName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            dispatch({
                type:FILTER_NAME,
                payload:response.data,
            })
        } catch (error) {
            alert(error.message)
        }
    }
}
export function getOnePokemon(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            dispatch({
                type: GET_ONE_POKEMON,
                payload:response.data
            })
        }
        catch(error){
            alert(error.message)
        }
    }
}

export function loadingDetails(value){
    return {
            type:LOADING_DETAILS,
            payload: value
    }
}

export function loadingPokemons(value){
    return{
        type:LOADING_POKEMONS,
        payload:value
    }
}

export function closeFilter(){
    return{
        type:CLOSE_FILTER,
        payload: false
    }
}

export function getTypes(){
    return async function(dispatch){
        try {
            let response = (await axios.get('http://localhost:3001/types'))
        response = response.data.sort(function (a, b) {
            return a.name.localeCompare(b.name);})
            dispatch({
                type: GET_TYPES,
                payload: response
            })
            
        } catch (error) {
            alert(error.message)
        }
    }
}