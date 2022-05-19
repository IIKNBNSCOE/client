import axios from 'axios'
import React from 'react'
import Modal from 'react-modal'
import {useTable,usePagination,useSortBy,useGlobalFilter} from 'react-table'
import {useState,useEffect,useMemo} from 'react'
import {TicketURL} from '../config/api'
//import {columns} from './column'
import './tablestyle.css'
import SearchFilter from './SearchFilter'

function ShowTicket(props) {
    const [data,setData]=useState([])
    const [serachitem,setSearchitem]=useState("")
    const [selectedRow,setSelectedRow]=useState({})
    const [dticketno,setDticketno]=useState("")
    const [dticketdesc,setDticketdesc]=useState("")
    const [flag1,setFlag1]=useState(false)
    const [flag2,setFlag2]=useState(false)
    const [flag3,setFlag3]=useState(false)
    const [flag4,setFlag4]=useState(false)
    const [message,setMessage]=useState("")
    
    useEffect(
        ()=>
        {
            axios.get(TicketURL,{
                headers: {
                  authorization: localStorage.getItem("token")
                }})
        .then((res)=>
        {
         let arr=[]
          console.log(res.data)
          arr=res.data
          setData(arr) 
        })
        .catch((err)=>
        {
          console.log(err)
        }) 
        },[props.f,flag1,flag3])
        
     
        
        const column1=useMemo(()=>[
          {
              Header:'TicketNo.',
              accessor:'ticket_no'
          },
          {
              Header:'TicketDesc.',
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
                <div style={{display:"flex",justifyContent:"center"}}>
                  <button style={{width:"5rem",fontSize:"1.3rem",height:"3rem",padding:"0rem"}} onClick={()=>handleEdit(value)} >Edit</button>
                  <button style={{width:"5rem",fontSize:"1.3rem",height:"3rem",padding:"0rem"}} onClick={(e)=>handleDelete(value)}>Delete</button>
                </div>
              )
            }
          
      ],[])
      const data1 = React.useMemo(
        ()=>data.map((item) => ({ ...item, action: item })),[data] 
      );

        const handleDelete=(row)=> {
        setSelectedRow(row)
        setFlag1(true)
        console.log(row)
        }

        const handleEdit=(row)=> {
          setSelectedRow(row)
          setFlag3(true)
          setDticketdesc(row.ticket_desc)
          console.log(row)
          }

        const deleteTicketHandler =(e)=>
        {                                               
            let ticket_no=selectedRow.ticket_no
            console.log(ticket_no)
            axios.delete(TicketURL+`/${ticket_no}`,{ headers: {"authorization": localStorage.getItem("token"), 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }})
      .then((res)=>
      {
           console.log(res.data.message) 
           setMessage(res.data.message)
           setFlag1(false)
           setFlag2(true)

      })
      .catch((err)=>
      {
        console.log(err)
      })

    }

    const updateTicketHandler =(e)=>
        {                                               
            let ticket_no=selectedRow.ticket_no
            let ticket_desc=dticketdesc
            console.log(ticket_no)
            console.log(ticket_desc)
            axios.put(TicketURL+`/${ticket_no}`,{ticket_desc},{ headers: {"authorization": localStorage.getItem("token")}})
      .then((res)=>
      {
           console.log(res.data.message) 
           setMessage(res.data.message)
           setFlag3(false)
           setFlag4(true)

      })
      .catch((err)=>
      {
        console.log(err)
      })

    }

        const table1=useTable({
            columns:column1,
            data:data1
        },useGlobalFilter,useSortBy,usePagination)
       const {getTableProps,
        getTableBodyProps,
        page,
        nextPage,
        canPreviousPage,
        canNextPage,
        previousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setPageSize,
        setGlobalFilter,
        headerGroups,
        prepareRow
    }=table1
    const {pageIndex,globalFilter,pageSize}=state

    
  return (
    <>
    
   <table {...getTableProps()} >
        <thead>
            {
              headerGroups.map((headerGroup)=>
              {
                return <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column=>{
                       
                        return <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                        <span>
                          {column.isSorted?(column.isSortedDesc?<svg className="th-align-left" focusable="false" xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>:
                     <svg className="th-align-right" focusable="false" xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                     <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                 </svg>     ):''}
                        </span>
                        </th>
              })}
               
            </tr>
              })  
            }
            
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                page.map(row=>{
                      prepareRow(row)
                      return(
                    <tr {...row.getRowProps()} >
                        {
                            row.cells.map(cell=>
                                {
                                    return <td {...cell.getCellProps()}>
                                     {cell.render('Cell')}
                                    </td>
                                })
                        }
                    
                    </tr>

                )}
                )
            }
            
        </tbody>
    </table>
        <span>
        <label style={{color:"red",fontSize:"1.5rem"}}>Page {' '}</label>
        <strong >
         <label style={{fontSize:"1.5rem"}}> {pageIndex+1} of {pageOptions.length}</label>
        </strong>{'   '}
        </span>
        <span>
          <label style={{color:"red",fontSize:"1.5rem"}}>Gotopage {' '}</label>
          <input style={{width:"2.5rem"}} type="number" defaultValue={pageIndex+1} onChange={
            (e)=>{
              gotoPage(Number(e.target.value)-1)
            }
          }/>
        </span>
       <span>
      
        {' '}<label style={{color:"red",fontSize:"1.5rem"}}>PageSize{' '}</label>
        <select value={pageSize} onChange={(e)=>setPageSize(Number(e.target.value))} defaultValue={5} style={{width:"3rem"}}>
           
            <option value={5}>{5}</option>
            <option value={10}>{10}</option>
            <option value={20}>{20}</option>
            
          
       
        </select>
       </span>
        < SearchFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      
    <div className='pagination'>
      <button style={{fontSize:"1.5rem",padding:"0.5rem"}} onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button style={{fontSize:"1.5rem",padding:"0.5rem" }} onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
      <button style={{fontSize:"1.5rem",padding:"0.5rem"}} onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
      <button style={{fontSize:"1.5rem",padding:"0.5rem"}} onClick={()=>gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    <Modal
        isOpen={flag1}
        onRequestClose={()=>setFlag1(false)} 
       
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-30%',
          transform: 'translate(-50%, -50%)',
        }}}      
      >
         
       <label><strong>TicketNo.</strong> </label> {selectedRow.ticket_no}{' '}
       <label><strong>TicketDesc.</strong> </label> {selectedRow.ticket_desc}
      
       <div style={{display:"flex"}}>
       <button onClick={deleteTicketHandler}>Delete</button>
       <button onClick={(e)=>{setFlag1(false)}}>Cancel</button>
       </div>
    </Modal>
    <Modal
        isOpen={flag2}
        onRequestClose={()=>setFlag2(false)} 
       
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-30%',
          transform: 'translate(-50%, -50%)',
        }}}      
      >
         
       <label><strong>{message}</strong> </label>       
    </Modal>

    <Modal
        isOpen={flag3}
        onRequestClose={()=>setFlag3(false)} 
       
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-30%',
          transform: 'translate(-50%, -50%)',
        }}}      
      >

        <strong style={{fontSize:"2.5rem"}}>Update Ticket Details</strong> 
        <div style={{display:"flex", flexDirection:"row"}} >
       <label><strong>TicketNo.</strong> </label>
       <label >{selectedRow.ticket_no}{' '}</label>
       </div>
       <div>
       <label style={{display:"block"}}><strong>TicketDesc.</strong> </label> 
       <input style={{display:"block"}} type = "text" value={dticketdesc} onChange={(e)=>{setDticketdesc(e.target.value) }}/>
       </div>
       
       <button onClick={updateTicketHandler}>Update</button>
       <button onClick={(e)=>{setFlag3(false)}}>Cancel</button>
      
      
    </Modal>
    <Modal
        isOpen={flag4}
        onRequestClose={()=>setFlag4(false)} 
       
        style={{content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-30%',
          transform: 'translate(-50%, -50%)',
        }}}      
      >
         
       <label><strong>{message}</strong> </label>       
    </Modal>

    </>
   // <h1>Welcome</h1>
  )
}

export default ShowTicket