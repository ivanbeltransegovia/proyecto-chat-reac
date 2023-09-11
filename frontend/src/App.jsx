import { useState,useEffect } from 'react'
import{io} from 'socket.io-client'
import {UlMensajes,LiMensaje} from './UI-components'
import './App.css'


const socket=io('http://localhost:3000')

function App() {

  const[isConnected,setIsConnected]=useState(false)

  const[nuevomensaje,setnuevomensaje]=useState('')

  const[mensajes,setmensajes]=useState([])

  useEffect(()=>{
    socket.on('connect',()=>setIsConnected(true))

    //coneccion para enviar mensajes

    socket.on('chat_message',(data)=>{
      setmensajes(mensajes=>[...mensajes,data])


    })

    return ()=>{
      socket.off('connect')
      socket.off('chat_message')
    }

  },[])

  const enviarmensaje=()=>{
    //emitir mensaje al servidor
    socket.emit('chat_messge',{
      usuario:socket.id,
      mensaje:nuevomensaje
    })
  }

  return (
    <div className='App'>
      <h1>{isConnected ? 'conentado':'EROR'}</h1>
      <UlMensajes>
        <LiMensaje>
          {mensajes.map(mensaje=>(
            <LiMensaje>{mensaje.usuario}{mensaje.mensaje}</LiMensaje>

          ))}

        </LiMensaje>
      </UlMensajes>

      <input type="text"
          onChange={e=>setnuevomensaje(e.target.value)}
       />
      
      <button onClick={enviarmensaje}>enviar
      </button>


    </div>
  )
}

export default App
