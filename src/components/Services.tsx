import React, { useState } from 'react';
import { TransferAda } from './TransferAda'; // Import the TransferAda component

// Define the Car type
type Car = {
  id: number;
  model: string;
  price: number;
  description: string;
  image: string;
  walletAddress: string; // Add walletAddress to the type
};

const cars: Car[] = [
  { 
    id: 1, 
    model: "Toyota Camry", 
    price: 50, 
    description: "Luxury sedan, fuel-efficient.", 
    image: "images/car-a.png", 
    walletAddress: "addr_test1qphhzz35u87zm2pnpn0mnukhqdpe75s544dkkhvetzudd58sqf37e8zeymgvla7nc8mv6l5q9yzeeukhy9g3p0hyc8hsze3xk2" // Example wallet address
  },
  { 
    id: 2, 
    model: "Honda CR-V", 
    price: 70, 
    description: "Spacious SUV, suitable for families.", 
    image: "images/car-b.png", 
    walletAddress: "addr_test1qzr62yz87n6cd8arq38qhaw4sk2588z9vedlwup9gdhu73td6uznftkdmqqr4yvfe5cyeq9l5fssxvftecrg8dqhymasxcsk64" // Example wallet address
  },
  { 
    id: 3, 
    model: "Ford Mustang", 
    price: 100, 
    description: "Powerful sports car, an amazing driving experience.", 
    image: "images/car-c.png", 
    walletAddress: "addr_test1qpk52677keddczzacxyfkdx6a4x90zmu2pwkt92ncsjzzvcheraha7pjyvyk0nr6s4jrytgw4dm8vc4k69dp276exjuq5fx5l3" // Example wallet address
  },
];

const CarRental = () => {
  const [isTransferVisible, setTransferVisible] = useState(false); // State to control TransferAda visibility
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); // State to track selected car
  const [amount, setAmount] = useState<number>(0); // State to track the entered amount
  const [error, setError] = useState<string>(''); // State to track error messages

  const handleBooking = (car: Car) => {
    setSelectedCar(car); // Set the selected car
    setTransferVisible(true); // Show the TransferAda component when booking
  };

  const handleTransfer = () => {
    if (amount < (selectedCar?.price || 0)) {
      setError(`Insufficient funds. You need at least ${selectedCar?.price} ADA to rent this car.`);
    } else {
      setError(''); // Clear any previous errors
      // Proceed with the transfer logic here
      console.log(`Proceeding with transfer of ${amount} ADA for ${selectedCar?.model}`);
      // Call the TransferAda component or any other logic needed
      setTransferVisible(false); // Optionally close after success
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Car Rental Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{car.model}</h2>
              <p className="text-gray-700 mt-2">{car.description}</p>
              <p className="text-lg font-bold mt-2">Price: {car.price} ADA/day</p>
              <button 
                onClick={() => handleBooking(car)} 
                className="mt-4 w-full p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition duration-300"
              >
                Book Car
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show TransferAda component when booking */}
      {isTransferVisible && selectedCar && (
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
            defaultAddress={selectedCar.walletAddress} // Provide the wallet address
            projectTitle={`Car Rental Project - ${selectedCar.model}`} // Provide the car model
            onClose={() => setTransferVisible(false)} // Close the TransferAda component
            onSuccess={(amount) => {
              console.log(`Successfully transferred ${amount} ADA for ${selectedCar.model}!`);
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

export default CarRental; 