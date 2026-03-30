import LocationClientContainer from "./LocationClientContainer";
import LocationServerBlock from "./LocationServerBlock";

export default function LocationServerContainer() {
  return (
    <LocationClientContainer>
      <LocationServerBlock />
    </LocationClientContainer>
  );
}
