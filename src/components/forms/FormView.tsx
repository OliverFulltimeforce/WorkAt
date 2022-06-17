
import React, { useEffect, useState } from 'react'
import {AiOutlineDown as ArrowDown} from 'react-icons/ai'
import '../../assets/scss/FormView.scss'
import Apply from '../buttons/Apply'
import Checkbox from '../inputs/Checkbox'
import InputTag from '../inputs/InputTag'


interface Props {
    toggleStatus: boolean,
    setToggleStatus: any,
    candidates: any,
    setCandidates: any
}

const FormView: React.FC<Props> = ({toggleStatus, setToggleStatus, candidates, setCandidates}) => {
  const initialStateHolder = [
    {
      id:0,
      name: "Active",
      checked: false
    },
    {
      id:1,
      name: "Former",
      checked:false
    },
    {
      id:2,
      name: "In process",
      checked: false
    }
  ]

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

    // **********************States Holder**********************************************************
    const [tagsAdvanced, setTagsAdvanced]:any = useState([]);
    const [tagsIntermediate, setTagsIntermediate]:any = useState([]);
    const [tagsBasic, setTagsBasic]:any = useState([]);
    const [nameSearch, setNameSearch]:any = useState('')
    const [statusHolder, setStatusHolder]: any = useState([])
    const [isAllStatusSelected, setIsAllStatusSelected] = useState(false)

    useEffect(()=>{
      
    },[])

    //*******************************Skills Holders********************************************
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
    //****************************************************************************

    // Clean Filters 
    const cleanFilters = () => {
      setTagsAdvanced([])
      setTagsIntermediate([])
      setTagsBasic([])
      setNameSearch('')
      setStatusHolder([])
      setIsAllStatusSelected(false);
    }
 
//***************************** *Status handler *********************************
    const handleStatusChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      if(e.target.checked){
        setStatusHolder([...statusHolder, e.target.value])
      }else{
        setStatusHolder([
          ...statusHolder.filter((status:any)=> status !== e.target.value)
        ])
      }
    }
 
    const selectAllStatus = (e: any) => {
      if (!isAllStatusSelected) {
        const statusChecked = initialStateHolder.map((status) => {
          status.checked = !e.target.checked;
          return status;
        });
        setStatusHolder(statusChecked.map((status) => status.name));
        setIsAllStatusSelected(true);
      } else {
        setStatusHolder([]);
        setIsAllStatusSelected(false);
      }
    }
    // *****************************************************************************
  
  return (
    <div className="flex flex-col mx-20 border-2 rounded-3xl">
      <div className="mx-8 mb-8">
        <h2 className="text-xl text-[#475564] font-bold mt-32 mb-4">Candidate Records</h2>

        <div className="flex">
          <div className="flex flex-col w-11/12" >
            <div className="flex mb-2  space-x-8 ">

              <div className="flex flex-col w-2/6 relative ">
                <div className="h-[24px] text-[#475564] mb-1">Search by Name:</div>
                <InputTag labelName="Advanced" tags={tagsAdvanced} suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteAdvanced} handleAddition={handleAdditionAdvanced} />
              </div>

              <div className="flex flex-col w-2/6 relative flex-start">
                <div className="h-[24px] text-[#475564] mb-1"></div>
                <InputTag labelName="Intermediate" tags={tagsIntermediate} suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteIntermediate} handleAddition={handleAdditionIntermediate} />
              </div>

              <div className="flex flex-col w-2/6 relative flex-start">
                <div className="h-[24px] text-[#475564] mb-1"></div>
                <InputTag labelName="Basic" tags={tagsBasic} suggestions={suggestions} delimiters={delimiters} handleDelete={handleDeleteBasic} handleAddition={handleAdditionBasic} />
              </div>

            </div>


            {/* SEARCH & STATUS BOX */}
            <div className="flex flex h-20 space-x-8">

              {/* NAME SEARCH */}
              <div className="flex flex-col w-2/6 relative">
                <div className="h-1/3 text-[#475564] mb-1">Search by Name:</div>
                <span className="absolute mt-9 mx-5 text-xs text-[#475564]"></span>
                <input
                  className="bg-light-color w-full h-16 px-5 pt-3.5 border-none rounded-2xl outline-none focus:shadow-lg focus:shadow-[#C3EBFB]"
                  placeholder="Name"
                  value={nameSearch}
                  onChange={(e) => handleNameSearchChange(e.target.value)}
                />
              </div>

              {/* STATUS */}
              <div className="w-2/6 mt-8 flex  items-center select-none relative">
                <div className="relative">
                  <div className="flex gap-4 cursor-pointer" onClick={() => setToggleStatus(!toggleStatus)}>
                    <span className="font-raleway">Status:</span>
                    <button
                      onClick={() => setToggleStatus(!toggleStatus)}
                      className="pr-4"
                    >
                      <ArrowDown
                        className={
                          toggleStatus
                            ? 'rotate-180 transition ease-in-out duration-200'
                            : 'duration-200'
                        }
                      />
                    </button>
                  </div>

                  <div
                    className={
                      toggleStatus
                        ? 'transition ease-in-out duration-200 opacity-100 absolute z-10 rounded-sm mt-4 bg-white shadow-md'
                        : 'duration-200 opacity-0 invisible absolute z-10 rounded-sm mt-2 bg-white shadow-md'
                    }
                  >
                    <div className="flex flex-col px-4 pt-4 space-y-4">
                      <button
                        onClick={selectAllStatus}
                        className="flex justify-end text-sm text-cyan-500 font-raleway"
                      >
                        {isAllStatusSelected && statusHolder.length !== 0
                          ? 'Unselect all'
                          : 'Select all'}
                      </button>
                      {initialStateHolder?.map((status: any) => (
                        <div className="border-b pb-2 w-64">
                          <label

                            className="font-raleway flex justify-between"
                          >
                            {status.name}
                            <Checkbox
                              id={status.id}
                              onChange={handleStatusChange}
                              className="flex items-center justify-center border border-gray-300 h-6 w-6 border rounded-md"
                              checkColor="text-cyan-color"
                              checked={statusHolder.indexOf(status.name) !== -1}
                              checkedSingle={statusHolder.indexOf(status.name) !== -1}
                              name={status.name}
                              value={status.name}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    <Apply onClick={() => setToggleStatus(!toggleStatus)} />
                  </div>
                </div>
                <div
                  className="text-[#50C7F4] cursor-pointer select-none font-semibold hover:text-[#9CA3AF]"
                  onClick={() => cleanFilters()}
                >
                  Clean filters
                </div>
              </div>
              <div className="w-2/6 ">
                <span className="h-1/3"></span>
              </div>
            </div>
          </div>

          {/* APPLY BOX*/}
          <div className="flex flex-col w-1/12 select-none">
            <div
              className="flex items-center pt-6 justify-center h-20 text-[#00ADEF] font-bold cursor-pointer"
              onClick={() => console.log("APPLYING FILTERS")}
            >
              Apply
            </div>
            <div className="flex items-center justify-center h-20"></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default FormView
