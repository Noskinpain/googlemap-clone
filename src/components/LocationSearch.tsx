import type { Place } from "../api/place";
import { Fragment, useState } from "react";
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}
const LocationSearch = ({ onPlaceClick }: LocationSearchProps) => {
  const [term, setTerm] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await search(term);
    setPlaces(result);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="font-bold" htmlFor="term">
          Search
        </label>

        <input
          id="term"
          className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-48"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <h1 className="font-bold mt-6">Found Locations</h1>
        <div className="grid grid-cols-[1fr_40px] gap-2 mt-2 items-center">
          {places.map((place) => {
            return (
              <Fragment key={place.id}>
                <p className="text-sm">{place.name}</p>
                <button
                  onClick={() => onPlaceClick(place)}
                  className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
                >
                  Go
                </button>
                <div className="border-b w-full col-span-2" />
              </Fragment>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default LocationSearch;
