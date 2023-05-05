import StationSelect from '../components/stationSelect';
import TrainMap from '../components/trainMap';
import { fetchData } from "@/api/utilities";
import React, { useEffect, useState, useRef } from 'react';
import Graph from '@/helper/graph';
import PrintResult from '@/components/printResult';

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
  const [paths, setPaths] = useState<string[][][]>([]);
  const [openResult, setOpenResult] = useState(false);
  const resultComponent = useRef<any>(null);

  function handleClick(id: string) {
    if(source[1] == '') {
      setSource([id, stationNames[id]]);
    } else if(destination[1] == '') {
      setDestination([id,stationNames[id]]);
    }
  }
  function handleCloseResult() {
    setOpenResult(false); 
  }
  function handleToggle() {
    setOpenResult(!openResult)
  }

  function reset() {
    setSource(['','']);
    setDestination(['','']);
    setPaths([]);
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
    let result = trainGraph.dfs(source[0], destination[0]);
    setPaths(result);
    setOpenResult(true);
  }

  useEffect(() => {
    fetchStationNames();
    fetchStationGraph();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (resultComponent.current && !resultComponent.current.contains(event.target)) {
        setOpenResult(false);
      }
    }
    // only add the event listener when the dropdown is opened
    if(openResult) {
      setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      }, 500)
      // clean up
      return () => window.removeEventListener("click", handleClickOutside);
    } else {
      return;
    };
  
  }, [openResult]);

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
      <div ref={resultComponent}>
        <PrintResult 
          data={paths}
          list={stationNames}
          source={source[1]}
          destination={destination[1]}
          onClose={handleCloseResult}
          toggleOpen={handleToggle}
          open={openResult}
          hasResult={paths.length > 0}
        />
      </div>
      
    </div>
  )
}