import  { useState } from "react";
import DatePicker from "react-datepicker"; // A popular date picker library
import "react-datepicker/dist/react-datepicker.css"; // Default styling for the date picker

// Sample data for available time slots (grouped by date)
const availableTimeSlotsByDate = {
  "2023-10-25": [
    { id: 1, time: "09:00 AM" },
    { id: 2, time: "10:00 AM" },
    { id: 3, time: "11:00 AM" },
  ],
  "2023-10-26": [
    { id: 4, time: "01:00 PM" },
    { id: 5, time: "02:00 PM" },
    { id: 6, time: "03:00 PM" },
  ],
  "2023-10-27": [
    { id: 7, time: "10:00 AM" },
    { id: 8, time: "11:00 AM" },
    { id: 9, time: "04:00 PM" },
  ],
};

const BikeServicingTimeSlots = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Format the selected date to match the key in availableTimeSlotsByDate
  const formattedDate = selectedDate.toISOString().split("T")[0];

  // Get available time slots for the selected date
  const availableTimeSlots = availableTimeSlotsByDate[formattedDate] || [];

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    alert(`You selected ${slot.time} on ${formattedDate} for bike servicing.`);
  };

  return (
    <div className="font-sans mx-5 my-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Check Available Time Slots for Bike Servicing
      </h2>

      {/* Date Picker */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Date:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null); // Reset selected slot when date changes
          }}
          minDate={new Date()} // Disable past dates
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Available Time Slots */}
      <div className="space-y-3">
        {availableTimeSlots.length > 0 ? (
          availableTimeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 border border-gray-300 rounded-lg cursor-pointer ${
                selectedSlot?.id === slot.id
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSlotSelection(slot)}
            >
              <span className="text-gray-700">{slot.time}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No time slots available for this date.
          </p>
        )}
      </div>

      {/* Selected Time Slot */}
      {selectedSlot && (
        <p className="mt-4 text-green-600">
          Selected Time Slot: <strong>{selectedSlot.time}</strong> on{" "}
          <strong>{formattedDate}</strong>
        </p>
      )}
    </div>
  );
};

export default BikeServicingTimeSlots;
