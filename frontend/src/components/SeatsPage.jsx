import { useState, useEffect } from 'react'


 


function SeatsPage() {
  const [seats, setSeats] = useState([])
  // const [ticketCount, setTicketCount] = useState(2)
  // const [selectedSeats, setSelectedSeats] = useState([])

   //seatTypes will conatin prime,classicpuls and classic
  const [seattypes,setseattypes] = useState([]);
  // rows will contain A,B,C,D,E,F,G,H,I,J
  const [rows,setrows] = useState([]);
  // cols will contain 1,2,3,4,5,6,7,8,9,10
  const [cols,setcols] = useState([]);

  // user will choose the number of seats he want to select
  const [numberOfSeats,setNumberOfSeats] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setSelectedSeats([]); // reset selected seats when ticket count changes
  }, [numberOfSeats]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/seats')
      .then(res => res.json())
      .then(data => {
        setSeats(data)
        const uniqueTypes = [...new Set(data.map(obj => obj.type))];
        const uniqueRows = [...new Set(data.map(obj => obj.seat_number[0]))];
        const uniqueCols = [...new Set(data.map(obj => obj.seat_number.slice(1)))];
        setseattypes(uniqueTypes.reverse());
        setrows(uniqueRows.reverse());
        setcols(uniqueCols.reverse());
      })
      .catch(err => {
        console.log('Error fetching seats, ignoring for ui dev.')
      })
  }, [])


  
  const handleSeatClick = (clickedSeat, rowSeats) => {
    if (selectedSeats.includes(clickedSeat.seat_number)) {
      setSelectedSeats([]); // toggle off if clicking an already selected seat
      return;
    }

    const currentIndex = rowSeats.findIndex(s => s.seat_number === clickedSeat.seat_number);
    let newSelected = [];
    
    // 1. Try selecting 'numberOfSeats' to the right
    for (let i = currentIndex; i < rowSeats.length && newSelected.length < numberOfSeats; i++) {
        const s = rowSeats[i];
        if (s.status === 'Booked' || s.status === 'Initiated') break;
        newSelected.push(s.seat_number);
    }

    // 2. If blocked on the right, try selecting to the left
    if (newSelected.length < numberOfSeats) {
        newSelected = [];
        for (let i = currentIndex; i >= 0 && newSelected.length < numberOfSeats; i--) {
            const s = rowSeats[i];
            if (s.status === 'Booked' || s.status === 'Initiated') break;
            newSelected.unshift(s.seat_number);
        }
    }

    setSelectedSeats(newSelected);
  }

  const SeatBox = ({ seat, isSelected, onClick }) => {
    // Check status directly from the seat object
    let seatClass = ''
    if(seat.status=='Booked'||seat.status=='Initiated'){
      seatClass = 'bg-[#e5e5e5] border-[#e5e5e5] text-white cursor-not-allowed pointer-events-none';
    }else if (isSelected) {
      seatClass = 'bg-[#1ea83c] border-[#1ea83c] text-white cursor-pointer';
    }else{
      seatClass = 'bg-white border-[#1ea83c] text-[#7a7a7a] hover:bg-[#1ea83c] hover:text-white cursor-pointer';
    }

    const colNum = seat.seat_number.slice(1);

    return (
      <div
        onClick={seat.status !== 'Booked' && seat.status !== 'Initiated' ? onClick : undefined}
        className={`
          w-[26px] h-[26px] rounded-[3px] border mx-[3px] mb-[6px] text-[10px] sm:text-[11px] font-medium
          flex items-center justify-center transition-colors duration-150 select-none
          ${seatClass}
        `}
        title={seat.seat_number}
      >
        {String(colNum).padStart(2, '0')}
      </div>
    )
  }

  const times = [
    { time: '03:15 PM', color: 'amber' },
    { time: '04:15 PM', color: 'amber' },
    { time: '05:15 PM', color: 'active' },
    { time: '07:00 PM', color: 'amber' },
    { time: '08:00 PM', color: 'green' },
    { time: '09:00 PM', color: 'green' },
    { time: '10:00 PM', color: 'green' },
  ]

  return (
    <div className="min-h-screen bg-[#f2f5fa] font-sans flex flex-col pt-[124px] pb-[80px]">
      
      {/* ── Header Area ── */}
      <div className="fixed top-0 left-0 w-full z-30">
        <div className="bg-white px-4 md:px-6 py-3 flex items-center justify-between border-b border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900 text-3xl font-light pr-2 leading-none pb-1">
                &#8249;
              </button>
              <div>
                <h1 className="font-medium text-[15px] sm:text-[16px] text-[#333]">
                  Dhurandhar The Revenge - (Hindi)
                </h1>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  PVR: Nucleus Mall, Ranchi &nbsp;|&nbsp; Tue, 24 March, 2026 &nbsp;|&nbsp; 05:15 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button className="hidden sm:flex text-gray-700 hover:text-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path>
                </svg>
              </button>
              <select 
                value={numberOfSeats}
                onChange={(e) => setNumberOfSeats(Number(e.target.value))}
                className="border border-[#f84464] text-[#f84464] font-medium text-xs rounded-[3px] px-2 py-1.5 bg-transparent cursor-pointer outline-none focus:ring-1 focus:ring-[#f84464]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num} className="text-gray-800 bg-white">
                    {num} {num === 1 ? 'Ticket' : 'Tickets'}
                  </option>
                ))}
              </select>
            </div>
        </div>

        {/* ── Time/Date Bar ── */}
        <div className="bg-white border-b border-gray-200 py-3 overflow-x-auto scb bg-opacity-95 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 md:px-6 w-max">
            {times.map((t, idx) => (
                <button key={idx} className={`
                    min-w-[85px] px-4 py-1.5 text-xs text-center rounded-[3px] border
                    ${t.color === 'active' ? 'bg-[#f5b53f] border-[#f5b53f] text-white font-medium' : ''} 
                    ${t.color === 'amber' ? 'text-gray-600 border-[#f5b53f] hover:bg-gray-50' : ''}
                    ${t.color === 'green' ? 'text-gray-600 border-[#1ea83c] hover:bg-gray-50' : ''}
                `}>
                  {t.time}
                </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Seat Map Area ── */}
      <div className="flex-grow flex justify-center w-full relative">
         <div className="w-full max-w-5xl bg-white min-h-[500px] border border-gray-200 px-2 sm:px-8 py-10 relative">
            
            {/* Zoom Controls (Fixed to the box container) */}
            <div className="absolute right-4 bottom-10 flex flex-col gap-3 z-10 hidden sm:flex">
                <button className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </button>
                <button className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 shadow-sm">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </button>
            </div>

            <div className="w-full overflow-x-auto pb-10 custom-scrollbar">
                <div className="min-w-[600px] mx-auto px-4 md:px-12 flex flex-col items-center">
                    {seattypes.map((type) => {
                        // Filter seats for this specific type (e.g. Classic)
                        const typeSeats = seats.filter(s => s.type === type);
                        
                        // Find all unique rows that exist within this type, sorted Z-A or logically
                        const typeRows = [...new Set(typeSeats.map(s => s.seat_number[0]))].sort((a,b) => b.localeCompare(a));
                        
                        return (
                            <div key={type} className="w-full mb-8">
                                {/* Line & Label */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-4 text-[11px] text-[#333] font-medium tracking-wide uppercase">
                                        {type}
                                    </span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                {/* Seat Rows wrapper */}
                                <div className="relative w-full flex flex-col items-center">
                                    {typeRows.map(rowLetter => {
                                        // Get all seats in this exact row and type, sorted by col number
                                        const rowSeats = typeSeats.filter(s => s.seat_number[0] === rowLetter)
                                            .sort((a,b) => Number(a.seat_number.slice(1)) - Number(b.seat_number.slice(1)));

                                        // Split them roughly in half for the center aisle look
                                        const midpoint = Math.ceil(rowSeats.length / 2);
                                        const leftSeats = rowSeats.slice(0, midpoint);
                                        const rightSeats = rowSeats.slice(midpoint);
                                        

                                        return (
                                            <div key={rowLetter} className="flex relative items-center justify-center w-full max-w-[500px] mb-1">
                                                {/* Row Letter far left */}
                                                <div className="absolute left-[-20px] sm:left-[-40px] text-[11px] font-medium text-gray-500 w-6 flex items-center justify-end h-full">
                                                    {rowLetter}
                                                </div>

                                                <div className="flex items-center">
                                                    {/* Left Block */}
                                                    <div className="flex">
                                                        {leftSeats.map(seat => (
                                                            <SeatBox 
                                                                key={seat.seat_number} 
                                                                seat={seat} 
                                                                isSelected={selectedSeats.includes(seat.seat_number)}
                                                                onClick={() => handleSeatClick(seat, rowSeats)}
                                                            />
                                                        ))}
                                                    </div>
                                                    
                                                    {/* Center Aisle */}
                                                    {rightSeats.length > 0 && <div className="w-10 sm:w-16"></div>}
                                                    
                                                    {/* Right Block */}
                                                    <div className="flex">
                                                        {rightSeats.map(seat => (
                                                            <SeatBox 
                                                                key={seat.seat_number} 
                                                                seat={seat} 
                                                                isSelected={selectedSeats.includes(seat.seat_number)}
                                                                onClick={() => handleSeatClick(seat, rowSeats)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
         </div>
      </div>

      {/* ── Legend Footer ── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
         <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap px-2">
            <div className="flex items-center gap-2">
               <div className="w-[18px] h-[18px] rounded-[3px] border-[1.5px] border-[#f5b53f] bg-white"></div>
               <span className="text-xs text-gray-600 flex items-center gap-1">Bestseller <span className="text-[10px] bg-gray-100 rounded-full w-3.5 h-3.5 flex items-center justify-center border font-bold">i</span></span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-[18px] h-[18px] rounded-[3px] border-[1.5px] border-[#1ea83c] bg-white"></div>
               <span className="text-xs text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-[18px] h-[18px] rounded-[3px] bg-[#1ea83c]"></div>
               <span className="text-xs text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-[18px] h-[18px] rounded-[3px] bg-[#e5e5e5]"></div>
               <span className="text-xs text-gray-600">Sold</span>
            </div>
         </div>
      </div>

    </div>
  )
}
export default SeatsPage