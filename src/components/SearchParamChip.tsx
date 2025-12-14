import React from 'react'

const SearchParamChip = ( {title}: {title:string}) => {

    
    const toTitleCase = () =>
        title
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    
  return (
    <>
        { toTitleCase() }
    </>
  )
}

export default SearchParamChip