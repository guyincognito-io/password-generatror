export default function PassworOutput({password}) {

  async function copyToClipboard() {
    await navigator.clipboard.writeText(password)
    
  }

  return (
    <div className="bg-darkgrey flex p-4 justify-between place-items-center mb-4">
      <div className="text-almostwhite text-2xl  sm:text-[32px] truncate	pr-4">{password}</div>
      <button onClick={copyToClipboard} className="">
        <img 
          src="images/icon-copy.svg"
          className="w-4 h-5 sm:w-[21px] sm:h-[24px]"
        />
        
      </button>
    </div>
)
}