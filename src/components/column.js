export const columns=[
    {
        Header:'TickenNo.',
        accessor:'ticket_no'
    },
    {
        Header:'TickenDesc.',
        accessor:'ticket_desc'
    },
    {
        Header:'CreatedAt.',
        accessor:'createdAt'
    },
    {
        Header:'UpdatedAt.',
        accessor:'updatedAt'
    },
    {
        Header: "Action",
        accessor: "action",
        Cell: ({ value }) => (
          <div style={{display:"flex"}}>
            <button style={{width:"5rem",fontSize:"1rem",height:"3rem",padding:"0rem"}} onClick={(e)=>handleEdit(value)} >Edit</button>
            <button style={{width:"5rem",fontSize:"1rem",height:"3rem",padding:"0rem"}} onClick={(e)=>alert("delete pressed")}>Delete</button>
          </div>
        )
      }
    
]
function handleEdit(row) {
    alert(row);
  }

