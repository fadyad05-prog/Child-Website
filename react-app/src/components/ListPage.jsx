import React, { useState } from 'react'
import useItems from '../hooks/useItems'
import ItemForm from './ItemForm'

export default function ListPage(){
  const { items, loading, error, add, remove } = useItems()
  const [editing, setEditing] = useState(null)

  return (
    <div style={{padding:20}}>
      <h2>Items</h2>
      <ItemForm onSubmit={async (data)=>{ await add(data) }} />
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>Error: {error.message}</p>}
      <ul>
        {items.map(i => (
          <li key={i.id} style={{marginBottom:8}}>
            <strong>{i.title}</strong>
            <div style={{display:'inline-block', marginLeft:10}}>
              <button onClick={()=>setEditing(i)}>Edit</button>
              <button onClick={()=>remove(i.id)} style={{marginLeft:6}}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editing && (
        <div style={{marginTop:20}}>
          <h3>Edit</h3>
          <ItemForm initial={editing} onSubmit={async (data)=>{/* TODO: wire edit */}} />
        </div>
      )}
    </div>
  )
}
