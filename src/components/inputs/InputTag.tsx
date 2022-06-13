import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

interface Props {
  labelName:string,
  tags: any,
  suggestions:any,
  delimiters: any,
  handleDelete: any,
  handleAddition: any
}

const InputTag:React.FC<Props> = ({
  labelName,
  tags,
  suggestions,
  delimiters,
  handleDelete,
  handleAddition
}) => {
    

  return (
    <div className='flex flex-col w-full relative '>
      <ReactTags
        tags={tags}
        placeholder="Skill"
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        allowUnique={true}
        allowDragDrop={false}
        inputFieldPosition="top"
        autocomplete={true}
      />
      
      <span className="absolute mt-[0.5em] ml-[1.2em] text-xs text-[#475564]">{labelName}:</span>
    </div>
  )
}

export default InputTag
