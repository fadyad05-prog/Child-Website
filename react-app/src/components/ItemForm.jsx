import React, { useState, useEffect } from 'react'

export default function ItemForm({ initial, onSubmit, disabled=false }){
  const [title, setTitle] = useState(initial?.title || '')

  useEffect(()=>{
    setTitle(initial?.title || '')
  }, [initial])

  const submit = async (e)=>{
    e.preventDefault()
    if(!title) return
    await onSubmit({ title })
    if (!initial) setTitle('')
  }

  return (
    <form onSubmit={submit} style={{marginBottom:12}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" disabled={disabled} />
      <button type="submit" style={{marginLeft:8}} disabled={disabled}>Save</button>
    </form>
  )
}
