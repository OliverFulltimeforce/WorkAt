import { useEffect, useState } from "react"
import FormView from "../../../../components/forms/FormView";
import {RiDownloadFill as DonwloadIcon, RiArrowLeftRightFill as SwitchIcon} from 'react-icons/ri'
import TableExpert from "../../../../components/tables/TableExpert";


const ExpertView = () => {
    const [toggleStatus, setToggleStatus] = useState(false)
    const [toggleComparingView, setToggleComparingView] = useState(true)
    const [candidates, setCandidates] = useState([])
  
    useEffect(()=>{
        window.document.title = 'WorkAt - Expert';
    },[])
  return (
    <div>
        <div className="w-full">
            <FormView toggleStatus={toggleStatus} setToggleStatus={setToggleStatus} candidates={candidates} setCandidates={setCandidates}/>
            {/* Buttons Holder */}
            <div className="flex my-6">
                <div className=" flex items-center justify-center w-12 h-12 bg-[#475564] rounded-full cursor-pointer">
                    <DonwloadIcon className="text-3xl text-[#FFFFFF] "/>
                </div>
                <div onClick={()=>setToggleComparingView(!toggleComparingView)} className="ml-6 flex items-center justify-center w-12 h-12 bg-[#00ADEF] rounded-full cursor-pointer">
                    <SwitchIcon className="text-3xl text-[#FFFFFF] "/>
                </div>
            </div>
     
            <TableExpert/>

            {/* Recandidate Holder */}
            {/* <div className="absolute bottom-0 left-0 bg-gradient-to-t from-[#D3D5D8] w-screen flex items-center justify-center h-28">
                <button className="bg-[#00ADEF] text-[#fff] font-bold px-12 py-4 rounded-md ">
                    RECANDIDATE
                </button>
            </div> */}

            {/* Downloading Holder */}
            {/* <div className="absolute bottom-0 left-0 bg-[#F9F9F9] w-screen flex items-center justify-center h-28">
                <span className="text-[#00ADEF] font-bold mx-4">
                    DOWNLOADING
                </span>
                <DownloadingProgressIcon style={{color:"#00ADEF"}}/>
            </div> */}
        
        </div>       
    </div>
  )
}

export default ExpertView