import React,{useEffect} from 'react'
import { useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { postPokemon,getTypes } from '../../Redux/Actions';
import './formulario.css'

const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

const validate= (state,name)=>{
  let error = {}
  if(name ==='name'){
    if(state.name == '') error.name = 'El pokemon debe tener un nombre'
    if(state.name !== '' && !stringRegExp.test(state.name)){error.name = 'El nombre no debe contener cosas raras'}
    if(state.name.split('').map((leter)=>{if(Number(leter))error.name ='El nombre no debe contener numeros'})){}
  }
  // if(name ==='hp'){
  //   if(state.hp !== '')setErrors({...errors,hp:''})
  //   else{setErrors({...errors,hp:'El pokemon debe tener vida'})}
  //   if(state.hp > 255)setErrors({...errors,hp:'El maximo de puntos de vida para un Pokemon es de 255'})
  //   if(state.hp < 1)setErrors({...errors,hp:'El minimo de puntos de vida para un Pokemon es de 1'})
  //   return
  // }
  // if(name ==='attack'){
  //   if(state.attack !== '')setErrors({...errors,attack:''})
  //   else{setErrors({...errors,attack:'El pokemon debe tener ataque'})}
  //   if(state.attack > 255)setErrors({...errors,attack:'El maximo de puntos de ataque para un Pokemon es de 255'})
  //   if(state.attack < 1)setErrors({...errors,attack:'El minimo de puntos de ataque para un Pokemon es de 1'})
  //   return
  // }
  // if(name ==='height'){
  //   if(state.attack !== '')setErrors({...errors,attack:''})
  //   else{setErrors({...errors,attack:'El pokemon debe tener height'})}
  //   if(state.attack > 255)setErrors({...errors,attack:'la altura maxima es de 999'})
  //   if(state.attack < 1)setErrors({...errors,attack:'la altura maxima es de 1'})
  //   return
  // }
  // if(name ==='weight'){
  //   if(state.attack !== '')setErrors({...errors,attack:''})
  //   else{setErrors({...errors,attack:'El pokemon debe tener weight'})}
  //   if(state.attack > 255)setErrors({...errors,attack:'El maximo de weight es de 999'})
  //   if(state.attack < 1)setErrors({...errors,attack:'El minimo de weight 1'})
  //   return
  // }
  // if(name ==='defense'){
  //   if(state.defense !== '')setErrors({...errors,defense:''})
  //   else{setErrors({...errors,defense:'El pokemon debe tener defensa'})}
  //   return
  // }
  // if(name ==='img'){
  //   if(state.img !== '')setErrors({...errors,img:''})
  //   else{setErrors({...errors,img:'El pokemon debe tener imagen'})}
  //   return
  // }
  // if(name ==='type'){
  //   if(state.type !== '')setErrors({...errors,type:''})
  //   else{setErrors({...errors,type:'El pokemon debe tener algun tipo'})}
  //   return
  // }
  return error
}


const Formulario = () => {

  const dispatch = useDispatch()
  const types = useSelector(state => state.types);

  const [state,setState] = useState({
    name:'',
    hp:1,
    attack:1,
    defense:1,
    speed:1,
    height:1,
    weight:1,
    img:'',
    types:[],
  });

  const [errors,setErrors] = useState({
    name:'',
    hp:'',
    attack:'',
    height:'',
    weight:'',
    defense:'',
    img:'',
    types:''
  })

  useEffect(()=>{
    dispatch(getTypes())
  },[])
 

  const handleChange=(e)=>{

     if ((e.target.name === 'name')  && (e.target.value.length>1)){
       if (!stringRegExp.test(e.target.value) ) {
        console.log(errors)
        return false
     }
    }
    if ((e.target.name === 'name')  && (e.target.value.length>13)){
      setErrors({...errors, [e.target.name]:'El nombre del Pokemon debe ser inferior a 12 caracteres'})
      return false
   }

     if ((e.target.name === 'height') || (e.target.name === 'weight')) {
       if (!numberRegExp.test(e.target.value) && e.target.value.length !== 0) {
        setErrors({...errors, [e.target.name]:'999 is max posibility'})
        console.log(errors)
        return false
      }
     }
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...state,
      [e.target.name]:e.target.value
    }, e.target.name))
  }
  // const handleChangeType=(e)=>{
  //   setState({
  //     ...state,
  //     type: [...state.type] + e.target.value
  //   })
  //   console.log(state)
  // }
  function handleChangeType(e) {

    if (e.target.value === "0") return;

      if (state.types.filter(type => (type.name === e.target.value)).length===0) {

        let newType = {"name": e.target.value};
        setState({
          ...state,
          types: [...state.types, newType]
        });

        setErrors(validate({
          ...state,
          types: [...state.types, newType]
        } ,e.target.name));

        
        if (state.types.length === 2 - 1) {
          e.target.disabled = true;
        }  
      
    }
    e.target.value = "0";
  }
  
  const handlerClose =(e)=>{
    let newTypes = state.types.filter(type => type.name !== e.target.value);
          setState({
                ...state,
                types: newTypes
              });       

           if (state.types.length < 2+1) {
            document.getElementById("typesSelect").disabled = false;
          }

          setErrors(validate({
            ...state,
            types: newTypes
          }));
  }

  const onChangeRange=(e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });      
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(state.img && state.name && state.height && state.weight && state.types.length > 0 && Object.keys(errors).length === 0){
      dispatch(postPokemon(state))
    }
    else{ return false}
  }
  
  return (
    <div className='div-form'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='div-title'>
          <h1 className='title'>Create Pokemon</h1>
        </div>
        <div className='div-container-inputs'>
          <div className='inputsshorts'>
            <div className='name-img'>
              <div className='back'>
                <label>Name :</label>
                <input value={state.name} placeholder='Name' type="text" name='name' onChange={handleChange}/>
                <p className='errors'>{errors && errors.name}</p>
              </div>
            </div>
            <div className='name-img'>
              <div className='back'>
                <label>Img :</label>
                <input value={state.img} placeholder='Url img' type="text"  name='img' onChange={handleChange}/>
                <p className='errors'>{errors && errors.img}</p>
              </div>
            </div>
          </div>
          <div className='inputsshorts'>
            <div className='dos-inputs'>
              <div className='name-img'>
                <div className='back'>
                  <label>Height :</label>
                  <input value={state.height} placeholder='1  ⇄  999' type="text"  name='height' className='inputshort' onChange={handleChange}/>
                  <p className='errors'>{errors && errors.height}</p>
                </div>
              </div>
              <div className='name-img'>
                <div className='back'>
                  <label>Weight :</label>
                  <input value={state.weight} placeholder='1  ⇄  999' type="text"  name='weight' className='inputshort' onChange={handleChange}/>
                  <p className='errors'>{errors && errors.weight}</p>
                </div>
              </div>
            </div>
            <div className='aa'>
              <div className='tiitle'>
              <label className='blue-label'>TYPES:</label>
              </div>
              <div  className='types' >
              <div className='first-div'>
              <select defaultValue="0" id="typesSelect" name="types" onChange={handleChangeType} className='select'>
                <option value="0">Select Types</option>
                {types.map((type, index )=> (
                <option key={index} value={ type.name }>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                ))}
              </select>
            </div> 
            <div className='your-types'>
              <div className='div-types-ready'>
              {state.types.map((type, index) => (
              <div key={index} className='type-ready'>
                <span className='name-span'>{type.name[0].toUpperCase() + type.name.slice(1)}</span>
                <button value={type.name} onClick={handlerClose}>X</button>
              </div>
              ))}
            </div>  
            </div>
          </div>
          </div>
          </div>
        <div className='itemContainerRange'>
          <div className='stats'>
            <div className='rangeGroup'>
              <span className='labelRange'>HP</span>
              <input type="range"  name="hp" onChange={onChangeRange}
                min={1} max={255} value={state.hp}/>
              <span className='labelRangeNumber'>{state.hp}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>DEFENSE</span>
              <input type="range"  name="defense" onChange={onChangeRange}
                min={1} max={255} value={state.defense}/>
              <span className='labelRangeNumber'>{state.defense}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>ATTACK</span>
              <input type="range"  name="attack" onChange={onChangeRange}
                min={1} max={255} value={state.attack}/>
              <span className='labelRangeNumber'>{state.attack}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>SPEED</span>
              <input type="range"  name="speed" onChange={onChangeRange}
                min={1} max={255} value={state.speed}/>
              <span className='labelRangeNumber'>{state.speed}</span>
            </div>
          </div>
        </div>
      </div>
        <input value='Create' type='submit' />
      </form>
    </div>
  )
}

export default Formulario