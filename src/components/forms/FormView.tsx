import { useState } from 'react'
import {AiOutlineUp as ArrowUp, AiOutlineDown as ArrowDown} from 'react-icons/ai'
import { WithContext as ReactTags } from 'react-tag-input'
import '../../assets/scss/FormView.scss'
import InputTag from '../inputs/InputTag'

interface Props {
    toggleStatus: boolean,
    setToggleStatus: any
}

const FormView: React.FC<Props> = ({toggleStatus, setToggleStatus}) => {
    const suggestions:any = [
        { id: 'Python', text: 'python' },
        { id: 'Java', text: 'Java' },
        { id: 'C++', text: 'C++' },
        { id: 'Css', text: 'Css' },
        { id: 'Ruby', text: 'Ruby' },
        { id: 'Go', text: 'GO' },
        { id: 'Php', text: 'GO' },
        { id: 'TypeScript', text: 'TypeScript' },
        { id: 'JavaScript', text: 'JavaScript' },
        { id: 'React', text: 'React' },
        { id: 'Kotlin', text: 'Kotlin' }
      ]
      
    const KeyCodes = {
        comma: 188,
        enter: 13
      };
      
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const [tagsAdvanced, setTagsAdvanced]:any = useState([]);
    const [tagsIntermediate, setTagsIntermediate]:any = useState([]);
    const [tagsBasic, setTagsBasic]:any = useState([]);
    const [nameSearch, setNameSearch]:any = useState('')
    const [statusHolder, setStatusHolder]: any = useState({
      active: false,
      former:false,
      inProcess: false
    })

    const handleNameSearchChange = (targetValue:any) =>{
      setNameSearch(targetValue)
    }
    
    const handleDeleteAdvanced = (i:any) => {
      setTagsAdvanced(tagsAdvanced.filter((tag:any, index:any) => index !== i));
    };
  
    const handleAdditionAdvanced = (tag:any) => {
      setTagsAdvanced([...tagsAdvanced, tag]);
    };

    const handleDeleteIntermediate = (i:any) => {
      setTagsIntermediate(tagsIntermediate.filter((tag:any, index:any) => index !== i));
    };
  
    const handleAdditionIntermediate = (tag:any) => {
      setTagsIntermediate([...tagsIntermediate, tag]);
    };

    const handleDeleteBasic = (i:any) => {
      setTagsBasic(tagsBasic.filter((tag:any, index:any) => index !== i));
    };
  
    const handleAdditionBasic = (tag:any) => {
      setTagsBasic([...tagsBasic, tag]);
    };

    const cleanFilters = () => {
      setTagsAdvanced([])
      setTagsIntermediate([])
      setTagsBasic([])
      setNameSearch('')
      setStatusHolder({
        active: false,
        former:false,
        inProcess: false
      })
    }

    const handleStatusChange = (name:any) =>{
      setStatusHolder({
        ...statusHolder,
        [name]: !statusHolder[name]
      })
    }

    const selectAllStatus = () => {
      setStatusHolder({
        active: true,
        former: true,
        inProcess: true
      })
    }
  
  return (
    <div className="flex flex-col mx-20 border-2 rounded-3xl">
      <div className="mx-8 mb-8">
            <h2 className="text-xl text-[#475564] font-bold mt-32 mb-4">Candidate Records</h2>

            <div className="flex">
                <div className="flex flex-col w-11/12" >
                    <div className="flex mb-2  space-x-8 ">

                      <div className="flex flex-col w-2/6 relative ">
                       <div className="h-[24px] text-[#475564] mb-1">Search by Name:</div>
                         <InputTag labelName="Advanced" tags={tagsAdvanced}  suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteAdvanced} handleAddition={handleAdditionAdvanced} />
                      </div>
                      
                      <div className="flex flex-col w-2/6 relative flex-start">
                        <div className="h-[24px] text-[#475564] mb-1"></div>
                        <InputTag labelName="Intermediate" tags={tagsIntermediate}  suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteIntermediate} handleAddition={handleAdditionIntermediate} />
                      </div>

                      <div className="flex flex-col w-2/6 relative flex-start">
                        <div className="h-[24px] text-[#475564] mb-1"></div>
                        <InputTag labelName="Basic" tags={tagsBasic}  suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteBasic} handleAddition={handleAdditionBasic} />
                      </div>
                       
                   </div>

                   <div className="flex flex h-20 space-x-8">

                        <div className="flex flex-col w-2/6 relative">
                            <div className="h-1/3 text-[#475564] mb-1">Search by Name:</div>
                            <span className="absolute mt-9 mx-5 text-xs text-[#475564]"></span>
                            <input 
                              className="bg-light-color w-full h-16 px-5 pt-3.5 border-none rounded-2xl outline-none focus:shadow-lg focus:shadow-[#C3EBFB]" 
                              placeholder="Name"
                              value={nameSearch}
                              onChange={(e)=>handleNameSearchChange(e.target.value)}
                            />
                       </div>

                       <div className="w-2/6 mt-8 flex  items-center  select-none relative">
                           {toggleStatus &&
                            <ul className=" absolute z-10  bg-[#FFFFFF] drop-shadow-xl  w-60 h-15 mt-60 pt-2 pl-4 pb-2 rounded">
                                <li className=" flex flex-end items-center justify-center text-xs right-0 text-[#00ADEF]">

                                   <span className="w-4/6 text-[#475564] font-semibold"></span>
                                   <span 
                                    className=" w2/6 cursor-pointer"
                                    onClick={()=>selectAllStatus()}  
                                  >
                                      Select all
                                    </span>
                                  
                                </li>
                    
                                <li className="flex flex-end items-center border-b-2 pb-2 pt-2">
                                    <span className="w-5/6 text-[#00ADEF] font-semibold">
                                        Active
                                    </span>
                                    <input 
                                      className="cursor-pointer" 
                                      type="checkbox" 
                                      name='active'
                                      checked={statusHolder.active}
                                      onChange={(e)=>handleStatusChange(e.target.name)}
                                    />
                                </li>
                                <li className="flex flex-end items-center border-b-2 pb-2 pt-2">
                                    <span className="w-5/6 text-[#475564] font-semibold">
                                        Former
                                    </span>
                                    <input 
                                      className="cursor-pointer" 
                                      type="checkbox" 
                                      name='former'
                                      checked={statusHolder.former}
                                      onChange={(e)=>handleStatusChange(e.target.name)}
                                    />
                                </li>
                                <li className="flex flex-end items-center border-b-2 pb-2 pt-2">
                                    <span className="w-5/6 text-[#475564] font-normal">
                                        In Process
                                    </span>
                                    <input 
                                      className="cursor-pointer"
                                      type="checkbox" 
                                      checked={statusHolder.inProcess}
                                      name='inProcess'
                                      onChange={(e)=>handleStatusChange(e.target.name)}
                                    />
                                </li>
                                <li onClick={()=>setToggleStatus(!toggleStatus)} className="font-semibold pt-4 pb-2 cursor-pointer hover:text-[#00ADEF]">
                                    Apply
                                </li>
                            </ul>}
                            

                            <div className="flex space-x-4 mr-6 items-center cursor-pointer" onClick={()=> setToggleStatus(!toggleStatus)}>
                                <span>Status</span>
                                {toggleStatus ? <ArrowUp/>: <ArrowDown/>}  
                            </div>

                            <div 
                              className="text-[#50C7F4] cursor-pointer select-none font-semibold hover:text-[#9CA3AF]"
                              onClick={()=>cleanFilters()}
                            >
                              Clean filters
                            </div>
                       </div>
                       <div className="w-2/6 ">
                            <span className="h-1/3"></span>
                       </div>
                   </div>
                </div>

                <div className="flex flex-col w-1/12 select-none">
                    <div className="flex items-center pt-6 justify-center h-20 text-[#00ADEF] font-bold cursor-pointer">Apply</div>
                    <div className="flex items-center justify-center h-20"></div>
                </div>
          </div>
      </div>
    </div>
  )
}

export default FormView
