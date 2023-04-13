import Select from 'react-select';
import { fetchData } from '@/api/utilities';
import { FormEvent, useEffect, useState } from 'react';
import GraphTable from '@/components/graphTable';
import GraphEntry from '@/components/graphEntry';

type StationData = {
  stationId: string;
  lines: string;
  neighbors: string;
}

export default function GraphBuilder() {
  const [stations, setStations] = useState<StationData[]>([]);

  function enterData({ stationId, lines, neighbors }: {[key:string]: string} ) {
    let data = {
      'stationId': stationId,
      'lines': lines,
      'neighbors': neighbors
    }
    let stationsList = [...stations];
    let find = stationsList.findIndex((station) => {
      return station.stationId == data.stationId
    })
    if(find == -1) {
      stationsList.push(data);
      setStations(stationsList);
    } else {
      stationsList.splice(find, 1, data);
      setStations(stationsList);
    }
  }

  function removeStation(i: number) {
    let stationsList = [...stations];
    stationsList.splice(i, 1);
    setStations(stationsList);
  }
  function reorderStation(i:number, moveDown:Boolean) {
    let stationsList = [...stations];
    let data = stationsList[i];
    stationsList.splice(i, 1);
    stationsList.splice(moveDown ? i+1 : i-1, 0, data);
    setStations(stationsList);
  }

  async function loadGraph() {
    var loadStations = await fetchData('../data/network/new.json');
    setStations(loadStations)
  }
  function load() {
    loadGraph();
  }

  return (
    <>
      <GraphTable 
        stations={stations}
        remove={removeStation}
        reorder={reorderStation}
        load={load}
      />
      <GraphEntry 
        enterData={enterData}
      />
    </>
  )
}
