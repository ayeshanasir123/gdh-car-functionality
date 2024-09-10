"use client";
import { useState, useEffect, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"; // Import useRouter
import { dummyData } from "@/redux/features/cars/car-data";
import MobileNavbar from "@/components/car-navbar";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ResultsPage = () => {
  const [mapUrl, setMapUrl] = useState('');
  const [data, setData] = useState<any>(null);
  const [carType, setCarType] = useState<string>("all");
  const [company, setCompany] = useState<string>("all");
  const [cancellationPolicy, setCancellationPolicy] = useState<string>("all");
  const [payment, setPayment] = useState<string>("all");
  const [miles, setMiles] = useState<string>("all");
  const [fuelType, setFuelType] = useState<string>("all");
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);
  const [isFilterNavVisible, setIsFilterNavVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('Sort By');
  const [selectedFilterOption, setSelectedFilterOption] = useState('Filter By');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); 
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isListFullScreen, setIsListFullScreen] = useState(false);
  const [isCarTypeOpen, setIsCarTypeOpen] = useState(false);

  const router = useRouter(); // Initialize useRouter
  const searchParams = useSearchParams();

  // const searchParams = new URLSearchParams(window.location.search); // Extract query parameters from URL

  // Extract query parameters
  const location = searchParams.get("location");
  const pickUpDate = searchParams.get("pickUpDate");
  const pickUpTime = searchParams.get("pickUpTime");
  const dropOffDate = searchParams.get("dropOffDate");
  const dropOffTime = searchParams.get("dropOffTime");

  // Function to format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Function to format times
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const time = new Date(`1970-01-01T${timeStr}Z`); // Assume timeStr is in HH:mm format
    return time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  // Format dates and times
  const pickUpDateFormatted = formatDate(pickUpDate);
  const pickUpTimeFormatted = formatTime(pickUpTime);
  const dropOffDateFormatted = formatDate(dropOffDate);
  const dropOffTimeFormatted = formatTime(dropOffTime);

  useEffect(() => {
    console.log("Location:", location);
    console.log("Pick Up Date:", pickUpDateFormatted);
    console.log("Pick Up Time:", pickUpTimeFormatted);
    console.log("Drop Off Date:", dropOffDateFormatted);
    console.log("Drop Off Time:", dropOffTimeFormatted);

    if (location) {
      // Encode the location to ensure it's properly formatted in the URL
      const encodedLocation = encodeURIComponent(location);
      const newMapUrl = `https://maps.google.com/maps?q=${encodedLocation}&t=m&z=14&output=embed`;
      setMapUrl(newMapUrl);
    }
  }, [location]);
 




  // useEffect(() => {
  //   if (router.isReady) {
  //     console.log("router.asPath:", router.asPath); // This will show the entire path with query parameters
  //     console.log("router.query:", router.query);   // This will show the parsed query object
  //   }
  // }, [router.isReady]);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleCarType = () => {
    setIsCarTypeOpen((prev) => !prev);
  };

  const toggleMap = () => {
    setIsMapOpen(!isMapOpen);
  };
  const toggleField = () => {
    setIsDataOpen(!isDataOpen);
  };

  const toggleList = () => {
    console.log("hello");
    setIsListFullScreen(!isListFullScreen);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: -34.397, // Example latitude
    lng: 150.644, // Example longitude
  };

  const onLoad = useCallback((map) => {
    console.log("Map Loaded: ", map);
  }, []);

  const toggleFirstDropdown = () => setIsFirstDropdownOpen(!isFirstDropdownOpen);

  const handleSortOptionClick = (option) => {
    setSelectedSortOption(option);
    setIsFirstDropdownOpen(false); // Close dropdown after selection
  };

  const handleFilterOptionClick = (option) => {
    setSelectedFilterOption(option);
    setIsSecondDropdownOpen(false); // Close dropdown after selection
  };

  const toggleSecondDropdown = () => {
    setIsSecondDropdownOpen(!isSecondDropdownOpen);
    setIsFilterDropdownOpen(!isFilterDropdownOpen); // Toggle car options visibility
  };

  const buttonStyle = {
    cursor: 'pointer',
    color: 'rgb(0, 104, 239)',
    backgroundColor: 'rgb(232, 242, 255)',
    border: '1px solid rgb(0, 104, 239)',
    width: '100%',
    maxWidth: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRadius: '9999px',
    padding: '4px 8px',
    height: '32px',
    fontSize: '12px',
    margin: '0',
  };

  useEffect(() => {
    setData(dummyData);
  }, []);

  useEffect(() => {
    if (data) {
      let filtered = data.cars;

      if (carType !== "all") {
        filtered = filtered.filter((car) =>
          car.type && typeof car.type === "string" ? car.type.toLowerCase().includes(carType.toLowerCase()) : false
        );
      }

      if (company !== "all") {
        filtered = filtered.filter((car) =>
          car.company && typeof car.company === "string" ? car.company.toLowerCase().includes(company.toLowerCase()) : false
        );
      }

      if (cancellationPolicy !== "all") {
        filtered = filtered.filter((car) =>
          car.cancellationPolicy && typeof car.cancellationPolicy === "string" ? car.cancellationPolicy.toLowerCase().includes(cancellationPolicy.toLowerCase()) : false
        );
      }

      if (payment !== "all") {
        filtered = filtered.filter((car) =>
          car.payment && typeof car.payment === "string" ? car.payment.toLowerCase().includes(payment.toLowerCase()) : false
        );
      }

      if (miles !== "all") {
        filtered = filtered.filter((car) =>
          car.miles && typeof car.miles === "string" ? car.miles.toLowerCase().includes(miles.toLowerCase()) : false
        );
      }

      if (fuelType !== "all") {
        filtered = filtered.filter((car) =>
          car.fuelType && typeof car.fuelType === "string" ? car.fuelType.toLowerCase().includes(fuelType.toLowerCase()) : false
        );
      }

      setFilteredCars(filtered);
    }
  }, [carType, company, cancellationPolicy, payment, miles, fuelType, data]);

  const toggleMapFullScreen = () => {
    setIsMapFullScreen(!isMapFullScreen);
  };

  const toggleFilterNav = () => {
    setIsFilterNavVisible(!isFilterNavVisible);
  };

  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <section className="min-h-screen bg-gray-100">
      {/* <div className="my-8"> */}
      <div className="hidden lg:block my-8">
        <MobileNavbar />
     
        {/* <MobileNavbar /> */}
        {/* <button onClick={toggleMapFullScreen}>{isMapFullScreen ? "Show List" : "Show Map"}</button>
        <button onClick={toggleFilterNav}>Toggle Filter</button> */}
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Filters - Hidden on Mobile */}
          <aside className="hidden lg:block col-span-12 lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Sort By</h2>
            <select className="w-full p-2 border rounded-lg mb-6">
              <option>Lowest Total Price</option>
              <option>Highest Total Price</option>
            </select>

            <h2 className="text-lg font-semibold mb-4">Car Type</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-types"
                  name="car-type"
                  value="all"
                  checked={carType === "all"}
                  onChange={(e) => setCarType(e.target.value)}
                />
                <label htmlFor="all-types" className="ml-2">All Car Types</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="suv"
                  name="car-type"
                  value="SUV"
                  checked={carType === "SUV"}
                  onChange={(e) => setCarType(e.target.value)}
                />
                <label htmlFor="suv" className="ml-2">SUV</label>
              </div>
              {/* Add more car types as needed */}
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Car Company</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-companies"
                  name="car-company"
                  value="all"
                  checked={company === "all"}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <label htmlFor="all-companies" className="ml-2">All Car Companies</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="avis"
                  name="car-company"
                  value="Avis"
                  checked={company === "Avis"}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <label htmlFor="avis" className="ml-2">Avis</label>
              </div>
              {/* Add more car companies as needed */}
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Cancellation Policy</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-policies"
                  name="cancellation-policy"
                  value="all"
                  checked={cancellationPolicy === "all"}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                />
                <label htmlFor="all-policies" className="ml-2">All Policies</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="flexible-cancellation"
                  name="cancellation-policy"
                  value="Flexible"
                  checked={cancellationPolicy === "Flexible"}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                />
                <label htmlFor="flexible-cancellation" className="ml-2">Flexible Cancellation</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="free-cancellation"
                  name="cancellation-policy"
                  value="Free"
                  checked={cancellationPolicy === "Free"}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                />
                <label htmlFor="free-cancellation" className="ml-2">Free Cancellation</label>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Payment</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-payments"
                  name="payment"
                  value="all"
                  checked={payment === "all"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="all-payments" className="ml-2">All Payments</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="pay-later"
                  name="payment"
                  value="Pay Later"
                  checked={payment === "Pay Later"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="pay-later" className="ml-2">Pay Later</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="pay-now"
                  name="payment"
                  value="Pay Now"
                  checked={payment === "Pay Now"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label htmlFor="pay-now" className="ml-2">Pay Now</label>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Miles</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-mile-types"
                  name="miles"
                  value="all"
                  checked={miles === "all"}
                  onChange={(e) => setMiles(e.target.value)}
                />
                <label htmlFor="all-mile-types" className="ml-2">All Mile Types</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="unlimited"
                  name="miles"
                  value="Unlimited"
                  checked={miles === "Unlimited"}
                  onChange={(e) => setMiles(e.target.value)}
                />
                <label htmlFor="unlimited" className="ml-2">Unlimited</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="limited"
                  name="miles"
                  value="Limited"
                  checked={miles === "Limited"}
                  onChange={(e) => setMiles(e.target.value)}
                />
                <label htmlFor="limited" className="ml-2">Limited</label>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 mt-6">Fuel Type</h2>
            <div className="space-y-2">
              <div>
                <input
                  type="radio"
                  id="all-fuel-types"
                  name="fuel-type"
                  value="all"
                  checked={fuelType === "all"}
                  onChange={(e) => setFuelType(e.target.value)}
                />
                <label htmlFor="all-fuel-types" className="ml-2">All Fuel Types</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="gasoline"
                  name="fuel-type"
                  value="Gasoline"
                  checked={fuelType === "Gasoline"}
                  onChange={(e) => setFuelType(e.target.value)}
                />
                <label htmlFor="gasoline" className="ml-2">Gasoline</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="diesel"
                  name="fuel-type"
                  value="Diesel"
                  checked={fuelType === "Diesel"}
                  onChange={(e) => setFuelType(e.target.value)}
                />
                <label htmlFor="diesel" className="ml-2">Diesel</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="electric"
                  name="fuel-type"
                  value="Electric"
                  checked={fuelType === "Electric"}
                  onChange={(e) => setFuelType(e.target.value)}
                />
                <label htmlFor="electric" className="ml-2">Electric</label>
              </div>
            </div>
          {/* ... (same as before) */}
          </aside>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-9">
          <div className="bg-white p-4 rounded-lg shadow-lg hidden lg:block">
  <h1 className="text-2xl font-semibold mb-4">Choose Your Rental Car</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <button className="p-2 border rounded-lg text-center text-sm">
      Small <br /> <span className="text-xs">Up to 5 people</span> <br />
      <span className="font-bold">From $35 Total</span>
    </button>
    <button className="p-2 border rounded-lg text-center text-sm">
      Medium <br /> <span className="text-xs">Up to 5 people</span> <br />
      <span className="font-bold">From $35 Total</span>
    </button>
    <button className="p-2 border rounded-lg text-center text-sm">
      Large <br /> <span className="text-xs">Up to 5 people</span> <br />
      <span className="font-bold">From $35 Total</span>
    </button>
  </div>
</div>

            {/* Mobile Filters */}
    
            
    <>
      <div className="lg:hidden bg-blue-500 text-white p-2 flex justify-between items-center">
      <div className="flex-1">
  {/* Input Field */}
  <div className="flex items-center bg-blue-600 text-white rounded-md p-4">
    <div className="mr-3">
   

<Image
            src="/assets/icons/search-icon.svg" // Path to your search icon
            alt="Search Icon"
            height={16}
            width={16}
            className="h-[16px] w-[16px]"
          />
    </div>
    <div 
    onClick={toggleField}
    >
    
      <h2 className="font-bold">{location}</h2>
      <p className="text-sm">
        {pickUpDateFormatted}, {pickUpTimeFormatted} – {dropOffDateFormatted}, {dropOffTimeFormatted}
      </p>
    </div>
  </div>
</div>
        <div className="flex items-center">
          <div
            color="primary"
            data-autobot-element-id="CARS_LISTINGS_VIEW_MAP_M"
            role="button"
            className="Box-sc-n9h3nv-0 RclSearchForm__CursorBox-dsr__sc-ts4lye-4 jFVdGi cSPwFk"
            onClick={toggleMap}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              aria-hidden="true"
              fill="currentcolor"
              color="text.lightest"
              tabIndex="-1"
              focusable="false"
              role="img"
              className="Svg-sc-12lgb6u-0 jaEucA Map__SvgMap-sc-1mu2jdi-0 eSDrgt"
            >
              <path d="M20.5 3h-.2L15 5.1 9 3 3.4 4.9c-.2.1-.4.3-.4.5v15.1c0 .3.2.5.5.5h.2L9 18.9l6 2.1 5.6-1.9c.2-.1.4-.2.4-.5V3.5c0-.3-.2-.5-.5-.5zM15 19l-6-2.1V5l6 2.1V19z"></path>
            </svg>
            <div color="text.lightest" fontSize="0" className="Text-sc-1xtb652-0 kTihfM">Map</div>
          </div>
          <div
            color="primary"
            data-autobot-element-id="CARS_LISTINGS_VIEW_FILTERS_M"
            role="button"
            className="Box-sc-n9h3nv-0 RclSearchForm__CursorBox-dsr__sc-ts4lye-4 jFVdGi cSPwFk ml-4"
         onClick={toggleList}
         >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              aria-hidden="true"
              fill="currentcolor"
              color="text.lightest"
              tabIndex="-1"
              focusable="false"
              role="img"
              className="Svg-sc-12lgb6u-0 jaEucA Tune__SvgTune-sc-1qoribx-0 gAkfkX"
            >
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
            </svg>
            <div color="text.lightest" fontSize="0" className="Text-sc-1xtb652-0 bDoFCT">Filters</div>
          </div>
        </div>
      </div>

      {isMapOpen && (
     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
    
    
     <div className="relative bg-white p-4 w-full h-full">
       {/* Header with Show list and Filters buttons */}
       <div className="lg:hidden bg-blue-500 text-white p-2 flex justify-between items-center">
       <div className="flex-1">
  {/* Input Field */}
  <div className="flex items-center bg-blue-600 text-white rounded-md p-4">
    <div className="mr-3">
   

<Image
            src="/assets/icons/search-icon.svg" // Path to your search icon
            alt="Search Icon"
            height={16}
            width={16}
            className="h-[16px] w-[16px]"
          />
    </div>
    <div 
    onClick={toggleField}
    >
    
      <h2 className="font-bold">{location}</h2>
      <p className="text-sm">
        {pickUpDateFormatted}, {pickUpTimeFormatted} – {dropOffDateFormatted}, {dropOffTimeFormatted}
      </p>
    </div>
  </div>
</div>
         <div className="flex items-center">
           <div
             role="button"
             className="Box-sc-n9h3nv-0 RclSearchForm__CursorBox-dsr__sc-ts4lye-4 jFVdGi cSPwFk"
             onClick={toggleMap}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               height="24"
               width="24"
               aria-hidden="true"
               fill="currentcolor"
               color="text.lightest"
               tabIndex="-1"
               focusable="false"
               role="img"
               className="Svg-sc-12lgb6u-0 jaEucA Map__SvgMap-sc-1mu2jdi-0 eSDrgt"
             >
               <path d="M20.5 3h-.2L15 5.1 9 3 3.4 4.9c-.2.1-.4.3-.4.5v15.1c0 .3.2.5.5.5h.2L9 18.9l6 2.1 5.6-1.9c.2-.1.4-.2.4-.5V3.5c0-.3-.2-.5-.5-.5zM15 19l-6-2.1V5l6 2.1V19z"></path>
             </svg>
             <div
               color="text.lightest"
               fontSize="0"
               className="Text-sc-1xtb652-0 kTihfM"
               onClick={toggleMap}
             >
               Show list
             </div>
           </div>
           <div
             role="button"
             className="Box-sc-n9h3nv-0 RclSearchForm__CursorBox-dsr__sc-ts4lye-4 jFVdGi cSPwFk ml-4"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               height="24"
               width="24"
               aria-hidden="true"
               fill="currentcolor"
               color="text.lightest"
               tabIndex="-1"
               focusable="false"
               role="img"
               className="Svg-sc-12lgb6u-0 jaEucA Tune__SvgTune-sc-1qoribx-0 gAkfkX"
             >
               <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
             </svg>
             <div color="text.lightest" fontSize="0" className="Text-sc-1xtb652-0 bDoFCT">
               Filters
             </div>
           </div>
         </div>
       </div>
       {/* Map iframe */}
       {/* <iframe
          className="map1"
          style={{ width: "100%", height: "100%", border: "0" }}
          scrolling="no"
          src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=London&amp;ie=UTF8&amp;hq=&amp;hnear=London,+United+Kingdom&amp;t=m&amp;output=embed"
          allowFullScreen
        ></iframe> */}

{/* <iframe
        className="map1"
        style={{ width: "100%", height: "100%", border: "0" }}
        scrolling="no"
        src={mapUrl}
        allowFullScreen
      ></iframe> */}

<iframe
  className="map1"
  style={{ width: "100%", height: "100%", border: "0" }}
  scrolling="no"
  src={mapUrl} // Use `MapComponent` directly if not using iframe
  allowFullScreen
></iframe>
     </div>
   </div>
      )}



{isListFullScreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative bg-white p-4 w-full h-full overflow-auto">
            {/* Close Button */}
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-blue-600 font-bold">Filter Cars</h2>
              <button className="p-2" onClick={toggleList}>
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-4">
              {/* Car Type */}
              <div>
                <button
                  className="flex justify-between w-full p-4 bg-gray-100 rounded-md"
                  onClick={toggleCarType}
                >
                  <span>Car Type</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={`M${isCarTypeOpen ? '19 15l-7-7-7 7' : '19 9l-7 7-7-7'}`}
                    />
                  </svg>
                </button>

                {/* Conditionally render the expanded filter section */}
                {isCarTypeOpen && (
                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center justify-between">
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" checked />
                        <span className="ml-2">All Car Types</span>
                      </label>
                      <span>From</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      {/* Car Type Options */}
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Car</span>
                        </label>
                        <span>$24 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">SUV</span>
                        </label>
                        <span>$35 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Van</span>
                        </label>
                        <span>$39 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Recreational Vehicle</span>
                        </label>
                        <span>$206 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Convertible</span>
                        </label>
                        <span>$154 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Pickup Truck</span>
                        </label>
                        <span>$105 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Electric Vehicle</span>
                        </label>
                        <span>$120 Total</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="inline-flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="ml-2">Supplier's Choice</span>
                        </label>
                        <span>$24 Total</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Repeat similar blocks for other filters like Car Company, Deals, etc. */}

            </div>

            {/* Show Results Button */}
            <div className="fixed bottom-0 inset-x-0 bg-white p-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-md" onClick={toggleList}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

{isDataOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative bg-white p-4 w-full h-full overflow-auto">
            {/* Close Button */}
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-blue-600 font-bold">Filter Data</h2>
              <button className="p-2" onClick={toggleField}>
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>


            {/* Show Results Button */}
            <div className="fixed bottom-0 inset-x-0 bg-white p-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-md" onClick={toggleField}>
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

    </>




      {/* </div> */}
            <div className="lg:hidden mt-6">
  <div className="bg-white p-4 rounded-lg shadow-lg">
    {/* Header */}
    <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Rental Car</h2>

    {/* Dropdowns on One Line */}
    <div className="flex space-x-4 mb-4">
   

      {/* Sort By Dropdown */}
      <div className="relative">
        <button
         style={{
          cursor: 'pointer',
          color: 'rgb(0, 104, 239)',
          backgroundColor: 'rgb(232, 242, 255)',
          border: '1px solid rgb(0, 104, 239)',
          width: '100%',
          maxWidth: '100%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          whiteSpace: 'nowrap',
          borderRadius: '9999px',
          padding: '4px 8px',
          height: '32px',
          fontSize: '12px',
          margin: '0',
        }}
          onClick={toggleFirstDropdown}
          className={`
            py-2 px-4 
            border border-gray-300 
            rounded-lg 
            flex justify-between items-center 
            bg-gray-100
            hover:shadow-md
            focus:outline-none 
          `}
        >
          <span className="font-medium text-gray-700">Sort By : {`${selectedSortOption}`}</span>
          <span className="text-gray-500">▼</span>
        </button>
        {isFirstDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 border rounded-lg shadow-lg bg-white w-64 max-h-40 overflow-y-auto z-10">
          {['Recommended', 'Lowest Total Price', 'Car Type', 'Total Savings'].map((option) => (
            <button 
              key={option} 
              className="w-full px-4 py-3 text-left hover:bg-gray-100 transition"
              onClick={() => handleSortOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
        )}
      </div>
         {/* Filter By Dropdown */}
         <div className="relative">
        <button
          style={{
            cursor: 'pointer',
            color: 'rgb(0, 104, 239)',
            backgroundColor: 'rgb(232, 242, 255)',
            border: '1px solid rgb(0, 104, 239)',
            width: '100%',
            maxWidth: '100%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            whiteSpace: 'nowrap',
            borderRadius: '9999px',
            padding: '4px 8px',
            height: '32px',
            fontSize: '12px',
            margin: '0',
          }}
          onClick={toggleSecondDropdown}
          className={`
            py-2 px-4 
            border border-gray-300 
            rounded-lg 
            flex justify-between items-center 
            bg-gray-100 
            hover:shadow-md 
            focus:outline-none
          `}
        >
          <span className="font-medium text-gray-700">{`${selectedFilterOption}`} </span>
          <span className="text-gray-500">▼</span> 
        </button>
      </div>
    </div>

    {/* Car Options - Conditionally render based on isFilterDropdownOpen */}
    <div className="relative">
  {isFilterDropdownOpen && (
    <div className="absolute right-0 top-full mt-2 border rounded-lg shadow-lg bg-white w-80 max-w-xs overflow-hidden z-10">
      <div className="p-3 space-y-2">
        {['Small', 'Medium', 'Large', 'SUV', 'Convertible'].map((option) => (
          <div 
            key={option} 
            className="flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-100 transition-colors cursor-pointer" 
            onClick={() => handleFilterOptionClick(option)}
          >
            <div>
              <div className="text-sm font-semibold text-black">{option}</div>
              <div className="text-xs text-gray-600">Up to {option === 'Convertible' ? '4' : '5'} people</div> 
            </div>
            <div className="font-bold text-green-600">${option === 'Convertible' ? '170' : '30'} Total</div> 
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-200 flex justify-end">
        <button 
          className="py-1 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsFilterDropdownOpen(false)} // Close dropdown
        >
          Save
        </button>
      </div>
    </div>
  )}
</div>


  

    {/* Done Button - Conditionally render based on isFilterDropdownOpen */}
    {/* {isFilterDropdownOpen && ( 
      <button className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
        Done
      </button>
    )} */}
  </div>
</div>




            <div className="mt-6">
              {filteredCars.map((car: any) => (
                <div
                  key={car.id}
                  className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-sm bg-white mb-4"
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full md:w-24 h-auto object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{car.name}</h2>
                      <p className="text-sm text-gray-600">{car.description}</p>
                      <p className="text-sm text-gray-600">{data.location}</p>
                      <p className="text-sm text-gray-600">{car.transmission}</p>
                      <div className="flex items-center mt-2 text-yellow-500">
                        <span className="font-semibold">6.6</span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({car.ratings || "390"} Ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-xl font-bold text-green-600">{car.price}</p>
                    <p className="text-sm text-gray-600">Includes taxes and fees</p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                      {car.payNow ? "Pay Now" : "Choose"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ResultsPage;
