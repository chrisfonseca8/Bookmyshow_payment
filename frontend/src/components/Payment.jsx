import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

class paymentRequest {
  constructor(firstName, lastName, currency, amount) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.currency = currency;
    this.amount = amount;
  }
}

function Payment() {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('paytm');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('selectedSeats');

    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      setError("No booking data found. Please select seats again.");
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const convenienceFee = 115.64;
  const charity = 2;

  //const numTickets = bookingData.selectedSeats?.length || 0;
  const ticketsPrice = bookingData.totalPrice || 0;
  const grandTotal = ticketsPrice + convenienceFee + charity;

  const request = new paymentRequest('chris', 'fonseca', 'INR', grandTotal);

  const handleSubmit = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/v1/booking/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: request.firstName,
          receiver: request.lastName,
          currency: request.currency,
          amount: request.amount,
          gateway: selectedMethod, // must match backend
          seats: bookingData.selectedSeats,
          hallId: bookingData.hallId || 1
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }

      // ✅ clear local storage after success
      localStorage.removeItem("selectedSeats");

      // ✅ navigate to confirmation page
      navigate("/confirmation", {
        state: {
          booking: bookingData,
          payment: data
        }
      });

    } catch (err) {
      console.error("Payment Error:", err.message);
      setError(err.message);
    }
  };

  const formattedDateTime = bookingData.time
    ? new Date(bookingData.time).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/,/g, '') +
      ' | ' +
      new Date(bookingData.time).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-[#f2f5fa] font-sans pb-10">

      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="text-3xl">&#8249;</button>
        <div>
          <h1 className="font-medium text-[15px]">{bookingData.movieName}</h1>
          <p className="text-gray-500 text-[12px]">
            {bookingData.hallName} | {formattedDateTime}
          </p>
        </div>
      </header>

      <main className="max-w-[1024px] mx-auto pt-8 px-4 flex flex-col md:flex-row gap-[18px] items-start">

        {/* Left Column - Payment Options */}
        <div className="w-full md:w-[65%]">
           <div className="bg-white rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] flex flex-col md:flex-row overflow-hidden min-h-[550px]">
              
              {/* Tabs Sidebar */}
              <div className="w-full md:w-[32%] bg-[#fcfcfc] border-r border-gray-100 flex flex-col">
                <div className="px-5 py-5 border-b border-gray-100">
                  <h2 className="text-[#333] font-medium text-[14px]">Payment options</h2>
                </div>
                
                <div className="flex flex-col flex-1">
                   <div 
                     onClick={() => setSelectedMethod('paytm')}
                     className={`flex items-center gap-3 px-5 py-[18px] border-b border-gray-100 cursor-pointer transition-colors ${selectedMethod === 'paytm' ? 'bg-[#fff6f8] border-l-[3.5px] border-[#f84464]' : 'hover:bg-gray-50'}`}
                   >
                      <div className="text-[18px] opacity-70">🟦</div>
                      <span className={`${selectedMethod === 'paytm' ? 'text-[#f84464]' : 'text-[#666]'} text-[13px] font-medium`}>Paytm</span>
                   </div>
                   <div 
                     onClick={() => setSelectedMethod('razorPay')}
                     className={`flex items-center gap-3 px-5 py-[18px] border-b border-gray-100 cursor-pointer transition-colors ${selectedMethod === 'razorPay' ? 'bg-[#fff6f8] border-l-[3.5px] border-[#f84464]' : 'hover:bg-gray-50'}`}
                   >
                      <div className="text-[18px] opacity-70">🔵</div>
                      <span className={`${selectedMethod === 'razorPay' ? 'text-[#f84464]' : 'text-[#666]'} text-[13px] font-medium`}>RazorPay</span>
                   </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="w-full md:w-[68%] p-6 sm:p-8 bg-white flex flex-col justify-center items-center relative">
                <h2 className="text-[#333] font-medium mb-8 text-[20px]">
                  Pay via {selectedMethod === 'paytm' ? 'Paytm' : 'RazorPay'}
                </h2>
                
                <div className="border border-gray-200 rounded-[8px] p-6 w-full max-w-sm flex flex-col items-center bg-[#f9fafb] shadow-sm relative">
                   <div className="mb-6 text-center">
                     <p className="text-sm text-gray-500 mb-1">Payment Request from:</p>
                     <p className="font-semibold text-gray-800 text-lg">{request.firstName} {request.lastName}</p>
                     <p className="text-3xl font-bold text-[#f84464] mt-3">
                       {request.currency} {request.amount.toFixed(2)}
                     </p>
                   </div>
                   
                   <button 
                     onClick={handleSubmit}
                     className="w-full bg-[#f84464] text-white py-3.5 rounded-md font-medium text-[15px] hover:bg-[#e03a57] transition-colors shadow flex justify-center items-center"
                   >
                     Submit Payment
                   </button>
                </div>
                {error && (
                  <div className="mt-6 flex items-center gap-2 text-[#d93025] bg-[#fce8e6] px-4 py-3 rounded-md border border-[#fad2cf] w-full max-w-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <p className="text-[13px] font-medium">{error}</p>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full md:w-[35%] flex flex-col gap-3.5">
           
           <div className="bg-[#fcfcfc] rounded-[6px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] border border-gray-200/60 overflow-hidden">
              <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-[#333] font-medium text-[14px] leading-snug pr-2">{bookingData.movieName || 'Dhurandhar The Revenge'}</h3>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[#333] font-medium text-[15px]">{bookingData.selectedSeats?.length || 2}</span>
                      <p className="text-[#f84464] text-[9.5px] uppercase flex items-center gap-1 tracking-[0.3px] whitespace-nowrap mt-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15.4 12L12 15.4l-3.4-3.4"></path><path d="M12 4v11.4"></path></svg>
                        M-Ticket
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-[12.5px] mb-0.5 font-medium">{formattedDateTime}</p>
                  <p className="text-gray-500 text-[11.5px] mb-0.5">Hindi (2D)</p>
                  <p className="text-gray-600 text-[11.5px] font-medium mb-1">{bookingData.selectedSeats?.join(', ')}</p>
                  <p className="text-gray-500 text-[11px] mb-4">{bookingData.hallName || 'PVR: Nucleus Mall, Ranchi (AUDI 02)'}</p>

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
                    <p className="text-[#666] text-[12px] flex items-center gap-1 cursor-pointer">Ticket(s) price</p>
                    <p className="text-[#333] text-[13px] font-medium">₹{ticketsPrice.toFixed(2)}</p>
                 </div>
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-[#666] text-[12px] flex items-center gap-1 cursor-pointer">Convenience fees</p>
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

           {/* Amount Payable */}
           <div className="bg-white rounded-[6px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] px-[18px] py-[18px] flex justify-between items-center mt-1 border-t-[3.5px] border-[#f84464]">
              <p className="text-[#333] font-medium text-[14px]">Amount Payable</p>
              <p className="text-[#333] font-bold text-[18px]">₹{grandTotal.toFixed(2)}</p>
           </div>

        </div>

      </main>
    </div>
  );
}

export default Payment;