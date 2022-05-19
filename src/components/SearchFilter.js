import React from 'react'

function SearchFilter({filter,setFilter}) {
  return (
    <div>
    <label style={{fontSize:"1.5rem"}}>Search:</label>{' '}
    <input value={filter||''} onChange={(e)=>setFilter(e.target.value)}/>
    </div>
  )
}

export default SearchFilter