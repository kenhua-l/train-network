import { useEffect, useState } from "react";
import { fetchData } from "@/api/utilities";

type TrainStationProps = {
  id: string;
  color: string;
  type: string;
  stations: TrainStation[];
}

type TrainStation = {
  id: string;
  name: string;
  cx: number;
  cy: number;
  x: number;
  y: number;
  isInterchange: boolean;
  handleClick: Function;
}

declare interface TrainMapProps {
  handleClick: Function;
  trainStations: TrainStationProps[];
}

function TrainStation(props: TrainStation) {
  const [radius, setRadius] = useState<number>(4);
  const [fontSize, setFontSize] = useState<number>(0);
  const [text, setText] = useState<string[]>([]);
  const [textAlign, setTextAlign] = useState<string>('start');

  useEffect(() => {
    setRadius(props.isInterchange ? 6 : 4);
    if(props.name.includes('/')) {
      setText(props.name.split('/'));
      setTextAlign('start')
    } else if(props.name.includes('\\')) {
      setText(props.name.split('\\'));
      setTextAlign('end')
    } else if(props.name.includes('--')) {
      setText(props.name.split('--'));
      setTextAlign('middle')
    } else {
      setText([props.name]);
    }
  }, [props])

  return (
    <g
      id={props.id}
      className="train-stations"
      onMouseOver={() => {
        setFontSize(15);
        setRadius(props.isInterchange ? 8 : 6)
      }}
      onMouseOut={() => {
        setFontSize(0);
        setRadius(props.isInterchange ? 6 : 4)
      }}
      onClick={(e) => {
        props.handleClick(props.id);
      }}
    >
      <circle fill="#fff" cx={props.cx} cy={props.cy} r={radius} />
      <text 
        strokeWidth={0}
        y={props.y}
        textAnchor={textAlign}
        fontSize={fontSize ? fontSize : undefined}
      >{text.map((word, i) => {
        return word !== '' && (<tspan key={i}  dy={i*16} x={props.x}>{word}</tspan>);
      })}
      </text>
    </g>
  )
}

export default function TrainMap(props: TrainMapProps) {
  const [stations, setStations] = useState([]);
  const trainStationsDataFile = '../data/trainmap/train-stations.json';
  
  async function fetchTrains() {
    var trainStations = await fetchData(trainStationsDataFile);
    setStations(trainStations);
  }
  
  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1410 1007">
      <title>Singapore MRT/LRT system map</title>
      <rect id="bg" height="1007" width="1410" y="0" x="0" fill="#ffffff" fillOpacity="0" />
      {/* lines */}
      <g id="lines" fill="none" strokeWidth="4">
        <g id="lewl" stroke="#009645">
          <path d="m1227 638v16q0 20 20 20h84"/>
          <path d="m1284 523-25 25 q-14.14 14.14-14.14 34.14 v37 q0 20 -20 20 h-220 q-20 0 -34.14 14.14 l-182 182 q-14.14 14.14-34.14 14.14 h-43 q-20 0 -34.14 -14.14 l-9-9 q-14.14-14.14-14.14-34.14 q0-20-14.14-34.14 l-230.4-230.4 q-14.14-14.14-34.14-14.14 h-280.6 q-20 0-20 20 v82"/>
        </g>
        <g id="lnsl" stroke="#d42e12">
          <path d="m286 514v-407q0-20 20-20h391.5 q20 0 34.4 14.4 l40 40 q14.4 14.14 14.14 34.14v255 q0 20-14.14 34.14 l-104 104 q-14.14 14.14 0 28.28 l162 162 q14.14 14.14 0 28.28 l-29.7 29.7 q-14.14 14.14 -14.14 20 v125"/>
        </g>
        <g id="lnel" stroke="#9900aa">
          <path d="m582 866 l173.2-173.2 q14.14-14.14 14.14-28.28 v-28 q0 -20 14.14 -34.34 l390 -390"/>
        </g>
        <g id="lccl" stroke="#fa9e0d">
          <path d="m754 689q20 0 34.14 14.14 l124 124 q14.14 14.14 28.28 0"/>
          <path d="m582 867 A 265 265 0 1 1 793 914"/>
        </g>
        <g id="ldtl" stroke="#005ec4">
          <path d="m479 225 v157 q0 20 14.14 34.14 l48.5 48.5 q14.14 14.14 34.14 14.14 h56 q20 0 34.14 14.14 l284 284 q13 14.14 0 30 c-16.1 22.6-47.3 54.9-93.9 80 q-20.34 9-41.1-10 l-121-121"/>
          <path d="m698 760q-14.14 -14.14 0 -28.28 l10-10 q14.14-14.14 28.28-14.14 h61 q20 0 34.14 -14.14 l99-99 q14.14-14.14 34.14-14.14 h301.5 q20 0 20 20 v70"/>
        </g>
        <g id="ltel" stroke="#784008">
          <path d="m496 34 l147.8 147.8 q14.14 14.14 14.14 34.14 v557 q0 20 14.14 34.14 l132 132 q14.14 14.14 34.14 14.14 h40"/>
        </g>
        <g id="llrt" stroke="#999999">
          <path d="m284.4 225.6h207 q10 0 17.07-7.07 l19.2-19.2 q7.07-7.07 17.07-7.07 h10 q10 0 10 10 v46.6 q0 10-10 10 h-10 q-10 0-17.07-7.07 l-19.2-19.2 q-7.07-7.07-17.07-7.07"/>
          <path d="m1081 306 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1081 306 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
          <path d="m1176 209.5 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1177 209.5 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
        </g>
      </g>

      {/* stations */}
      <g id="stns" fontFamily="Arial" fill="#000">
        {stations.map((line: TrainStationProps) => {
          return (
            <g 
              key={line.id} 
              id={line.id} 
              stroke={line.color}
              strokeWidth={line.type == "normal" ? 2 : line.type == "lrt" ? 1.7 : 3} 
              fontSize={line.type == "lrt" ? 10 : 12} 
              fontWeight={line.type == "interchange" ? 700 : 400}
            >
              {line.stations.map((station: TrainStation) => {
                return (<TrainStation key={station.id} {...station} isInterchange={line.type === 'interchange'} handleClick={props.handleClick} />)
              })}
            </g>
          )
        })}
      </g>
    </svg>
  );
};