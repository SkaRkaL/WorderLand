

function HowToPlay({ setFlag }: any): any {

  const word = "world".toUpperCase();
  const limit = "limit".toUpperCase();
  const icons = "icons".toUpperCase();

  return (
    <div className=' absolute left-0 top-0 back drop-blur-[4px] w-full h-full '>

      <div className='w-full h-full backdrop-blur-[4px] flex justify-center items-center'>
        <div className='w-[520px] p-8 h-[39rem] rounded-[9px] border-[#3a3a3c] border-1 bg-[#121213]' >

          <div className='p-[16px] w-full text-white'>
            <h1 className=' text-white text-left mt-[29px] mb-[4px] text-[28px] font-semibold tracking-tight'>
              Stats
            </h1>

            <button className='p-0 absolute w-[30px] h-[30px] rounded-[50px] bg-white bottom-[60px] left-[50%] cursor-pointer text-black font-bold'
              onClick={() => { setFlag(0) }}>
              x
            </button>

            <p className='text-[20px] font-[500]'>
              Guess the Wordle in 6 tries.
            </p>

            <div className='w-full flex flex-col gap-[34px] mt-[16px]'>

              <h1 className='text-[16px] font-semibold text-white'>Example</h1>
              <div>
                <div className="flex justify-start items-center gap-[6px]">
                  {Array(5).fill("").map((_, idx) => (

                    <div className={`w-[40px] h-[40px] text-white flex justify-center items-center capitalize ${idx === 0 ? "bg-green-700" : "bg-[#121213]"} border-solid border-[1px] border-[#3a3a3c] font-[900] `} key={idx}>
                      {word[idx]}
                    </div>
                  ))}
                </div>
                <p><strong>W</strong> is in the word and in the correct spot.</p>
              </div>

              <div>
                <div className="flex justify-start items-center gap-[6px]">
                  {Array(5).fill("").map((_, idx) => (

                    <div className={`w-[40px] h-[40px] text-white flex justify-center items-center capitalize ${idx === 2 ? "bg-[#b59f3b]" : "bg-[#121213]"} border-solid border-[1px] border-[#3a3a3c] font-[900] `} key={idx}>
                      {limit[idx]}
                    </div>
                  ))}
                </div>
                <p><strong>M</strong> is in the word but in the wrong spot.</p>
              </div>

              <div>
                <div className="flex justify-start items-center gap-[6px]">
                  {Array(5).fill("").map((_, idx) => (
                    <div className={`w-[40px] h-[40px] text-white flex justify-center items-center capitalize ${idx === 4 ? "bg-[#3a3a3c]" : "bg-[#121213]"} border-solid border-[1px] border-[#3a3a3c] font-[900] `} key={idx}>
                      {icons[idx]}
                    </div>
                  ))}
                </div>
                <p><strong>S</strong> is not in the word in any spot.</p>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );

}
export default HowToPlay;