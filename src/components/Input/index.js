import React, { useEffect, useState, useRef, useMemo } from 'react';
import './styles.css';
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Input = (props) => {
  // console.log('Input - props', activeParks, reset)
  const [val, setVal] = useState('');
  const valRef = useRef('')
  const parkChoicesRef = useRef()
  const [isOpen, setOpen] = useState(false)
  useOnClickOutside(parkChoicesRef , () => setOpen(false))

  const handleUpdateVal = (park) => {
    valRef.current.value = park.name
    setOpen(false)
    props.filterParksByPark(park)
  }

  useEffect(() => {
    if(props.activeParks.length > 2) {
      valRef.current.value = ''
    } else if(props.activeParks.length === 1) {
      setVal(props.activeParks[0].name)
    }
    setVal('')
  }, [props.activeParks])

/* useMemo used here as there was a delay loading the parks on the map
  on the intial render of Map...during my testing commenting out Input 
  in App returned things back to normal but once uncommented the delay ame back. 
  Additional testing in Input to determine the cause led me to comment out parkChoices
  and so I found the root cause of the performance issue. 
*/
  const parkChoices = useMemo(() => {
      console.log('Input - parkChoices')
      return props.allParks.map( (park, index) => {
        return ( 
            <div 
            key={index}
            className={`parkChoice ${park.code}`}
            style={{color: park.boroughColor}}
            onClick={() => handleUpdateVal(park)}
            >
            {park.name}
          </div> 
        )
      })}, [props.allParks]
  )

  // THIS HANDLES THE MANUAL TOGGLING OF THE DROP DOWN
  const handleToggle = () => {
    // setIsVisible(!isVisible)
    setOpen(true)
  }
  
  // console.log('Input - parkChoices', props, parkChoices)
  return (
    <>
    <form>
      <label htmlFor="">Find A Court - all courts</label>
      <input ref={valRef}
        onClick={handleToggle}
        type="text"
        placeholder="court name"
      />
    </form>
      {isOpen ? (
      <div ref={parkChoicesRef} id="parkChoices" >
        {parkChoices}
      </div> ) : '' }
    </>
  );
};


// export default MemoizedInput= memo(Input)
export default Input
