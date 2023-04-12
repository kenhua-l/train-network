import StationSelect from '../components/stationSelect';
import TrainMap from '../components/trainMap';
import { fetchData } from "@/api/utilities";

import { useEffect, useState } from 'react';

export default function MapContainer() {
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [stationNames, setStationNames] = useState<{[key: string]: string}>({});
  const stationNamesDataFile = '../data/trainmap/train-codename.json';

  function handleClick(id: string) {
    if(source == '') {
      setSource(stationNames[id]);
    } else if(destination == '') {
      setDestination(stationNames[id]);
    }
  }
  function reset() {
    setSource('');
    setDestination('');
  }
  async function fetchStationNames() {
    var names = await fetchData(stationNamesDataFile);
    setStationNames(names);
  }

  useEffect(() => {
    fetchStationNames();
  }, []);

  return (
    <div>
      <StationSelect
        source={source}
        destination={destination}
        reset={reset}
        cost=""
        routes=""
      />
      <div className="img-cover">
        <TrainMap 
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}