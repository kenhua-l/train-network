import { useEffect, useState } from 'react';

type StationData = {
  stationId: string;
  lines: string;
  neighbors: string;
}
type GraphTable = {
  stations: StationData[];
  remove: Function;
  reorder: Function;
  load: Function;
}

export default function GraphTable({ stations, remove, reorder, load }: GraphTable) {
  const [wrong, setWrong] = useState(false);
  function save(data: any) {
    navigator.clipboard.writeText(JSON.stringify(data));
  }
  
  useEffect(() => {
    let flag = false;
    stations.forEach((station, i) => {
      let split = station.neighbors.split(', ');
      if(split.includes(station.stationId)) {
        flag = true;
      }
    });
    setWrong(flag);
  },[stations])
  

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Station Id</th>
            <th>Line(s)</th>
            <th>Neighbors</th>
            <th>Remove</th>
            <th>Reorder</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station, i) => (
            <tr key={i}>
              <td>{station.stationId}</td>
              <td>{station.lines}</td>
              <td>{station.neighbors}</td>
              <td><button type="button" className="btn btn-danger py-0 px-2" onClick={() => remove(i)}>x</button></td>
              <td>
                <button type="button" disabled={i==0} className="btn btn-success py-0 px-2 me-1" onClick={() => reorder(i, false)}>&uarr;</button>
                <button type="button" disabled={i==stations.length-1} className="btn btn-success py-0 px-2 ms-1" onClick={() => reorder(i, true)}>&darr;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary me-2" type="button" onClick={() => save(stations)}>Copy</button>
      <button className="btn btn-secondary" type="button" onClick={() => load()}>Load</button>
      <p className="text-danger">{wrong ? 'something is wrong': ''}</p>
    </>
  )
}
