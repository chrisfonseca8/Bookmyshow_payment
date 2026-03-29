import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, payment } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f2f5fa] flex flex-col items-center justify-center p-4">
        <p className="text-[#333] text-lg font-medium mb-4">No booking details found.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-[#f84464] text-white rounded-md hover:bg-[#e03a57] transition-colors shadow-sm">
          Go Home
        </button>
      </div>
    );
  }

  const grandTotal = (booking.totalPrice || 0) + 115.64 + 2;

  return (
    <div className="min-h-screen bg-[#f2f5fa] font-sans flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden relative border border-gray-100">
        
        {/* Header Ribbon */}
        <div className="bg-[#1ea83c] h-2 w-full"></div>
        
        <div className="p-8 pb-6 flex flex-col items-center border-b-[2px] border-dashed border-gray-200 relative">
          <div className="w-16 h-16 bg-[#ebfad4] text-[#1ea83c] rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
          </div>
          <h2 className="text-[#333] font-bold text-[22px] mb-1 tracking-tight">Booking Confirmed!</h2>
          <p className="text-gray-500 text-[13px] text-center max-w-[250px] leading-relaxed">
            Your tickets have been booked successfully. Have a great time!
          </p>
        </div>

        {/* Ticket Details */}
        <div className="p-8 pt-6 relative border-b-[2px] border-dashed border-gray-200">
           {/* Notches */}
           <div className="absolute top-[-10px] left-[-10px] w-5 h-5 bg-[#f2f5fa] rounded-full border border-gray-100 border-r-transparent border-t-transparent origin-center rotate-45 z-10"></div>
           <div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-[#f2f5fa] rounded-full border border-gray-100 border-l-transparent border-t-transparent origin-center -rotate-45 z-10"></div>
           
           <h3 className="text-[#333] font-bold text-[18px] mb-6 leading-tight pr-4">{booking.movieName}</h3>
           
           <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div>
                <p className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold mb-1">Hall</p>
                <p className="text-[#333] text-[13px] font-medium leading-snug pr-2">{booking.hallName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold mb-1">Seats</p>
                <p className="text-[#333] text-[13px] font-medium leading-snug">{booking.selectedSeats?.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold mb-1">Amount Paid</p>
                <p className="text-[#333] text-[14px] font-bold text-[#1ea83c] leading-snug">₹{grandTotal.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold mb-1">Gateway</p>
                <p className="text-[#333] text-[13px] font-medium leading-snug capitalize">{payment?.data?.gateway || payment?.gateway || 'Netbanking'}</p>
              </div>
           </div>
        </div>

        {/* Footer / Barcode area */}
        <div className="p-6 bg-[#fafafa] flex flex-col items-center border-t border-white relative">
           <div className="absolute top-[-10px] left-[-10px] w-5 h-5 bg-[#f2f5fa] rounded-full border border-gray-100 border-r-transparent border-t-transparent origin-center rotate-45 z-10"></div>
           <div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-[#f2f5fa] rounded-full border border-gray-100 border-l-transparent border-t-transparent origin-center -rotate-45 z-10"></div>
           
           <div className="w-full h-[46px] flex justify-between items-center opacity-[0.65] mb-3 px-1">
             {[...Array(38)].map((_, i) => (
                <div key={i} className={`bg-[#222] h-full ${i % 5 === 0 ? 'w-[3px]' : i % 3 === 0 ? 'w-[2px]' : 'w-[1.5px]'}`}></div>
             ))}
           </div>
           <p className="text-gray-400 text-[11px] tracking-[5px] font-mono">BMS-{Math.floor(Math.random() * 9000000) + 1000000}</p>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/')}
        className="mt-8 px-8 py-3 bg-white text-[#333] font-medium rounded-[8px] shadow-sm hover:shadow transition-shadow border border-gray-200 text-[14px]"
      >
        Book Another Movie
      </button>

    </div>
  );
}

export default Confirmation;