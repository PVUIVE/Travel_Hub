import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Header from './components/Header'
import HotelBooking from './components/HotelBooking';
import FlightBooking from './components/FlightBooking';
import Services from './components/Services';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
          </>
        } />
        <Route path="/hotel-booking" element={<HotelBooking />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  )
}

export default App