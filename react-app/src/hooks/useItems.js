import { useState, useEffect, useCallback } from 'react'
import { getItems, createItem, updateItem, deleteItem } from '../services/api'

export default function useItems(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async ()=>{
    setLoading(true)
    setError(null)
    try{
      const res = await getItems()
      setItems(res.data)
    }catch(err){
      setError(err)
    }finally{
      setLoading(false)
    }
  }, [])

  useEffect(()=>{ fetch() }, [fetch])

  const add = async (payload)=>{
    setLoading(true)
    try{
      const res = await createItem(payload)
      setItems(s => [...s, res.data])
    }catch(err){ setError(err) }
    finally{ setLoading(false) }
  }

  const edit = async (id, payload)=>{
    setLoading(true)
    try{
      const res = await updateItem(id, payload)
      setItems(s => s.map(i => i.id === id ? res.data : i))
    }catch(err){ setError(err) }
    finally{ setLoading(false) }
  }

  const remove = async (id)=>{
    setLoading(true)
    try{
      await deleteItem(id)
      setItems(s => s.filter(i => i.id !== id))
    }catch(err){ setError(err) }
    finally{ setLoading(false) }
  }

  return { items, loading, error, fetch, add, edit, remove }
}
