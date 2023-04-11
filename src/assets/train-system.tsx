import { useEffect, useState, useRef } from "react";
import { fetchData } from "@/api/utilities";

declare interface TrainCirclesProps {
  id: string;
  stroke: string;
  strokeWidth: number;
  stations: TrainStation[];
}

declare interface TrainLabelsProps {
  id: string;
  fontSize: number;
  fontWeight: number;
  stations: StationLabel[];
}

declare interface TrainStation {
  id: string;
  cx: number;
  cy: number;
  isInterchange: boolean;
}

declare interface StationLabel {
  id: string;
  x: number;
  y: number;
  text: string;
  wrap: number | null;
}

function TrainStation(props: TrainStation) {
  const [radius, setRadius] = useState(4);

  useEffect(() => {
    setRadius(props.isInterchange ? 6 : 4);
  }, [props])

  return (
    <circle
      id={props.id} 
      cx={props.cx} 
      cy={props.cy} 
      r={radius}
      onMouseOver={() => setRadius(props.isInterchange ? 8 : 6)}
      onMouseOut={() => setRadius(props.isInterchange ? 6 : 4)}
    />
  )
}

function StationLabel(props: StationLabel) {
  const [fontSize, setFontSize] = useState(0);
  const [text, setText] = useState<string[]>([]);
  const [textAlign, setTextAlign] = useState(1); // 1 for left, 2 for right, 3 for center?

  useEffect(() => {
    if(props.text.includes('/')) {
      setText(props.text.split('/'));
      setTextAlign(1)
    } else if(props.text.includes('\\')) {
      setText(props.text.split('\\'));
      setTextAlign(2)
    } else if(props.text.includes('--')) {
      setText(props.text.split('--'));
      setTextAlign(3)
    } else {
      setText([props.text]);
    }
  }, []);

  return (
    <text 
      id={props.id} 
      y={props.y}
      {...(textAlign == 2) ? {textAnchor:"end"} : (textAlign == 3) ? {textAnchor:"middle"} : {}}
      fontSize={fontSize ? fontSize : undefined}
      onMouseOver={() => setFontSize(15)}
      onMouseOut={() => setFontSize(0)}
    >{text.map((word, i) => {
      return word !== '' && (<tspan key={i}  dy={i*13} x={props.x}>{word}</tspan>);
    })}
    </text>
  )
}

export default function TrainMap() {
  const [circles, setCircles] = useState([]);
  const [labels, setLabels] = useState([]);

  const trainStationsDataFile = '../data/trainmap/train-stations.json';
  const stationNamesDataFile = '../data/trainmap/train-stations-names.json';
  
  async function fetchTrains() {
    var trainCircles = await fetchData(trainStationsDataFile);
    var trainLabels = await fetchData(stationNamesDataFile);
    setCircles(trainCircles);
    setLabels(trainLabels);
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
        <g id="ewl" stroke="#009645">
          <path d="m1227 638v16q0 20 20 20h84"/>
          <path d="m1284 523-25 25 q-14.14 14.14-14.14 34.14 v37 q0 20 -20 20 h-220 q-20 0 -34.14 14.14 l-182 182 q-14.14 14.14-34.14 14.14 h-43 q-20 0 -34.14 -14.14 l-9-9 q-14.14-14.14-14.14-34.14 q0-20-14.14-34.14 l-230.4-230.4 q-14.14-14.14-34.14-14.14 h-280.6 q-20 0-20 20 v82"/>
        </g>
        <g id="nsl" stroke="#d42e12">
          <path d="m286 514v-407q0-20 20-20h391.5 q20 0 34.4 14.4 l40 40 q14.4 14.14 14.14 34.14v255 q0 20-14.14 34.14 l-104 104 q-14.14 14.14 0 28.28 l162 162 q14.14 14.14 0 28.28 l-29.7 29.7 q-14.14 14.14 -14.14 20 v125"/>
        </g>
        <g id="nel" stroke="#9900aa">
          <path d="m582 866 l173.2-173.2 q14.14-14.14 14.14-28.28 v-28 q0 -20 14.14 -34.34 l390 -390"/>
        </g>
        <g id="ccl" stroke="#fa9e0d">
          <path d="m754 689q20 0 34.14 14.14 l124 124 q14.14 14.14 28.28 0"/>
          <path d="m582 867 A 265 265 0 1 1 793 914"/>
        </g>
        <g id="dtl" stroke="#005ec4">
          <path d="m479 225 v157 q0 20 14.14 34.14 l48.5 48.5 q14.14 14.14 34.14 14.14 h56 q20 0 34.14 14.14 l284 284 q13 14.14 0 30 c-16.1 22.6-47.3 54.9-93.9 80 q-20.34 9-41.1-10 l-121-121"/>
          <path d="m698 760q-14.14 -14.14 0 -28.28 l10-10 q14.14-14.14 28.28-14.14 h61 q20 0 34.14 -14.14 l99-99 q14.14-14.14 34.14-14.14 h301.5 q20 0 20 20 v70"/>
        </g>
        <g id="tel" stroke="#784008">
          <path d="m496 34 l147.8 147.8 q14.14 14.14 14.14 34.14 v557 q0 20 14.14 34.14 l132 132 q14.14 14.14 34.14 14.14 h40"/>
        </g>
        <g id="lrt" stroke="#999999">
          <path d="m284.4 225.6h207 q10 0 17.07-7.07 l19.2-19.2 q7.07-7.07 17.07-7.07 h10 q10 0 10 10 v46.6 q0 10-10 10 h-10 q-10 0-17.07-7.07 l-19.2-19.2 q-7.07-7.07-17.07-7.07"/>
          <path d="m1081 306 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1081 306 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
          <path d="m1176 209.5 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1177 209.5 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
        </g>
      </g>

      {/* circles */}
      <g id="stns_icons" fill="#ffffff" strokeWidth="2">
        {circles.map((line: TrainCirclesProps) => {
          return (
            <g key={line.id} id={line.id} stroke={line.stroke} strokeWidth={line.strokeWidth}>
              {line.stations.map((station: TrainStation) => {
                return (<TrainStation key={station.id} {...station} />)
              })}
            </g>
          )
        })}
      </g>

      {/* labels */}
      <g id="stns_labels" fontFamily="Arial">
        {labels.map((line : TrainLabelsProps) => {
          return (
            <g key={line.id} id={line.id} fontSize={line.fontSize} fontWeight={line.fontWeight} fill="#000000">
              {line.stations.map((station: StationLabel) => {
                return (<StationLabel key={station.id} {...station} />)
              })}
            </g>
          )
        })}
      </g>
    </svg>
  );
};