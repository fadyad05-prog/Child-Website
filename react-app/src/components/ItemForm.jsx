import React, { useState, useEffect } from 'react'

export default function ItemForm({ initial, onSubmit }){
  const [title, setTitle] = useState(initial?.title || '')

  useEffect(()=>{
    setTitle(initial?.title || '')
  }, [initial])

  const submit = (e)=>{
    e.preventDefault()
    if(!title) return
    onSubmit({ title })
    setTitle('')
  }

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <button type="submit" style={{marginLeft:8}}>Save</button>
    </form>
  )
}
