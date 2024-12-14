import React, { useState } from 'react';
import { TransferAda } from './TransferAda'; // Import the TransferAda component

// Define the Hotel type
type Hotel = {
  id: number;
  name: string;
  description: string;
  image: string;
  walletAddress: string; // Add walletAddress to the type
  price: number; // Add price to the type
};

const hotels: Hotel[] = [
  { 
    id: 1, 
    name: "Hotel Paradise", 
    description: "A serene getaway with breathtaking ocean views and top-notch amenities.", 
    image: "/images/hotel-paradise.png", // Image stored in public/images
    walletAddress: "addr_test1qphhzz35u87zm2pnpn0mnukhqdpe75s544dkkhvetzudd58sqf37e8zeymgvla7nc8mv6l5q9yzeeukhy9g3p0hyc8hsze3xk2", // Example wallet address
    price: 200 // Price for booking
  },
  { 
    id: 2, 
    name: "Mountain Retreat", 
    description: "Nestled in the mountains, this hotel offers a cozy atmosphere and stunning landscapes.", 
    image: "/images/mountain-retreat.png", // Image stored in public/images
    walletAddress: "addr_test1qzr62yz87n6cd8arq38qhaw4sk2588z9vedlwup9gdhu73td6uznftkdmqqr4yvfe5cyeq9l5fssxvftecrg8dqhymasxcsk64", // Example wallet address
    price: 150 // Price for booking
  },
  { 
    id: 3, 
    name: "City Center Inn", 
    description: "Located in the heart of the city, this hotel provides easy access to local attractions and vibrant nightlife.", 
    image: "/images/city-center-inn.png", // Image stored in public/images
    walletAddress: "addr_test1qpk52677keddczzacxyfkdx6a4x90zmu2pwkt92ncsjzzvcheraha7pjyvyk0nr6s4jrytgw4dm8vc4k69dp276exjuq5fx5l3", // Example wallet address
    price: 100 // Price for booking
  },
];

const HotelBooking = () => {
  const [isTransferVisible, setTransferVisible] = useState(false); // State to control TransferAda visibility
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null); // Specify the type for selectedHotel
  const [amount, setAmount] = useState<number>(0); // State to track the entered amount
  const [error, setError] = useState<string>(''); // State to track error messages

  const handleBooking = (hotel: Hotel) => {
    setSelectedHotel(hotel); // Set the selected hotel
    setTransferVisible(true); // Show the TransferAda component when booking
  };

  const handleTransfer = () => {
    if (amount < (selectedHotel?.price || 0)) {
      setError(`Insufficient funds. You need at least ${selectedHotel?.price} ADA to book this hotel.`);
    } else {
      setError(''); // Clear any previous errors
      // Proceed with the transfer logic here
      console.log(`Proceeding with transfer of ${amount} ADA for ${selectedHotel?.name}`);
      // Call the TransferAda component or any other logic needed
      setTransferVisible(false); // Optionally close after success
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book 5-Star Hotel Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-700 mt-2">{hotel.description}</p>
              <p className="text-lg font-bold mt-2">Price: {hotel.price} ADA</p>
              <button 
                onClick={() => handleBooking(hotel)} 
                className="mt-4 w-full p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition duration-300"
              >
                Book Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show TransferAda component when booking */}
      {isTransferVisible && selectedHotel && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Transfer Amount</h2>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))} 
            placeholder="Enter amount in ADA" 
            className="border rounded p-2 w-full mt-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <TransferAda 
            defaultAddress={selectedHotel.walletAddress} // Provide the wallet address
            projectTitle={`Hotel Booking Project - ${selectedHotel.name}`} // Provide the hotel name
            onClose={() => setTransferVisible(false)} // Close the TransferAda component
            onSuccess={(amount) => {
              console.log(`Successfully transferred ${amount} ADA for ${selectedHotel.name}!`);
              setTransferVisible(false); // Optionally close after success
            }}
          />
          <button 
            onClick={handleTransfer} 
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:opacity-90 transition duration-300"
          >
            Confirm Transfer
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelBooking; 