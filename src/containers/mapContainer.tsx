import StationSelect from '../components/stationSelect';
import TrainMap from '../components/trainMap';
import { fetchData } from "@/api/utilities";
import { useEffect, useState } from 'react';
import Graph from '@/helper/graph';

type StationData = {
  stationId: string;
  lines: string;
  neighbors: string;
}

export default function MapContainer() {
  const [source, setSource] = useState<string[]>(['cc15','Bishan']);
  const [destination, setDestination] = useState<string[]>(['ew16','Outram Park']);
  const [stationNames, setStationNames] = useState<{[key: string]: string}>({});
  const stationNamesDataFile = '../data/trainmap/train-codename.json';
  const stationGraphDataFile = '../data/network/train-network.json';
  const [trainGraph, setTrainGraph] = useState(new Graph());

  function handleClick(id: string) {
    if(source[1] == '') {
      setSource([id, stationNames[id]]);
    } else if(destination[1] == '') {
      setDestination([id,stationNames[id]]);
    }
  }
  function reset() {
    setSource(['','']);
    setDestination(['','']);
  }
  async function fetchStationNames() {
    let names = await fetchData(stationNamesDataFile);
    setStationNames(names);
  }
  async function fetchStationGraph() {
    let network = await fetchData(stationGraphDataFile);
    let graphCopy = trainGraph.copy();

    network.forEach((station:StationData, i:number) => {
      let neighbors = station.neighbors.split(', ');
      let lines = station.lines.split(', ');
      graphCopy.add(station.stationId, neighbors, lines);
    })
    setTrainGraph(graphCopy);
  }

  function traverse() {
    // let result = trainGraph.bfs(source[0], destination[0]);
    let result = trainGraph.dfs(source[0], destination[0]);
    console.log('res', result);
    return result;
  }

  useEffect(() => {
    fetchStationNames();
    fetchStationGraph();
  }, []);

  return (
    <div>
      <StationSelect
        source={source[1]}
        destination={destination[1]}
        reset={reset}
        cost=""
        routes=""
        traverse={traverse}
      />
      <div className="img-cover">
        <TrainMap 
          handleClick={handleClick}
        />
      </div>
    </div>
  )
}