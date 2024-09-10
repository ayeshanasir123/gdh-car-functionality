// pages/results-page.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummyData } from "@/redux/features/cars/car-data";

const ResultsPage = () => {
  const router = useRouter();
  const { searchData } = router.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (searchData) {
      setData(JSON.parse(searchData as string));
    } else {
      // Use dummy data if searchData is not available
      setData(dummyData);
    }
  }, [searchData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="results-container p-4">
      <h1 className="text-2xl font-semibold mb-4">Car Rental Options</h1>
      <div className="space-y-4">
        {data.cars.map((car: any) => (
          <div
            key={car.id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center">
              <img
                src={car.image}
                alt={car.name}
                className="w-24 h-24 object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{car.name}</h2>
                <p className="text-sm text-gray-600">{car.description}</p>
                <p className="text-sm text-gray-600">{car.pickupLocation}</p>
                <p className="text-sm text-gray-600">{car.mileage}</p>
                <p className="text-sm text-gray-600">{car.checkIn}</p>
                <div className="flex items-center mt-2 text-yellow-500">
                  <span className="font-semibold">{car.rating}</span>
                  <span className="ml-1 text-xs text-gray-500">
                    ({car.ratings} Ratings)
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">{car.price}</p>
              <p className="text-sm text-gray-600">Includes taxes and fees</p>
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                {car.payNow ? "Pay Now" : "Choose"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsPage;
