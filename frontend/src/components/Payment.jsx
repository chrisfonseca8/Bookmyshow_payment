import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Attempt to read actual selected seats from storage
    const storedData = localStorage.getItem('selectedSeats');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      // Fallback for UI visualization if accessed directly
      setBookingData({
        selectedSeats: ['CL-B7', 'B8'],
        totalPrice: 760
      });
    }
  }, []);

  if (!bookingData) return null;

  const convenienceFee = 115.64;
  const charity = 2;
  const numTickets = bookingData.selectedSeats?.length || 2;
  const ticketsPrice = bookingData.totalPrice || 760;
  
  const grandTotal = ticketsPrice + convenienceFee + charity;

  return (
    <div className="min-h-screen bg-[#f2f5fa] font-sans pb-10">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-30 shadow-[0_2px_5px_rgba(0,0,0,0.03)]">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 text-3xl font-light pr-2 leading-none pb-1 transition-colors">
          &#8249;
        </button>
        <div>
          <h1 className="text-[#333] font-medium text-[15px] sm:text-[16px]">Dhurandhar The Revenge (A)</h1>
          <p className="text-gray-500 text-[11px] sm:text-[12px] mt-0.5 tracking-[0.2px]">PVR: Nucleus Mall, Ranchi (AUDI 02) | Fri, 27 Mar, 2026 | 08:00 PM</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1024px] mx-auto pt-8 px-4 flex flex-col md:flex-row gap-[18px] items-start">
        
        {/* Left Column - Payment Options */}
        <div className="w-full md:w-[65%]">
           <div className="bg-white rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden min-h-[550px]">
              
              {/* Tabs Sidebar */}
              <div className="w-full md:w-[32%] bg-[#fcfcfc] border-r border-gray-100 flex flex-col">
                <div className="px-5 py-5 border-b border-gray-100">
                  <h2 className="text-[#333] font-medium text-[14px]">Payment options</h2>
                </div>
                
                <div className="flex flex-col">
                   <div className="flex items-center gap-3 px-5 py-[18px] bg-[#fff6f8] border-l-[3.5px] border-[#f84464] border-b border-gray-100 cursor-pointer">
                      <div className="w-[26px] h-[16px] bg-gray-200 rounded-[2px] flex items-center justify-center text-[7px] font-bold text-gray-500 tracking-wider">UPI</div>
                      <span className="text-[#f84464] text-[13px] font-medium">Pay by any UPI App</span>
                   </div>
                   {[
                      { icon: '💳', label: 'Debit/Credit Card' },
                      { icon: '📱', label: 'Mobile Wallets' },
                      { icon: '🎁', label: 'Gift Voucher' },
                      { icon: '🖥️', label: 'Net Banking' },
                      { icon: '⏱️', label: 'Pay Later' },
                      { icon: '💯', label: 'Redeem Points' },
                   ].map((tab, i) => (
                     <div key={i} className="flex items-center gap-3 px-5 py-[18px] border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="text-gray-600 text-[15px] flex items-center justify-center opacity-70">{tab.icon}</div>
                        <span className="text-[#666] text-[13px] font-medium">{tab.label}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="w-full md:w-[68%] p-6 sm:p-8 bg-white">
                <h2 className="text-[#333] font-medium mb-6 text-[14px]">Pay by any UPI App</h2>
                
                <div className="border border-gray-200 rounded-[6px] p-[18px] flex items-center justify-between cursor-pointer hover:border-gray-300 transition-colors group">
                   <div className="flex items-center gap-[14px]">
                     <div className="w-9 h-9 rounded-[4px] border border-gray-200 flex items-center justify-center bg-gray-50/50 group-hover:bg-white transition-colors">
                        {/* QR Code Dummy Icon */}
                        <div className="grid grid-cols-2 gap-[2.5px] p-[3px]">
                          <div className="w-[7px] h-[7px] bg-[#444] rounded-[1.5px]"></div>
                          <div className="w-[7px] h-[7px] bg-[#444] rounded-[1.5px]"></div>
                          <div className="w-[7px] h-[7px] bg-[#444] rounded-[1.5px]"></div>
                          <div className="w-[7px] h-[7px] bg-[#999] rounded-[1.5px]"></div>
                        </div>
                     </div>
                     <div className="mt-[-2px]">
                       <p className="text-[13px] text-[#333] font-medium mb-[3px]">Scan QR code</p>
                       <p className="text-[11.5px] text-[#999] tracking-[0.2px]">You need to have a registered UPI ID</p>
                     </div>
                   </div>
                   <span className="text-gray-300 text-[22px] font-light leading-none pb-0.5 group-hover:text-gray-400">&#8250;</span>
                </div>
              </div>
           </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full md:w-[35%] flex flex-col gap-3.5">
           
           <div className="bg-[#fcfcfc] rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] border border-gray-200/60 overflow-hidden">
              <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-[#333] font-medium text-[14px] leading-snug pr-2">Dhurandhar The Revenge</h3>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[#333] font-medium text-[15px]">{numTickets}</span>
                      <p className="text-[#f84464] text-[9.5px] uppercase flex items-center gap-1 tracking-[0.3px] whitespace-nowrap mt-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15.4 12L12 15.4l-3.4-3.4"></path><path d="M12 4v11.4"></path></svg>
                        M-Ticket
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-[12.5px] mb-0.5 font-medium">Fri, 27 Mar, 2026 | 08:00 PM</p>
                  <p className="text-gray-500 text-[11.5px] mb-0.5">Hindi (2D)</p>
                  <p className="text-gray-600 text-[11.5px] font-medium mb-1">{bookingData.selectedSeats?.join(', ')}</p>
                  <p className="text-gray-500 text-[11px] mb-4">PVR: Nucleus Mall, Ranchi (AUDI 02)</p>

                  <div className="flex items-center gap-2 mb-[18px]">
                    <span className="w-[18px] h-[18px] shrink-0 rounded-full border-[1.5px] border-[#f84464] text-[#f84464] text-[8px] font-bold flex items-center justify-center">18+</span>
                    <p className="text-[#666] text-[11px] leading-tight">This movie is only for audience above the age of 18</p>
                  </div>
              </div>

              <div className="bg-[#fff9e6] p-3 border-y border-[#ffeac2] flex flex-col justify-center">
                 <p className="text-[#333] font-medium text-[11.5px] mb-[3px]">Cancellation Unavailable</p>
                 <p className="text-[#666] text-[11px] leading-snug">This venue does not support booking cancellation.</p>
              </div>

              <div className="p-4 bg-[white]">
                 <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[#666] text-[12px] flex items-center gap-1 cursor-pointer">Ticket(s) price <span className="text-gray-400 text-[10px] mt-0.5">&#8964;</span></p>
                    <p className="text-[#333] text-[13px] font-medium">₹{ticketsPrice.toFixed(2)}</p>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-[#666] text-[12px] flex items-center gap-1 cursor-pointer">Convenience fees <span className="text-gray-400 text-[10px] mt-0.5">&#8964;</span></p>
                    <p className="text-[#333] text-[13px] font-medium">₹{convenienceFee.toFixed(2)}</p>
                 </div>
                 
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[#333] font-medium text-[12px]">Give to Underprivileged Musicians</p>
                      <p className="text-gray-500 text-[10px] mt-[3px] tracking-wide">(₹1 per ticket) <span className="text-[#333] underline cursor-pointer font-medium ml-1">VIEW T&C</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#333] text-[12px] font-medium">₹0.00</p>
                      <p className="text-[#f84464] text-[11px] mt-1 cursor-pointer font-medium hover:underline">Add ₹{charity.toFixed(2)}</p>
                    </div>
                 </div>

                 <div className="border-t border-dashed border-gray-300 mt-2 mb-0 pt-[14px] flex justify-between items-center">
                    <p className="text-[#333] font-medium text-[13.5px]">Order total</p>
                    <p className="text-[#333] font-bold text-[14px]">₹{grandTotal.toFixed(2)}</p>
                 </div>
              </div>
           </div>

           {/* Booking Details Box */}
           <div className="bg-[#fcfcfc] rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] px-4 py-[14px] border border-gray-200/70">
              <div className="flex justify-between items-center mb-[6px]">
                 <h3 className="text-[#333] font-medium text-[13px]">For Sending Booking Details</h3>
                 <span className="text-[#f84464] text-[11px] cursor-pointer font-medium flex items-center gap-1 opacity-90 hover:opacity-100">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                   Edit
                 </span>
              </div>
              <p className="text-[#666] text-[11.5px]">+91-9136305274 | chris.fonseca2020@gmail.com</p>
              <p className="text-[#888] text-[11px] mt-0.5">Jharkhand (for GST purposes)</p>
           </div>

           {/* Apply Offers */}
           <div className="bg-white rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-[14px] flex justify-between items-center cursor-pointer border border-gray-200/70 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5">
                 <div className="w-5 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5b53f" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                 </div>
                 <p className="text-[#333] font-medium text-[13.5px]">Apply Offers</p>
              </div>
              <span className="text-gray-400 text-xl font-light leading-none">&#8250;</span>
           </div>

           {/* Consent */}
           <div className="bg-transparent mt-1.5 px-2">
              <p className="text-[#666] text-[11px] leading-relaxed">By proceeding, I express my consent to complete this transaction.</p>
           </div>

           {/* Amount Payable */}
           <div className="bg-white rounded-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] px-[18px] py-[18px] flex justify-between items-center mt-3 border-t-[3.5px] border-[#f84464]">
              <p className="text-[#333] font-medium text-[14px]">Amount Payable</p>
              <p className="text-[#333] font-bold text-[18px]">₹{grandTotal.toFixed(2)}</p>
           </div>

        </div>

      </main>
    </div>
  )
}

export default Payment