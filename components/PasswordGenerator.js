import { useState, useRef, useEffect } from 'react';
import PasswordOutput from './PasswordOutput';

const strengthStates = {
  TooWeak: {text: 'Too weak!', bars: ['bg-red', 'border-2 border-almostwhite', 'border-2 border-almostwhite', 'border-2 border-almostwhite']},
  Weak: {text: 'Weak', bars: ['bg-orange', 'bg-orange', 'border-2 border-almostwhite', 'border-2 border-almostwhite']},
  Medium: {text: 'Medium', bars: ['bg-yellow', 'bg-yellow', 'bg-yellow', 'border-2 border-almostwhite']},
  Strong: {text: 'Strong', bars: ['bg-neongreen', 'bg-neongreen', 'bg-neongreen', 'bg-neongreen']},
}



export default function PasswordGenerator() {
  const [characterLength, setCharacterLength] = useState(10);
  const [password, setPassword] = useState(generatePassword(10, true, true, true, false));

  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  


  const [passwordStrength, setPasswordStrength] = useState(strengthStates.Medium);

  const refCharacterLength = useRef(null)
  const refUppercase = useRef(null)
  const refLowercase = useRef(null)
  const refSymbols = useRef(null)
  const refNumbers = useRef(null)


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    const keyListAlphaLower="abcdefghijklmnopqrstuvwxyz",
      keyListAlphaUpper="ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      keyListInt="0123456789",
      keyListSpec="\"!§$%&/()=?^`#*<>-_@";
    
    let pw = ''
    const base = useUppercase + useLowercase + useNumbers + useSymbols
    var len = Math.ceil(length / base)
    
    if(useUppercase) {
      for (let i = 0; i < len; i++) {
        pw += keyListAlphaUpper.charAt(Math.floor(Math.random()*keyListAlphaUpper.length))
      }
    }

    if(useLowercase) {
      for (let i = 0; i < len; i++) {
        pw += keyListAlphaLower.charAt(Math.floor(Math.random()*keyListAlphaLower.length))
      }
    }

    if(useNumbers) {
      for (let i = 0; i < len; i++) {
        pw += keyListInt.charAt(Math.floor(Math.random()*keyListInt.length))
      }
    }

    if(useSymbols) {
      for (let i = 0; i < len; i++) {
        pw += keyListSpec.charAt(Math.floor(Math.random()*keyListSpec.length))
      }
    }
    
    pw=pw.split('').sort(function(){return 0.5-Math.random()}).join('');
    
    return pw.substring(0, length)
  }

  function calulateStrength(h) {
    const base = uppercase + lowercase + symbols + numbers
    
    let evaluation = 3*(characterLength-8) + 7*base
    // normalize
    evaluation = evaluation / 67

    if(evaluation >= 0.75)
      setPasswordStrength(strengthStates.Strong)
    else if (evaluation >= 0.5)
      setPasswordStrength(strengthStates.Medium)
    else if (evaluation >= 0.25)
      setPasswordStrength(strengthStates.Weak)
    else
      setPasswordStrength(strengthStates.TooWeak)
  }
  

  function handleChange(event) {
    const base = refUppercase.current.checked + refLowercase.current.checked + refSymbols.current.checked + refNumbers.current.checked

    if(base === 0)
      event.target.checked = true

    switch(event.target.id) {
      case 'uppercase':
        setUppercase(event.target.checked)
        break;
      case 'lowercase':
        setLowercase(event.target.checked)
        break;
      case 'numbers':
        setNumbers(event.target.checked)
        break;
      case 'symbols':
        setSymbols(event.target.checked)
        break;
      case 'characterlength':
        setCharacterLength(event.target.value)
        break;
      default:
    }
    const pw = generatePassword(
      refCharacterLength.current.value, 
      refUppercase.current.checked, refLowercase.current.checked, 
      refNumbers.current.checked, refSymbols.current.checked
    )
    setPassword(pw)
    //
  }


  useEffect(() => {
    const slider = refCharacterLength.current
    const min = slider.min
    const max = slider.max
    const value = slider.value

    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if(isChrome)
      slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${(value-min)/(max-min)*100}%, #18171F ${(value-min)/(max-min)*100}%, #18171F 100%)`
    calulateStrength()
    
    
  })



  

  return (
    <div className="p-4 sm:w-3/4 lg:w-5/12 m-auto">
      <div className='mt-16 sm:mt-32 mb-4'>
        <h2 className="text-base text-grey text-center">Password Generator</h2>
      </div>
      <PasswordOutput password={password} />
      <div className="bg-darkgrey p-4">
        <div className="mb-4">
          <div className='flex justify-between place-items-cente mb-2'>
            <label htmlFor="characterlength" className="text-almostwhite text-base sm:text-[18px]">Character Length</label>
            <span className="text-neongreen text-2xl sm:text-[32px]">{characterLength}</span>
          </div>
          <input ref={refCharacterLength} id="characterlength" type="range" min="8" max="25" value={characterLength} onChange={handleChange} className="mb-8 bg-verydarkgrey" />

          <ul className="space-y-4 mb-8">
            <li className="">
              <input checked={uppercase} ref={refUppercase} value="1" type="checkbox" id="uppercase" className="h-5 w-5 focus:border-0   bg-darkgrey text-neongreen border-2 border-almostwhite accent-neongreen" onChange={handleChange}/>
              <label htmlFor="uppercase" className='text-almostwhite text-base sm:text-[18px] ml-6'>Include Uppercase Letters</label>
            </li>
            <li className="">
              <input checked={lowercase} ref={refLowercase} value="1" type="checkbox" id="lowercase" className="h-5 w-5 focus:border-0   bg-darkgrey text-neongreen border-2 border-almostwhite accent-neongreen" onChange={handleChange}/>
              <label htmlFor="lowercase" className='text-almostwhite text-base sm:text-[18px] ml-6'>Include Lowercase Letters</label>
            </li>
            <li className="">
              <input checked={numbers} ref={refNumbers} value="1" type="checkbox" id="numbers" className="h-5 w-5 focus:border-0   bg-darkgrey text-neongreen border-2 border-almostwhite accent-neongreen" onChange={handleChange}/>
              <label htmlFor="numbers" className='text-almostwhite text-base sm:text-[18px] ml-6'>Include Numbers</label>
            </li>
            <li className="">
              <input checked={symbols} ref={refSymbols} value="1" type="checkbox" id="symbols" className="h-5 w-5 focus:border-0   bg-darkgrey text-neongreen border-2 border-almostwhite accent-neongreen outline-none" onChange={handleChange}/>
              <label htmlFor="symbols" className='text-almostwhite text-base sm:text-[18px] ml-6'>Include Symbols</label>
            </li>
          </ul>

          <div className="bg-verydarkgrey p-4 flex justify-between place-items-center">
            <span className="uppercase text-grey sm:text-[18px]">strength</span>
            <div className='place-items-center flex'>
              <span className='uppercase text-[18px] sm:text-2xl text-almostwhite  mr-4'>{passwordStrength.text}</span>
              <div className="grid grid-cols-4 gap-2">
                <div className={classNames("inline-block h-7 w-2.5", passwordStrength.bars[0])} />
                <div className={classNames("inline-block h-7 w-2.5", passwordStrength.bars[1])} />
                <div className={classNames("inline-block h-7 w-2.5", passwordStrength.bars[2])} />
                <div className={classNames("inline-block h-7 w-2.5", passwordStrength.bars[3])} />
              </div>
            </div>
          </div>

        </div>
        <div>
          <button className="bg-neongreen min-w-full py-4 uppercase text-darkgrey" onClick={handleChange}>
            Generate
            <img
              src="images/icon-arrow-right.svg"
              className="inline w-3 h-3 ml-2"
            />
          </button>
        </div>
      </div>
    </div>
  )
}