import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import { Input } from "../ui/custom-ui";

const libraries: "places"[] = ["places"];

interface AddressInputProps {
  onSelect: (address: string, details: any) => void;
}

export default function AddressInput({ onSelect }: AddressInputProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBSbde13-lJ66fWpiQWZ56nDVyoGzyogLk",
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      onSelect(place.formatted_address || "", place);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
      <Input
        type="text"
        placeholder="Enter your address"
        className="p-2 border border-gray-300 rounded w-full"
      />
    </Autocomplete>
  );
}
