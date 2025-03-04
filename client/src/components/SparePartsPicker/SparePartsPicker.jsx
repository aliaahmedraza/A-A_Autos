import React from "react";
import Select from "react-select";

const sparePartsOptions = [
  {
    label: "Engine Parts",
    options: [
      { value: "Cylinder Block", label: "Cylinder Block" },
      { value: "Cylinder Head", label: "Cylinder Head" },
      { value: "Piston", label: "Piston" },
      { value: "Piston Rings", label: "Piston Rings" },
      { value: "Camshaft", label: "Camshaft" },
      { value: "Crankshaft", label: "Crankshaft" },
      { value: "Connecting Rod", label: "Connecting Rod" },
      { value: "Engine Valves", label: "Engine Valves (Intake & Exhaust)" },
      { value: "Valve Springs", label: "Valve Springs" },
      { value: "Rocker Arms", label: "Rocker Arms" },
      { value: "Push Rods", label: "Push Rods" },
      { value: "Timing Chain", label: "Timing Chain" },
      { value: "Timing Chain Tensioner", label: "Timing Chain Tensioner" },
      { value: "Cam Chain Sprocket", label: "Cam Chain Sprocket" },
      { value: "Gaskets & Oil Seals", label: "Gaskets & Oil Seals" },
      { value: "Engine Oil Pump", label: "Engine Oil Pump" },
      { value: "Oil Filter", label: "Oil Filter" },
      { value: "Magnet Coil", label: "Magnet Coil (Stator Coil)" },
      { value: "Engine Mounting Brackets", label: "Engine Mounting Brackets" },
    ],
  },
  {
    label: "Transmission & Clutch System",
    options: [
      {
        value: "Clutch Plate Set",
        label: "Clutch Plate Set (Friction & Steel Plates)",
      },
      { value: "Clutch Hub", label: "Clutch Hub" },
      { value: "Clutch Springs", label: "Clutch Springs" },
      { value: "Clutch Cable", label: "Clutch Cable" },
      { value: "Clutch Lever", label: "Clutch Lever" },
      { value: "Gear Set", label: "Gear Set (Primary & Secondary Gears)" },
      { value: "Gear Shift Drum", label: "Gear Shift Drum" },
      { value: "Gear Shift Lever", label: "Gear Shift Lever" },
      { value: "Gear Selector Forks", label: "Gear Selector Forks" },
      { value: "Gear Bushings", label: "Gear Bushings" },
      { value: "Kick Start Lever", label: "Kick Start Lever" },
      { value: "Kick Shaft Assembly", label: "Kick Shaft Assembly" },
    ],
  },
  {
    label: "Electrical System",
    options: [
      { value: "Battery", label: "Battery" },
      { value: "Rectifier", label: "Rectifier/Regulator" },
      { value: "CDI Unit", label: "CDI Unit" },
      { value: "Ignition Coil", label: "Ignition Coil" },
      { value: "Spark Plug", label: "Spark Plug" },
      { value: "Alternator Assembly", label: "Alternator Assembly" },
      { value: "Headlight Bulb", label: "Headlight Bulb" },
      { value: "Tail Light Bulb", label: "Tail Light Bulb" },
      { value: "Indicator Bulbs", label: "Indicator Bulbs" },
      {
        value: "LED Light Conversions",
        label: "LED Light Conversions (Optional)",
      },
      { value: "Wiring Harness", label: "Wiring Harness" },
      {
        value: "Switch Assembly",
        label: "Switch Assembly (Handlebar Switches)",
      },
      { value: "Horn", label: "Horn" },
      { value: "Handlebar Lock", label: "Handlebar Lock with Key" },
    ],
  },
  {
    label: "Braking System",
    options: [
      { value: "Front Brake Shoes", label: "Front Brake Shoes" },
      { value: "Rear Brake Shoes", label: "Rear Brake Shoes" },
      { value: "Front Disc Brake", label: "Front Disc Brake (if applicable)" },
      { value: "Rear Disc Brake", label: "Rear Disc Brake (if applicable)" },
      { value: "Disc Brake Pads", label: "Disc Brake Pads" },
      { value: "Brake Disc Rotor", label: "Brake Disc Rotor" },
      { value: "Brake Drum", label: "Brake Drum" },
      { value: "Brake Cable", label: "Brake Cable (Front & Rear)" },
      { value: "Brake Lever", label: "Brake Lever" },
      { value: "Master Cylinder", label: "Master Cylinder" },
      { value: "Brake Fluid Reservoir", label: "Brake Fluid Reservoir" },
      { value: "Brake Caliper Assembly", label: "Brake Caliper Assembly" },
    ],
  },
  {
    label: "Suspension & Wheels",
    options: [
      { value: "Front Fork Assembly", label: "Front Fork Assembly" },
      { value: "Rear Shock Absorbers", label: "Rear Shock Absorbers" },
      { value: "Front Rim", label: "Front Rim (Alloy/Spoke)" },
      { value: "Rear Rim", label: "Rear Rim (Alloy/Spoke)" },
      { value: "Wheel Bearings", label: "Wheel Bearings" },
      { value: "Wheel Hubs", label: "Wheel Hubs" },
      { value: "Front Axle", label: "Front Axle" },
      { value: "Rear Axle", label: "Rear Axle" },
      { value: "Spokes", label: "Spokes (for spoke wheels)" },
      { value: "Front Tire", label: "Front Tire" },
      { value: "Rear Tire", label: "Rear Tire" },
      { value: "Inner Tubes", label: "Inner Tubes" },
    ],
  },
  {
    label: "Fuel System",
    options: [
      { value: "Fuel Tank", label: "Fuel Tank" },
      { value: "Fuel Tank Cap", label: "Fuel Tank Cap with Lock" },
      { value: "Fuel Tap", label: "Fuel Tap (Petrol Cock)" },
      { value: "Fuel Filter", label: "Fuel Filter" },
      { value: "Fuel Pipe", label: "Fuel Pipe/Hose" },
      { value: "Carburetor", label: "Carburetor Assembly" },
      { value: "Carburetor Jets", label: "Carburetor Jets & Needle" },
      { value: "Carburetor Float Bowl", label: "Carburetor Float Bowl" },
      { value: "Throttle Cable", label: "Throttle Cable" },
    ],
  },
  {
    label: "Exhaust System",
    options: [
      { value: "Silencer", label: "Silencer (Exhaust Pipe)" },
      { value: "Silencer Cover", label: "Silencer Cover (Heat Shield)" },
      { value: "Muffler Assembly", label: "Muffler Assembly" },
      { value: "Exhaust Gasket", label: "Exhaust Gasket" },
    ],
  },
  {
    label: "Frame & Body Parts",
    options: [
      { value: "Main Frame", label: "Main Frame" },
      { value: "Front Mudguard", label: "Front Mudguard/Fender" },
      { value: "Rear Mudguard", label: "Rear Mudguard/Fender" },
      { value: "Side Covers", label: "Side Covers" },
      { value: "Seat Assembly", label: "Seat Assembly" },
      { value: "Seat Cover", label: "Seat Cover" },
      { value: "Seat Lock", label: "Seat Lock" },
      { value: "Side Stand", label: "Side Stand" },
      { value: "Main Stand", label: "Main Stand" },
      { value: "Handlebar", label: "Handlebar" },
      { value: "Handlebar Grips", label: "Handlebar Grips" },
      { value: "Handlebar End Caps", label: "Handlebar End Caps" },
    ],
  },
];

const SparePartsPicker = ({ selectedPart, setSelectedPart }) => {
  return (
      <Select
  options={sparePartsOptions}
  placeholder="Select Spare Part..."
  value={selectedPart}
  onChange={setSelectedPart}
  isClearable={true} 
  isSearchable={true} 
  className="w-full text-black"
  menuPortalTarget={document.body} // Renders the menu outside to avoid overlap
  menuPosition="fixed" 
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), 
  }}
/>

  );
};

export default SparePartsPicker;
