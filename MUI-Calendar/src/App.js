import './App.css';
import Calendar from './components/Calendar';
import { useState } from 'react';
 
function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='App'>
      <h1 className='header-text'>Calendar</h1>
      <Calendar onDateChange={setSelectedDate} initialDate={selectedDate} />
      <div className='selected-date'>
        {selectedDate.toDateString()}
      </div>
    </div>
  );
}

export default App;
