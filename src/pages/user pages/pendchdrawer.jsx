import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Pane, Tablist, Tab} from 'evergreen-ui'
import {FaListAlt} from 'react-icons/fa'
import { Avatar } from 'evergreen-ui'
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {GrInProgress} from 'react-icons/gr'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {MdQuestionAnswer} from 'react-icons/md'
import {BiMessageRoundedError} from 'react-icons/bi'
import {MdAssignmentAdd} from "react-icons/md"
import {AiOutlineFileDone} from'react-icons/ai'

export default function PendchDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Tenders', 'Me'], [])
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();
  const [bids,setBids]=useState([]);
  const [BidsisFetching,setBidsIsFetching]=useState(true)
  const [errorBidsFetching,setErrorBidsFetching]=useState(false)
  const [Cbids,setCBids]=useState([]);
  const [CBidsisFetching,setCBidsIsFetching]=useState(false)
  const [errorCBidsFetching,setErrorCBidsFetching]=useState(false)
  const [ACbids,setAcBids]=useState([]);
  const [AcBidsisFetching,setAcBidsIsFetching]=useState(false)
  const [errorAcBidsFetching,setErrorAcBidsFetching]=useState(false)
  
  const fetchBids=()=>{

    setBidsIsFetching(true)
    fetch('http://localhost:3001/getbids',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setBids(res)
      console.log(res)
      setBidsIsFetching(false)
    })
    .catch((err)=>{
      setBids([])
      setErrorBidsFetching(true)
    })
  }

  const fetchCancelledBids=()=>{
    setCBidsIsFetching(true)
    fetch('http://localhost:3001/getbids/cancelled',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setCBids(res)
      console.log(res)
      setCBidsIsFetching(false)
    })
    .catch((err)=>{
      setCBids([])
      setErrorCBidsFetching(true)
    })
  }

  const fetchActiveBids=()=>{
    setAcBidsIsFetching(true)
    fetch('http://localhost:3001/getbids/active',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setAcBids(res)
      console.log(res)
      setAcBidsIsFetching(false)
    })
    .catch((err)=>{
      setCBids([])
      setErrorAcBidsFetching(true)
    })
  }

  useEffect(()=>{
    fetchUserData();fetchBids();fetchCancelledBids();fetchActiveBids()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
    //    console.log(res)
       setIsFetching(false)
     })
    //  .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
   }

  return (
    <Pane className='row container-fluid pb-5' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12" style={{height:'auto',backgroundColor:"#e1f5e8"}}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
             
            >
               {tab}
            </Tab>
          )
        })}
        {isFetching?
        <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
           <p className='text-center text-break m-0'>Fetching Account Details...</p>
         </div>
        :
        (errorFetching?'error':
          <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
          <Avatar
           src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
           name="Alan Turing"
           size={40}
          />
          <h6 className='text-center'>{JSON.parse(localStorage.getItem('user')).name}</h6>
          <p className='fs-9 m-0 text-break text-center'>{JSON.parse(localStorage.getItem('user')).email}</p>
          <p className='fs-9 m-0 text-break text-center'>Procurement Endorsing Committee Head at : </p>
          <p className='fs-9 m-0 text-break text-center fw-bold'>{JSON.parse(localStorage.getItem('user')).pBody}</p>
         </div>
        )}
        
      </Tablist>
      <Pane className="col-md-9 col-12 " style={{height:'auto'}}>
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'inline-block' : 'none'}
            key={tab}
            role="tabpanel"
            className='container-fluid'
          >
            {tab=="Manage Tenders"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
              <h3 className='m-0 text-center fs-6'>Manage Bids</h3>
              <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
              <div id='pro' onClick={() => {navigate(`/userpage/pendch/${id}/requiest-bids`)}} style={{cursor:"pointer"}}  className='cursor-pointer col-6  col-md-4 col-sm-12 d-flex flex-column align-items-center justify-content-center'>
                    <MdAssignmentAdd style={{width:'3rem',height:'3rem',color:'#aaf507'}} />
                    <p className='m-0 fs-6 text-center'>Approve Requiest Bids</p>
                </div>
                <div id='pro' onClick={()=>{navigate(`/userpage/pendch/${id}/approved-tenders`)}} style={{cursor:"pointer"}} className='col-6  col-md-4 col-sm-12 d-flex flex-column align-items-center justify-content-center'>
                    <AiOutlineFileDone  style={{width:'4rem',height:'4rem',color:'#e04d0d'}} />
                    <p className='m-0 fs-6 text-center'>Approved Tenders</p>
                </div>
              </div>
            </div>
            :
            (tab=="Me"?
            <p>dfd</p>:
            (tab=="Other"?
            <p>heh</p>:
            <p>hi</p>))}
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
