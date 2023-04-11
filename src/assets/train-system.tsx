import { useEffect, useState } from "react";
import { fetchData } from "@/api/utilities";

declare interface TrainCirclesProps {
  id: string;
  stroke: string;
  strokeWidth: number;
  stations: TrainStation[];
}

declare interface TrainStation {
  id: string;
  cx: number;
  cy: number;
  isInterchange: boolean;
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

export default function TrainMap() {
  const [circles, setCircles] = useState([]);

  const trainStationsDataFile = '../data/trainmap/train-stations.json';
  
  async function fetchTrains() {
    var trainCircles = await fetchData(trainStationsDataFile);
    setCircles(trainCircles);
  }
  
  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1410 1007">
      <title>Singapore MRT/LRT system map</title>
      <rect id="bg" height="1007" width="1410" y="0" x="0" fill="#ffffff" fillOpacity="0" />
      {/* <g id="title">
        <switch><text id="tttitle-ms" x="7.1" y="19" fontSize="20" fontWeight="bold" fill="#001e0d" fontFamily="Arial" systemLanguage="ms"><tspan id="trsvg1-ms">PETA SINGAPURA MRT / LRT</tspan></text><text id="tttitle" x="7.1" y="19" fontSize="20" fontWeight="bold" fill="#001e0d" fontFamily="Arial"><tspan id="trsvg1">SINGAPORE MRT/LRT MAP</tspan></text></switch>
        <switch><text id="ttupd-ms" x="7.4" y="29" fontSize="8" fill="#001e0d" fontFamily="Arial" systemLanguage="ms"><tspan id="trsvg2-ms">Correct as at 13 Nov 2022.</tspan></text><text id="ttupd" x="7.4" y="29" fontSize="8" fill="#001e0d" fontFamily="Arial"><tspan id="trsvg2">Correct as at 13 Nov 2022.</tspan></text></switch>
        <switch><text id="ttdis-ms" x="7.4" y="38" fontSize="8" fill="#001e0d" fontFamily="Arial" systemLanguage="ms"><tspan id="trsvg3-ms">Alignment of future lines are speculative and subject to changes.</tspan></text><text id="ttdis" x="7.4" y="38" fontSize="8" fill="#001e0d" fontFamily="Arial"><tspan id="trsvg3">Alignment of future lines are speculative and subject to changes.</tspan></text></switch>
      </g> */}
      {/* legends */}
      {/* <g id="legend">
        <rect id="lgbox" height="374.5" width="333" x="0" y="632.5" fill="#f2f2f2"/>
        <g id="lgcolorbox">
          <rect id="lgcewl" height="11.5" width="313" x="10" y="642.5" fill="#009645"/>
          <rect id="lgcnsl" height="11.5" width="313" x="10" y="655" fill="#d42e12"/>
          <rect id="lgcnel" height="11.5" width="313" x="10" y="687" fill="#9900aa"/>
          <rect id="lgcccl" height="11.5" width="313" x="10" y="710" fill="#fa9e0d"/>
          <rect id="lgcdtl" height="11.5" width="313" x="10" y="733" fill="#005ec4"/>
          <rect id="lgctel" height="11.5" width="313" x="10" y="774" fill="#784008"/>
          <rect id="lgcjrl" height="11.5" width="313" x="10" y="833" fill="#0099aa"/>
          <rect id="lgccrl" height="11.5" width="313" x="10" y="883" fill="#78BE20"/>
          <rect id="lgcftl" height="11.5" width="313" x="10" y="933" fill="#f266b5"/>
          <rect id="lgclrt" height="11.5" width="313" x="10" y="956" fill="#999999"/>
          <rect id="lgcrts" height="11.5" width="313" x="10" y="979" fill="#87cefa"/>

        </g>
        <g id="lglabels" fontSize="11" fontWeight="bold" fontFamily="Arial" fill="#ffffff">
          <switch><text id="lglewl-ms" x="20" y="652.5" systemLanguage="ms"><tspan id="trsvg4-ms">Laluan Timur Barat (EWL)</tspan></text><text id="lglewl" x="20" y="652.5"><tspan id="trsvg4">East West Line (EWL)</tspan></text></switch>
          <switch><text id="lglnsl-ms" x="20" y="665" systemLanguage="ms"><tspan id="trsvg5-ms">Laluan Utara Selatan (NSL)</tspan></text><text id="lglnsl" x="20" y="665"><tspan id="trsvg5">North South Line (NSL)</tspan></text></switch>
          <switch><text id="lglnel-ms" x="20" y="697" systemLanguage="ms"><tspan id="trsvg6-ms">Laluan Timur Laut (NEL)</tspan></text><text id="lglnel" x="20" y="697"><tspan id="trsvg6">North East Line (NEL)</tspan></text></switch>
          <switch><text id="lglccl-ms" x="20" y="720" fill="#000000" systemLanguage="ms"><tspan id="trsvg7-ms">Laluan Circle (Lingkaran) (CCL)</tspan></text><text id="lglccl" x="20" y="720" fill="#000000"><tspan id="trsvg7">Circle Line (CCL)</tspan></text></switch>
          <switch><text id="lgldtl-ms" x="20" y="743" systemLanguage="ms"><tspan id="trsvg8-ms">Laluan Downtown (Pusat Bandar) (DTL)</tspan></text><text id="lgldtl" x="20" y="743"><tspan id="trsvg8">Downtown Line (DTL)</tspan></text></switch>
          <switch><text id="lgltel-ms" x="20" y="784" systemLanguage="ms"><tspan id="trsvg9-ms">Laluan Thomson – Pantai Timur (TEL)</tspan></text><text id="lgltel" x="20" y="784"><tspan id="trsvg9">Thomson-East Coast Line (TEL)</tspan></text></switch>
          <switch><text id="lgljrl-ms" x="20" y="843" systemLanguage="ms"><tspan id="trsvg10-ms">Laluan Daerah Jurong (JRL)</tspan></text><text id="lgljrl" x="20" y="843"><tspan id="trsvg10">Jurong Region Line (JRL)</tspan></text></switch>
          <switch><text id="lglcrl-ms" x="20" y="893" fill="#000000" systemLanguage="ms"><tspan id="trsvg11-ms">Laluan Rentas Pulau (CRL)</tspan></text><text id="lglcrl" x="20" y="893" fill="#000000"><tspan id="trsvg11">Cross Island Line (CRL)</tspan></text></switch>
          <switch><text id="lglftl" x="20" y="943"><tspan id="trsvg12">Future Line</tspan></text></switch>
          <switch><text id="lgllrt-ms" x="20" y="966" systemLanguage="ms"><tspan id="trsvg13-ms">Sistem Rel Ringan (LRT)</tspan></text><text id="lgllrt" x="20" y="966"><tspan id="trsvg13">Light Rapid Transit (LRT) Lines</tspan></text></switch>
          <switch><text id="lglrtsl-ms" x="20" y="989" fill="#000000" systemLanguage="ms"><tspan id="trsvg14-ms">Sistem Transit Aliran Johor–Singapura (RTS)</tspan></text><text id="lglrtsl" x="20" y="989" fill="#000000"><tspan id="trsvg14">Johor Bahru-Singapore RTS-Link</tspan></text></switch>
        </g>
        <g id="lgstrip">
          <rect id="lgsnsl" height="20" width="3" x="14" y="666" fill="#d42e12"/>
          <rect id="lgsnel" height="11" width="3" x="14" y="698" fill="#9900aa"/>
          <rect id="lgsccl" height="11" width="3" x="14" y="721" fill="#fa9e0d"/>
          <rect id="lgsdtl" height="29" width="3" x="14" y="744" fill="#005ec4"/>
          <rect id="lgstel" height="47" width="3" x="14" y="785" fill="#784008"/>
          <rect id="lgsjrl" height="38" width="3" x="14" y="844" fill="#0099aa"/>
          <rect id="lgscrl" height="38" width="3" x="14" y="894" fill="#78BE20"/>
          <rect id="lgsftl" height="11" width="3" x="14" y="944" fill="#f266b5"/>
          <rect id="lgslrt" height="11" width="3" x="14" y="967" fill="#999999"/>
          <rect id="lgsrtsl" height="11" width="3" x="14" y="990" fill="#87cefa"/>
        </g>
        
        <g id="lgtexts" fill="#000000" fontFamily="Arial" fontSize="9">
          <switch><text id="lgtns3a-ms" x="20" y="675" systemLanguage="ms"><tspan fontWeight="bold" id="trsvg17-ms">Stesen Brickland</tspan><tspan id="trsvg18-ms"> (Mid-2030s) </tspan></text><text id="lgtns3a" x="20" y="675"><tspan fontWeight="bold" id="trsvg17">Brickland Station</tspan><tspan id="trsvg18"> (Mid-2030s) </tspan></text></switch>
          <switch><text id="lgtns6-ms" x="20" y="684" systemLanguage="ms"><tspan fontWeight="bold" id="trsvg19-ms">Stesen Sungei Kadut</tspan><tspan id="trsvg20-ms"> (Mid-2030s) </tspan></text><text id="lgtns6" x="20" y="684"><tspan fontWeight="bold" id="trsvg19">Sungei Kadut Station</tspan><tspan id="trsvg20"> (Mid-2030s) </tspan></text></switch>
          <switch><text id="lgtnele" x="20" y="707"><tspan fontWeight="bold" id="trsvg21">NELe</tspan><tspan id="trsvg22">: Punggol - Punggol Coast (2024) </tspan></text></switch>
          <switch><text id="lgtccl6" x="20" y="730"><tspan fontWeight="bold" id="trsvg23">CCL6</tspan><tspan id="trsvg24">: Marina Bay - Harbourfront (2026) </tspan></text></switch>
          <switch><text id="lgtdtl3e" x="20" y="753"><tspan fontWeight="bold" id="trsvg25">DTL3e</tspan><tspan id="trsvg26">: Expo - Sungei Bedok (2025) </tspan></text></switch>
          <switch><text id="lgtdt4" x="20" y="762"><tspan fontWeight="bold" id="trsvg27">Hume Station</tspan><tspan id="trsvg28"> (2025) </tspan></text></switch>
          <switch><text id="lgtdtl2e" x="20" y="771"><tspan fontWeight="bold" id="trsvg29">DTL2e</tspan><tspan id="trsvg30">: Bukit Panjang - Sungei Kadut (Mid-2030s) </tspan></text></switch>
          <switch><text id="lgttel4-ms" x="20" y="794" systemLanguage="ms"><tspan fontWeight="bold" id="trsvg37-ms">TEL4</tspan><tspan id="trsvg38-ms">: Taman di Persisiran - Bayshore (2024)</tspan></text><text id="lgttel4" x="20" y="794"><tspan fontWeight="bold" id="trsvg37">TEL4</tspan><tspan id="trsvg38">: Gardens by the Bay - Bayshore (2024) </tspan></text></switch>
          <switch><text id="lgttel5" x="20" y="803"><tspan fontWeight="bold" id="trsvg39">TEL5</tspan><tspan id="trsvg40">: Bayshore - Sungei Bedok (2025) </tspan></text></switch>
          <switch><text id="lgttel4e-ms" x="20" y="812" systemLanguage="ms"><tspan fontWeight="bold" id="trsvg41-ms">Stesen Peringatan Pengasas</tspan><tspan id="trsvg42-ms"> (2027) </tspan></text><text id="lgttel4e" x="20" y="812"><tspan fontWeight="bold" id="trsvg41">{"Founders' Memorial Station"}</tspan><tspan id="trsvg42"> (2027) </tspan></text></switch>
          <switch><text id="lgttele" x="20" y="821"><tspan fontWeight="bold" id="trsvg43">TELe</tspan><tspan id="trsvg44">: Sungei Bedok - Tanah Merah (2040) </tspan></text></switch>
          <switch><text id="lgtdt4" x="20" y="830"><tspan fontWeight="bold" id="trsvg63">Mount Pleasant Station, Marina South Station</tspan><tspan id="trsvg64"> (TBC) </tspan></text></switch>
          <switch><text id="lgtjrl1" x="20" y="853"><tspan fontWeight="bold" id="trsvg45">JRL1</tspan><tspan id="trsvg46">: Choa Chu Kang - Tawas, Boon Lay (2027) </tspan></text></switch>
          <switch><text id="lgtjrl2" x="20" y="862"><tspan fontWeight="bold" id="trsvg47">JRL2</tspan><tspan id="trsvg48">: Tengah - Pandan Reservoir (2028) </tspan></text></switch>
          <switch><text id="lgtjrl3" x="20" y="871"><tspan fontWeight="bold" id="trsvg49">JRL3</tspan><tspan id="trsvg50">: Tawas - Peng Kang Hill, Boon Lay - Jurong Pier (2029) </tspan></text></switch>
          <switch><text id="lgtwce" x="20" y="880"><tspan fontWeight="bold" id="trsvg51">WCE</tspan><tspan id="trsvg52">: Pandan Reservoir - ? (TBC) </tspan></text></switch>
          <switch><text id="lgtcrl1" x="20" y="903"><tspan fontWeight="bold" id="trsvg53">CRL1</tspan><tspan id="trsvg54">: Aviation Park - Bright Hill (2030) </tspan></text></switch>
          <switch><text id="lgtcpe" x="20" y="912"><tspan fontWeight="bold" id="trsvg61">CPE</tspan><tspan id="trsvg62">: Pasir Ris - Punggol (2032) </tspan></text></switch>
          <switch><text id="lgtcrl2" x="20" y="921"><tspan fontWeight="bold" id="trsvg55">CRL2</tspan><tspan id="trsvg56">: Bright Hill - Jurong Lake District (2032) </tspan></text></switch>
          <switch><text id="lgtcrl3" x="20" y="930"><tspan fontWeight="bold" id="trsvg65">CRL</tspan><tspan id="trsvg66">: Jurong Lake District - ?, Aviation Park - ? (2030s) </tspan></text></switch>
          <switch><text id="lgtftl" x="20" y="953"><tspan fontWeight="bold" id="trsvg57">??L</tspan><tspan id="trsvg58">: ? - ? (Under studies) </tspan></text></switch>
          <switch><text id="lgtlrt" x="20" y="976"><tspan fontWeight="bold" id="trsvg67">Teck Lee Station</tspan><tspan id="trsvg68"> (TBC) </tspan></text></switch>
          <switch><text id="lgtrtsl" x="20" y="999"><tspan fontWeight="bold" id="trsvg59">RTS-Link</tspan><tspan id="trsvg60">: Bukit Chagar (JB) - Woodlands North (2026) </tspan></text></switch>

        </g>
      </g> */}
      
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
          {/* <path id="nelex" d="m1254 132.46-92 91.3" stroke-dasharray="8, 8"/> */}
        </g>
        <g id="ccl" stroke="#fa9e0d">
          <path d="m754 689q20 0 34.14 14.14 l124 124 q14.14 14.14 28.28 0"/>
          <path d="m582 867 A 265 265 0 1 1 793 914"/>
          {/* <path id="cclex" d="m582 867 A 265 265 0 0 0 793 914" strokeWidth="4.5" stroke-dasharray="10, 10"/> */}
        </g>
        <g id="dtl" stroke="#005ec4">
          <path d="m479 225 v157 q0 20 14.14 34.14 l48.5 48.5 q14.14 14.14 34.14 14.14 h56 q20 0 34.14 14.14 l284 284 q13 14.14 0 30 c-16.1 22.6-47.3 54.9-93.9 80 q-20.34 9-41.1-10 l-121-121"/>
          <path d="m698 760q-14.14 -14.14 0 -28.28 l10-10 q14.14-14.14 28.28-14.14 h61 q20 0 34.14 -14.14 l99-99 q14.14-14.14 34.14-14.14 h301.5 q20 0 20 20 v70"/>
        </g>
        {/* <g id="dtlex" stroke="#005ec4" stroke-dasharray="8, 8">
          <path d="m1286 685v80"/>
          <path d="m479 225 v-13 q0-14.14-14.14-34.14 l-40-40 q-14.14-14.14-34.14-14.14 h-105"/>
        </g> */}
        <g id="tel" stroke="#784008">
          <path d="m496 34 l147.8 147.8 q14.14 14.14 14.14 34.14 v557 q0 20 14.14 34.14 l132 132 q14.14 14.14 34.14 14.14 h40"/>
        </g>
        {/* <g id="telex" stroke="#784008" stroke-dasharray="8, 8">
          <path d="m878.22 953.22 q19.25 0 48.12 -19.22 A 355 355 0 0 0 1049.23 786 q8.52 -20 19.77 -20 h297 q20 0 20 -20 v-52 q0 -20 -20 -20 h-35"/>
        </g> */}
        {/* <g id="jrlex" stroke="#0099aa" stroke-dasharray="8, 8">
          <path d="m292 220 l-123.5 123.5 q-14.14 14.14 -14.14 34.14 v142 q0 20 14.14 34.14 l62 62"/>
          <path d="m151 480 h-56 q-20 0 -20 -20 v-134"/>
          <path d="m179 332 q-14.14 14.14 -14.14 34.14 v6 q0 20 14.14 34.14 l305 305"/>
        </g> */}
        {/* <g id="crlex" stroke="#78BE20" stroke-dasharray="8, 8">
          <path d="m77 544 l59.5 59.5 q14.14 14.14 34.14 14.14 h192.86 q21.79 0 25.5 -22.13 A356 356 0 0 1 1059.45 497 q10.31 20.92 46.47 20.92 h153 q20 0 34.14 14.14 l83.8 83.8 q14.14 14.14 14.14 34.14 v78"/>
          <path d="m1177 209.5 l67 67 q14.14 14.14 14.14 34.14 v167.4 q0 20 14.14 34.14 l10 10"/>
        </g> */}
        <g id="lrt" stroke="#999999">
          <path d="m284.4 225.6h207 q10 0 17.07-7.07 l19.2-19.2 q7.07-7.07 17.07-7.07 h10 q10 0 10 10 v46.6 q0 10-10 10 h-10 q-10 0-17.07-7.07 l-19.2-19.2 q-7.07-7.07-17.07-7.07"/>
          <path d="m1081 306 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1081 306 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
          <path d="m1176 209.5 l-7.76-7.76 q-7.07-7.07-7.07-17.07 v-20 q0-10-7.07-17.07 l-19-19 q-7.07-7.07-14.14 0 l-26 26 q-7.07 7.07 0 14.14 l 19 19 q 7.07 7.07 17.07 7.07 h 20 q 10 0 17.07 7.07"/>
          <path d="m1177 209.5 l 7.76 7.76 q 7.07 7.07 7.07 17.07 v 20 q0 10 7.07 17.07 l 19 19 q 7.07 7.07 14.14 0 l 26-26 q 7.07-7.07 0-14.14 l-19-19 q-7.07-7.07-17.07-7.07 h-20 q-10 0-17.07-7.07"/>
        </g>
        {/* <g id="ftlex" stroke="#f266b5" stroke-dasharray="8, 8">
          <path d="m496 34 h300 q20 0 34.4 14.4 l74 74 q14.4 14.14 14.14 34.14 v182 q0 20 -14.14 34.14 l-59 59 q-14.14 14.14 -14.14 34.14 v77 q0 20 14.14 34.14 l128 128 q14.14 14.14 14.14 34.14 v112 q0 23.83 -10.03 34.14 A331 331 0 0 1 932.04 924 q-17.70 15 -40 15 h-45"/>
        </g> */}
        {/* <g id="rtslink" stroke="#87cefa" stroke-dasharray="8, 8">
          <path d="m496 34h-60"/>
        </g> */}
      </g>

      {/* circles */}
      <g id="stns_icons" fill="#ffffff" strokeWidth="2">
        {circles.map((line: TrainCirclesProps) => {
          return (
            <g key={line.id} id={line.id} stroke={line.stroke} strokeWidth={line.strokeWidth}>
              {line.stations.map((station: TrainStation) => {
                return (
                  <TrainStation key={station.id} id={station.id} cx={station.cx} cy={station.cy} isInterchange={station.isInterchange}/>
                )
              })
              }
            </g>
          )
        })}
      </g>

      {/* labels */}
      <g id="stns_labels" fontFamily="Arial">
        <g id="lbewl" fontSize="12" fill="#000000">
          <switch><text id="lbcg2a" x="1310" y="687"><tspan id="trsvg61">Changi</tspan></text></switch>
          <switch><text id="lbcg2b" x="1312" y="699"><tspan id="trsvg62">Airport</tspan></text></switch>
          <switch><text id="lbew1" x="1289" y="522"><tspan id="trsvg63">Pasir Ris</tspan></text></switch>
          <switch><text id="lbew3" x="1209" y="617"><tspan id="trsvg64">Simei</tspan></text></switch>
          <switch><text id="lbew5" x="1171" y="652"><tspan id="trsvg65">Bedok</tspan></text></switch>
          <switch><text id="lbew6" x="1092" y="633"><tspan id="trsvg66">Kembangan</tspan></text></switch>
          <switch><text id="lbew7" x="1050" y="652"><tspan id="trsvg67">Eunos</tspan></text></switch>
          <switch><text id="lbew9" x="945" y="638"><tspan id="trsvg68">Aljunied</tspan></text></switch>
          <switch><text id="lbew10" x="954" y="682"><tspan id="trsvg69">Kallang</tspan></text></switch>
          <switch><text id="lbew11" x="875" y="693"><tspan id="trsvg70">Lavender</tspan></text></switch>
          <switch><text id="lbew15a" x="650" y="857"><tspan id="trsvg71">Tanjong</tspan></text></switch>
          <switch><text id="lbew15b" x="660" y="869"><tspan id="trsvg72">Pagar</tspan></text></switch>
          <switch><text id="lbew17a" x="595" y="753"><tspan id="trsvg73">Tiong</tspan></text></switch>
          <switch><text id="lbew17b" x="593" y="765"><tspan id="trsvg74">Bahru</tspan></text></switch>
          <switch><text id="lbew18" x="554" y="721"><tspan id="trsvg75">Redhill</tspan></text></switch>
          <switch><text id="lbew19" x="561" y="672.5"><tspan id="trsvg76">Queenstown</tspan></text></switch>
          <switch><text id="lbew20" x="525" y="636"><tspan id="trsvg77">Commonwealth</tspan></text></switch>
          <switch><text id="lbew22" x="418" y="581"><tspan id="trsvg78">Dover</tspan></text></switch>
          <switch><text id="lbew23" x="414" y="526"><tspan id="trsvg79">Clementi</tspan></text></switch>
          <switch><text id="lbew25a" x="224" y="527"><tspan id="trsvg80">Chinese</tspan></text></switch>
          <switch><text id="lbew25b" x="226" y="539"><tspan id="trsvg81">Garden</tspan></text></switch>
          <switch><text id="lbew26" x="178" y="508"><tspan id="trsvg82">Lakeside</tspan></text></switch>
          <switch><text id="lbew27a" x="122" y="496"><tspan id="trsvg83">Boon</tspan></text></switch>
          <switch><text id="lbew27b" x="131" y="508"><tspan id="trsvg84">Lay</tspan></text></switch>
          <switch><text id="lbew28" x="100" y="527"><tspan id="trsvg85">Pioneer</tspan></text></switch>
          <switch><text id="lbew29a" x="80" y="496"><tspan id="trsvg86">Joo </tspan></text></switch>
          <switch><text id="lbew29b" x="76" y="508"><tspan id="trsvg87">Koon </tspan></text></switch>
          <switch><text id="lbew30" x="15" y="546"><tspan id="trsvg88">Gul Circle</tspan></text></switch>
          <switch><text id="lbew31a" x="41" y="566"><tspan id="trsvg89">Tuas</tspan></text></switch>
          <switch><text id="lbew31b" x="19" y="578"><tspan id="trsvg90">Crescent</tspan></text></switch>
          <switch><text id="lbew32a" x="10" y="596"><tspan id="trsvg91">Tuas West</tspan></text></switch>
          <switch><text id="lbew32b" x="39" y="608"><tspan id="trsvg92">Road</tspan></text></switch>
          <switch><text id="lbew33" x="15" y="620"><tspan id="trsvg93">Tuas Link</tspan></text></switch>
        </g>
        <g id="lbnsl" fontSize="12" fill="#000000">
          <switch><text id="lbns2a" x="292" y="411"><tspan id="trsvg94">Bukit</tspan></text></switch>
          <switch><text id="lbns2b" x="292" y="423"><tspan id="trsvg95">Batok</tspan></text></switch>
          <switch><text id="lbns3a" x="292" y="350"><tspan id="trsvg96">Bukit</tspan></text></switch>
          <switch><text id="lbns3b" x="292" y="362"><tspan id="trsvg97">Gombak</tspan></text></switch>
          {/* <switch><text id="lbns3x" x="292" y="295" fill="#aaaaaa"><tspan id="trsvg98">Brickland</tspan></text></switch> */}
          <switch><text id="lbns6" x="292" y="175"><tspan id="trsvg99">Yew Tee</tspan></text></switch>
          {/* <switch><text id="lbns5" x="204" y="125" fill="#aaaaaa"><tspan id="trsvg100">Sungei Kadut</tspan></text></switch> */}
          <switch><text id="lbns7" x="335.5" y="80"><tspan id="trsvg101">Kranji</tspan></text></switch>
          <switch><text id="lbns8" x="410" y="80"><tspan id="trsvg102">Marsiling</tspan></text></switch>
          <switch><text id="lbns10" x="586" y="80"><tspan id="trsvg104">Admiralty</tspan></text></switch>
          <switch><text id="lbns11" x="650" y="80"><tspan id="trsvg105">Sembawang</tspan></text></switch>
          <switch><text id="lbns12" x="742" y="108"><tspan id="trsvg106">Canberra</tspan></text></switch>
          <switch><text id="lbns13" x="730" y="151"><tspan id="trsvg107">Yishun</tspan></text></switch>
          <switch><text id="lbns14" x="746" y="205"><tspan id="trsvg108">Khatib</tspan></text></switch>
          <switch><text id="lbns15a" x="763" y="246"><tspan id="trsvg109">Yio</tspan></text></switch>
          <switch><text id="lbns15b" x="727" y="258"><tspan id="trsvg110">Chu Kang</tspan></text></switch>
          <switch><text id="lbns16a" x="758" y="317"><tspan id="trsvg111">Ang</tspan></text></switch>
          <switch><text id="lbns16b" x="742" y="329"><tspan id="trsvg112">Mo Kio</tspan></text></switch>
          <switch><text id="lbns18" x="734" y="432"><tspan id="trsvg113">Braddell</tspan></text></switch>
          <switch><text id="lbns19a" x="779" y="473"><tspan id="trsvg114">Toa</tspan></text></switch>
          <switch><text id="lbns19b" x="779" y="485"><tspan id="trsvg115">Payoh</tspan></text></switch>
          <switch><text id="lbns20" x="748" y="504"><tspan id="trsvg116">Novena</tspan></text></switch>
          <switch><text id="lbns23" x="709" y="634"><tspan id="trsvg118">Somerset</tspan></text></switch>
          <switch><text id="lbns28a" x="745" y="972"><tspan id="trsvg119">Marina</tspan></text></switch>
          <switch><text id="lbns28b" x="724" y="984"><tspan id="trsvg120">South Pier</tspan></text></switch>
        </g>
        <g id="lbnel" fontSize="12" fill="#000000">
          <switch><text id="lbne5a" x="730" y="729"><tspan id="trsvg121">Clarke</tspan></text></switch>
          <switch><text id="lbne5b" x="730" y="741"><tspan id="trsvg122">Quay</tspan></text></switch>
          <switch><text id="lbne8a" x="810" y="591"><tspan id="trsvg123">Farrer</tspan></text></switch>
          <switch><text id="lbne8b" x="810" y="603"><tspan id="trsvg124">Park</tspan></text></switch>
          <switch><text id="lbne9" x="838" y="564"><tspan id="trsvg125">Boon Keng</tspan></text></switch>
          <switch><text id="lbne10" x="867" y="532"><tspan id="trsvg126">Potong Pasir</tspan></text></switch>
          <switch><text id="lbne11" x="893" y="509"><tspan id="trsvg127">Woodleigh</tspan></text></switch>
          <switch><text id="lbne13" x="961" y="441"><tspan id="trsvg128">Kovan</tspan></text></switch>
          <switch><text id="lbne14" x="996" y="403"><tspan id="trsvg129">Hougang</tspan></text></switch>
          <switch><text id="lbne15" x="962" y="365"><tspan id="trsvg130">Buangkok</tspan></text></switch>
          {/* <switch><text id="lbne18" x="1264" y="132" fill="#aaaaaa"><tspan id="trsvg131">Punggol Coast</tspan></text></switch> */}
        </g>
        <g id="lbccl" fontSize="12" fill="#000000">
          <switch><text id="lbcc2a" x="830" y="727"><tspan id="trsvg132">Bras</tspan></text></switch>
          <switch><text id="lbcc2b" x="830" y="739"><tspan id="trsvg133">Basah</tspan></text></switch>
          <switch><text id="lbcc3" x="872" y="779"><tspan id="trsvg134">Esplanade</tspan></text></switch>
          <switch><text id="lbcc5a" x="950" y="748"><tspan id="trsvg135">Nicoll</tspan></text></switch>
          <switch><text id="lbcc5b" x="934" y="760"><tspan id="trsvg136">Highway</tspan></text></switch>
          <switch><text id="lbcc6" x="1004" y="726"><tspan id="trsvg137">Stadium</tspan></text></switch>
          <switch><text id="lbcc7" x="1008" y="700"><tspan id="trsvg138">Mountbatten</tspan></text></switch>
          <switch><text id="lbcc8" x="1011" y="674"><tspan id="trsvg139">Dakota</tspan></text></switch>
          <switch><text id="lbcc11" x="989" y="556"><tspan id="trsvg140">Tai Seng</tspan></text></switch>
          <switch><text id="lbcc12" x="968" y="514"><tspan id="trsvg141">Bartley</tspan></text></switch>
          <switch><text id="lbcc14a" x="879" y="413"><tspan id="trsvg142">Lorong</tspan></text></switch>
          <switch><text id="lbcc14b" x="879" y="425"><tspan id="trsvg143">Chuan</tspan></text></switch>
          <switch><text id="lbcc16" x="690" y="383"><tspan id="trsvg144">Marymount</tspan></text></switch>
          <switch><text id="lbcc20" x="522" y="520"><tspan id="trsvg146">Farrer Road</tspan></text></switch>
          <switch><text id="lbcc21a" x="504" y="556"><tspan id="trsvg147">Holland</tspan></text></switch>
          <switch><text id="lbcc21b" x="504" y="568"><tspan id="trsvg148">Village</tspan></text></switch>
          <switch><text id="lbcc23a" x="444" y="635"><tspan id="trsvg149">one-</tspan></text></switch>
          <switch><text id="lbcc23b" x="441" y="645"><tspan id="trsvg150">north</tspan></text></switch>
          <switch><text id="lbcc24a" x="483" y="674"><tspan id="trsvg151">Kent</tspan></text></switch>
          <switch><text id="lbcc24b" x="483" y="686"><tspan id="trsvg152">Ridge</tspan></text></switch>
          <switch><text id="lbcc25a" x="490" y="713"><tspan id="trsvg153">Haw Par</tspan></text></switch>
          <switch><text id="lbcc25b" x="490" y="725"><tspan id="trsvg154">Villa</tspan></text></switch>
          <switch><text id="lbcc26a" x="458" y="758"><tspan id="trsvg155">Pasir</tspan></text></switch>
          <switch><text id="lbcc26b" x="442" y="770"><tspan id="trsvg156">Panjang</tspan></text></switch>
          <switch><text id="lbcc27a" x="458" y="798"><tspan id="trsvg157">Labrador</tspan></text></switch>
          <switch><text id="lbcc27b" x="483" y="810"><tspan id="trsvg158">Park</tspan></text></switch>
          <switch><text id="lbcc28a" x="504" y="834"><tspan id="trsvg159">Telok</tspan></text></switch>
          <switch><text id="lbcc28b" x="488" y="846"><tspan id="trsvg160">Blangah</tspan></text></switch>
        </g>
        {/* <g id="lbcclex" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbcc18a" x="571" y="414"><tspan id="trsvg161">Bukit</tspan></text></switch>
          <switch><text id="lbcc18b" x="566" y="426"><tspan id="trsvg162">Brown</tspan></text></switch>
          <switch><text id="lbcc30" x="599" y="911"><tspan id="trsvg163">Keppel</tspan></text></switch>
          <switch><text id="lbcc31" x="636" y="928"><tspan id="trsvg164">Cantonment</tspan></text></switch>
          <switch><text id="lbcc32a" x="717" y="934"><tspan id="trsvg165">Prince</tspan></text></switch>
          <switch><text id="lbcc32b" x="713" y="946"><tspan id="trsvg166">Edward</tspan></text></switch>
          <switch><text id="lbcc32c" x="720" y="958"><tspan id="trsvg167">Road</tspan></text></switch>
        </g> */}
        <g id="lbdtl" fontSize="12" fill="#000000">
          <switch><text id="lbdt2" x="430.5" y="269"><tspan id="trsvg168">Cashew</tspan></text></switch>
          <switch><text id="lbdt3" x="433" y="301"><tspan id="trsvg169">Hillview</tspan></text></switch>
          <switch><text id="lbdt5a" x="436" y="358"><tspan id="trsvg170">Beauty</tspan></text></switch>
          <switch><text id="lbdt5b" x="442" y="370"><tspan id="trsvg171">World</tspan></text></switch>
          <switch><text id="lbdt6a" x="415" y="396"><tspan id="trsvg172">King Albert</tspan></text></switch>
          <switch><text id="lbdt6b" x="450" y="408"><tspan id="trsvg173">Park</tspan></text></switch>
          <switch><text id="lbdt7a" x="503" y="407"><tspan id="trsvg174">Sixth</tspan></text></switch>
          <switch><text id="lbdt7b" x="503" y="419"><tspan id="trsvg175">Avenue</tspan></text></switch>
          <switch><text id="lbdt8a" x="529" y="434"><tspan id="trsvg176">Tan</tspan></text></switch>
          <switch><text id="lbdt8b" x="529" y="446"><tspan id="trsvg177">Kah Kee</tspan></text></switch>
          <switch><text id="lbdt13" x="775" y="655"><tspan id="trsvg179">Rochor</tspan></text></switch>
          <switch><text id="lbdt17" x="809" y="865"><tspan id="trsvg180">Downtown</tspan></text></switch>
          <switch><text id="lbdt18a" x="747" y="789"><tspan id="trsvg181">Telok</tspan></text></switch>
          <switch><text id="lbdt18b" x="747" y="801"><tspan id="trsvg182">Ayer</tspan></text></switch>
          <switch><text id="lbdt20a" x="685" y="708"><tspan id="trsvg183">Fort</tspan></text></switch>
          <switch><text id="lbdt20b" x="662" y="720"><tspan id="trsvg184">Canning</tspan></text></switch>
          <switch><text id="lbdt21" x="780" y="686"><tspan id="trsvg185">Bencoolen</tspan></text></switch>
          <switch><text id="lbdt22a" x="874" y="660"><tspan id="trsvg186">Jalan</tspan></text></switch>
          <switch><text id="lbdt22b" x="874" y="671"><tspan id="trsvg187">Besar</tspan></text></switch>
          <switch><text id="lbdt23" x="825" y="632"><tspan id="trsvg188">Bendeemer</tspan></text></switch>
          <switch><text id="lbdt24a" x="882" y="582"><tspan id="trsvg189">Geylang</tspan></text></switch>
          <switch><text id="lbdt24b" x="895" y="594"><tspan id="trsvg190">Bahru</tspan></text></switch>
          <switch><text id="lbdt25" x="951.5" y="595"><tspan id="trsvg191">Mattar</tspan></text></switch>
          <switch><text id="lbdt27" x="1036" y="575"><tspan id="trsvg192">Ubi</tspan></text></switch>
          <switch><text id="lbdt28a" x="1077" y="595"><tspan id="trsvg193">Kaki</tspan></text></switch>
          <switch><text id="lbdt28b" x="1075" y="607"><tspan id="trsvg194">Bukit</tspan></text></switch>
          <switch><text id="lbdt29a" x="1110" y="562"><tspan id="trsvg195">Bedok</tspan></text></switch>
          <switch><text id="lbdt29b" x="1112" y="574"><tspan id="trsvg196">North</tspan></text></switch>
          <switch><text id="lbdt30a" x="1157" y="595"><tspan id="trsvg197">Bedok</tspan></text></switch>
          <switch><text id="lbdt30b" x="1149" y="607"><tspan id="trsvg198">Reservoir</tspan></text></switch>
          <switch><text id="lbdt31a" x="1184" y="562"><tspan id="trsvg199">Tampines</tspan></text></switch>
          <switch><text id="lbdt31b" x="1196" y="574"><tspan id="trsvg200">West</tspan></text></switch>
          <switch><text id="lbdt33a" x="1292" y="609"><tspan id="trsvg201">Tampines</tspan></text></switch>
          <switch><text id="lbdt33b" x="1292" y="621"><tspan id="trsvg202">East</tspan></text></switch>
          <switch><text id="lbdt34a" x="1292" y="643"><tspan id="trsvg203">Upper</tspan></text></switch>
          <switch><text id="lbdt34b" x="1292" y="655"><tspan id="trsvg204">Changi</tspan></text></switch>
        </g>
        {/* <g id="lbdtlex" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbdt36" x="1292" y="731"><tspan id="trsvg205">Xilin</tspan></text></switch>
          <switch><text id="lbdt37a" x="1269" y="782"><tspan id="trsvg206">Sungei</tspan></text></switch>
          <switch><text id="lbdt37b" x="1271" y="794"><tspan id="trsvg207">Bedok</tspan></text></switch>
          <switch><text id="lbdt4" x="442" y="333"><tspan id="trsvg208">Hume</tspan></text></switch>
        </g> */}
        <g id="lbtel" fontSize="12" fill="#000000">
          <switch><text id="lbte1a" x="450" y="29"><tspan id="trsvg209">Woodlands North</tspan></text></switch>
          <switch><text id="lbte3a" x="596" y="119"><tspan id="trsvg210">Woodlands</tspan></text></switch>
          <switch><text id="lbte3b" x="596" y="131"><tspan id="trsvg211">South</tspan></text></switch>
          <switch><text id="lbte4" x="632" y="163"><tspan id="trsvg212">Springleaf</tspan></text></switch>
          <switch><text id="lbte5" x="665" y="212"><tspan id="trsvg213">Lentor</tspan></text></switch>
          <switch><text id="lbte6" x="665" y="250"><tspan id="trsvg214">Mayflower</tspan></text></switch>
          <switch><text id="lbte7a" x="622" y="292"><tspan id="trsvg215">Bright</tspan></text></switch>
          <switch><text id="lbte7b" x="637" y="304"><tspan id="trsvg216">Hill</tspan></text></switch>
          <switch><text id="lbte8a" x="621" y="354"><tspan id="trsvg217">Upper</tspan></text></switch>
          <switch><text id="lbte8b" x="604" y="366"><tspan id="trsvg218">Thomson</tspan></text></switch>
          <switch><text id="lbte12" x="617" y="520"><tspan id="trsvg221">Napier</tspan></text></switch>
          <switch><text id="lbte13a" x="610" y="546"><tspan id="trsvg222">Orchard</tspan></text></switch>
          <switch><text id="lbte13b" x="599" y="558"><tspan id="trsvg223">Boulevard</tspan></text></switch>
          <switch><text id="lbte15a" x="622" y="647"><tspan id="trsvg224">Great</tspan></text></switch>
          <switch><text id="lbte15b" x="621" y="659"><tspan id="trsvg225">World</tspan></text></switch>
          <switch><text id="lbte16" x="603" y="697"><tspan id="trsvg226">Havelock</tspan></text></switch>
          <switch><text id="lbte18" x="694" y="827"><tspan id="trsvg227">Maxwell</tspan></text></switch>
          <switch><text id="lbte19a" x="736" y="863"><tspan id="trsvg228">Shenton</tspan></text></switch>
          <switch><text id="lbte19b" x="746" y="875"><tspan id="trsvg229">Way</tspan></text></switch>
          <switch><text id="lbte22a-ms" x="876" y="968" systemLanguage="ms"><tspan id="trsvg232-ms">Taman</tspan></text><text id="lbte22a" x="876" y="968"><tspan id="trsvg232">Gardens</tspan></text></switch>
          <switch><text id="lbte22b-ms" x="876" y="980" systemLanguage="ms"><tspan id="trsvg233-ms"> di Pesisiran</tspan></text><text id="lbte22b" x="876" y="980"><tspan id="trsvg233">by the Bay</tspan></text></switch>
        </g>
        {/* <g id="lbtelex" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbte10a" x="665" y="442"><tspan id="trsvg219">Mount</tspan></text></switch>
          <switch><text id="lbte10b" x="665" y="454"><tspan id="trsvg220">Pleasant</tspan></text></switch>
          <switch><text id="lbte21a" x="818" y="968"><tspan id="trsvg230">Marina</tspan></text></switch>
          <switch><text id="lbte21b" x="820" y="980"><tspan id="trsvg231">South</tspan></text></switch>
          <switch><text id="lbte22aa-ms" x="956" y="923" systemLanguage="ms"><tspan id="trsvg234-ms">Peringatan</tspan></text><text id="lbte22aa" x="956" y="923"><tspan id="trsvg234">{"Founders'"}</tspan></text></switch>
          <switch><text id="lbte22ab-ms" x="956" y="935" systemLanguage="ms"><tspan id="trsvg235-ms"> Pengasas</tspan></text><text id="lbte22ab" x="956" y="935"><tspan id="trsvg235">Memorial</tspan></text></switch>
          <switch><text id="lbte23a" x="1000" y="879"><tspan id="trsvg236">Tanjong</tspan></text></switch>
          <switch><text id="lbte23b" x="1000" y="891"><tspan id="trsvg237">Rhu</tspan></text></switch>
          <switch><text id="lbte24" x="1028" y="842"><tspan id="trsvg238">Katong Park</tspan></text></switch>
          <switch><text id="lbte25a" x="995" y="788"><tspan id="trsvg239">Tanjong</tspan></text></switch>
          <switch><text id="lbte25b" x="1000" y="800"><tspan id="trsvg240">Katong</tspan></text></switch>
          <switch><text id="lbte26a" x="1067" y="748"><tspan id="trsvg241">Marine</tspan></text></switch>
          <switch><text id="lbte26b" x="1065" y="760"><tspan id="trsvg242">Parade</tspan></text></switch>
          <switch><text id="lbte27a" x="1106" y="782"><tspan id="trsvg243">Marine</tspan></text></switch>
          <switch><text id="lbte27b" x="1104" y="794"><tspan id="trsvg244">Terrace</tspan></text></switch>
          <switch><text id="lbte28" x="1147" y="758"><tspan id="trsvg245">Siglap</tspan></text></switch>
          <switch><text id="lbte29" x="1178" y="782"><tspan id="trsvg246">Bayshore</tspan></text></switch>
          <switch><text id="lbte30a" x="1224" y="746"><tspan id="trsvg247">Bedok</tspan></text></switch>
          <switch><text id="lbte30b" x="1225" y="758"><tspan id="trsvg248">South</tspan></text></switch>
        </g> */}
        {/* <g id="lbjrlex" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbjs2a" x="163" y="274"><tspan id="trsvg249">Choa Chu</tspan></text></switch>
          <switch><text id="lbjs2b" x="158" y="286"><tspan id="trsvg250">Kang West</tspan></text></switch>
          <switch><text id="lbjs3" x="132" y="332"><tspan id="trsvg251">Tengah</tspan></text></switch>
          <switch><text id="lbjs4" x="94" y="384"><tspan id="trsvg252">Hong Kah</tspan></text></switch>
          <switch><text id="lbjs5" x="84" y="418"><tspan id="trsvg253">Corporation</tspan></text></switch>
          <switch><text id="lbjs6a" x="112" y="448"><tspan id="trsvg254">Jurong</tspan></text></switch>
          <switch><text id="lbjs6b" x="121" y="460"><tspan id="trsvg255">West</tspan></text></switch>
          <switch><text id="lbjs7a" x="160" y="478"><tspan id="trsvg256">Bahar</tspan></text></switch>
          <switch><text id="lbjs7b" x="160" y="490"><tspan id="trsvg257">Junction</tspan></text></switch>
          <switch><text id="lbjs9" x="163" y="540"><tspan id="trsvg258">Enterprise</tspan></text></switch>
          <switch><text id="lbjs10" x="186" y="566"><tspan id="trsvg259">Tukang</tspan></text></switch>
          <switch><text id="lbjs11" x="211" y="591"><tspan id="trsvg260">Jurong Hill</tspan></text></switch>
          <switch><text id="lbjs12a" x="156" y="613"><tspan id="trsvg261">Jurong Pier</tspan></text></switch>
          <switch><text id="lbje1a" x="175" y="380"><tspan id="trsvg262">Tengah</tspan></text></switch>
          <switch><text id="lbje1b" x="175" y="392"><tspan id="trsvg263">Plantation</tspan></text></switch>
          <switch><text id="lbje2b" x="192" y="413"><tspan id="trsvg264">Tengah Park</tspan></text></switch>
          <switch><text id="lbje3a" x="221" y="431"><tspan id="trsvg265">Bukit Batok</tspan></text></switch>
          <switch><text id="lbje3b" x="221" y="443"><tspan id="trsvg266">West</tspan></text></switch>
          <switch><text id="lbje4a" x="253" y="462"><tspan id="trsvg267">Toh</tspan></text></switch>
          <switch><text id="lbje4b" x="253" y="475"><tspan id="trsvg268">Guan</tspan></text></switch>
          <switch><text id="lbje6a" x="321" y="532"><tspan id="trsvg269">Jurong</tspan></text></switch>
          <switch><text id="lbje6b" x="321" y="544"><tspan id="trsvg270">Town Hall</tspan></text></switch>
          <switch><text id="lbje7a" x="284" y="564"><tspan id="trsvg271">Pandan</tspan></text></switch>
          <switch><text id="lbje7b" x="274" y="576"><tspan id="trsvg272">Reservoir</tspan></text></switch>
          <switch><text id="lbjw1" x="22" y="469"><tspan id="trsvg273">Gek Poh</tspan></text></switch>
          <switch><text id="lbjw2" x="33" y="434"><tspan id="trsvg274">Tawas</tspan></text></switch>
          <switch><text id="lbjw3a" x="20" y="393"><tspan id="trsvg275">Nanyang</tspan></text></switch>
          <switch><text id="lbjw3b" x="22" y="404"><tspan id="trsvg276">Gateway</tspan></text></switch>
          <switch><text id="lbjw4a" x="20" y="358"><tspan id="trsvg277">Nanyang</tspan></text></switch>
          <switch><text id="lbjw4b" x="18" y="370"><tspan id="trsvg278">Crescent</tspan></text></switch>
          <switch><text id="lbjw5a" x="8" y="323"><tspan id="trsvg279">Peng Kang</tspan></text></switch>
          <switch><text id="lbjw5b" x="51" y="335"><tspan id="trsvg280">Hill</tspan></text></switch>
        </g> */}
        {/* <g id="lbcrlex" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbcr2a" x="1344" y="650"><tspan id="trsvg281">Aviation</tspan></text></switch>
          <switch><text id="lbcr2b" x="1360" y="661"><tspan id="trsvg282">Park</tspan></text></switch>
          <switch><text id="lbcr3a" x="1361" y="594"><tspan id="trsvg283">Loyang</tspan></text></switch>
          <switch><text id="lbcr4a" x="1321" y="554"><tspan id="trsvg284">Pasir Ris East</tspan></text></switch>
          <switch><text id="lbcr6a" x="1183" y="501"><tspan id="trsvg285">Tampines</tspan></text></switch>
          <switch><text id="lbcr6b" x="1194" y="512"><tspan id="trsvg286">North</tspan></text></switch>
          <switch><text id="lbcr7a" x="1055" y="478"><tspan id="trsvg287">Defu</tspan></text></switch>
          <switch><text id="lbcr9a" x="924" y="334"><tspan id="trsvg288">Serangoon</tspan></text></switch>
          <switch><text id="lbcr9b" x="924" y="345"><tspan id="trsvg289">North</tspan></text></switch>
          <switch><text id="lbcr10" x="856" y="313"><tspan id="trsvg290">Tavistock</tspan></text></switch>
          <switch><text id="lbcr12" x="696" y="293"><tspan id="trsvg291">Teck Ghee</tspan></text></switch>
          <switch><text id="lbcr14" x="544" y="373"><tspan id="trsvg291">Turf City</tspan></text></switch>
          <switch><text id="lbcr16" x="406" y="463"><tspan id="trsvg291">Maju</tspan></text></switch>
          <switch><text id="lbcr18a" x="393" y="603"><tspan id="trsvg291">West</tspan></text></switch>
          <switch><text id="lbcr18a" x="393" y="615"><tspan id="trsvg291">Coast</tspan></text></switch>
          <switch><text id="lbcr19a" x="345" y="632"><tspan id="trsvg291">Jurong</tspan></text></switch>
          <switch><text id="lbcr19b" x="345" y="645"><tspan id="trsvg291">Lake </tspan></text></switch>
          <switch><text id="lbcr19c" x="345" y="657"><tspan id="trsvg291">District</tspan></text></switch>
          <switch><text id="lbcp2" x="1264" y="424"><tspan id="trsvg375">Elias</tspan></text></switch>
        </g> */}
        <g id="lbint" fontSize="12" fill="#000000" fontWeight="bold">
          {/* <!-- Circle Line ints first for ease of reference. --> */}
          <switch><text id="lbcc1a" x="708" y="686"><tspan id="trsvg292">Dhoby</tspan></text></switch>
          <switch><text id="lbcc1b" x="709" y="698"><tspan id="trsvg293">Ghaut</tspan></text></switch>
          <switch><text id="lbce2a" x="789" y="895"><tspan id="trsvg294">Marina</tspan></text></switch>
          <switch><text id="lbce2b" x="789" y="907"><tspan id="trsvg295">Bay</tspan></text></switch>
          <switch><text id="lbce1" x="885" y="888"><tspan id="trsvg296">Bayfront</tspan></text></switch>
          <switch><text id="lbcc4" x="886" y="797"><tspan id="trsvg297">Promenade</tspan></text></switch>
          <switch><text id="lbcc9a" x="1010" y="621"><tspan id="trsvg298">Paya</tspan></text></switch>
          <switch><text id="lbcc9b" x="1010" y="633"><tspan id="trsvg299">Lebar</tspan></text></switch>
          <switch><text id="lbcc10" x="1001" y="594"><tspan id="trsvg300">MacPherson</tspan></text></switch>
          <switch><text id="lbcc13" x="933" y="468"><tspan id="trsvg301">Serangoon</tspan></text></switch>
          <switch><text id="lbcc15" x="793" y="390"><tspan id="trsvg302">Bishan</tspan></text></switch>
          <switch><text id="lbcc19a-ms" x="491" y="470" systemLanguage="ms"><tspan id="trsvg303-ms">Kebun</tspan></text><text id="lbcc19a" x="491" y="470"><tspan id="trsvg303">Botanic</tspan></text></switch>
          <switch><text id="lbcc19b-ms" x="486" y="482" systemLanguage="ms"><tspan id="trsvg304-ms">Bunga</tspan></text><text id="lbcc19b" x="486" y="482"><tspan id="trsvg304">Gardens</tspan></text></switch>
          <switch><text id="lbcc22" x="489" y="600"><tspan id="trsvg305">Buona Vista</tspan></text></switch>
          <switch><text id="lbcc29" x="495" y="875"><tspan id="trsvg306">HarbourFront</tspan></text></switch>
          <switch><text id="lbcg1" x="1252" y="687"><tspan id="trsvg307">Expo</tspan></text></switch>
          <switch><text id="lbew2" x="1250" y="574"><tspan id="trsvg308">Tampines</tspan></text></switch>
          <switch><text id="lbew4a" x="1235" y="650"><tspan id="trsvg309">Tanah</tspan></text></switch>
          <switch><text id="lbew4b" x="1235" y="662"><tspan id="trsvg310">Merah</tspan></text></switch>
          <switch><text id="lbew12" x="908" y="730"><tspan id="trsvg311">Bugis</tspan></text></switch>
          <switch><text id="lbew13a" x="840" y="799"><tspan id="trsvg312">City</tspan></text></switch>
          <switch><text id="lbew13b" x="840" y="811"><tspan id="trsvg313">Hall</tspan></text></switch>
          <switch><text id="lbew14a" x="808" y="831"><tspan id="trsvg314">Raffles</tspan></text></switch>
          <switch><text id="lbew14b" x="808" y="843"><tspan id="trsvg315">Place</tspan></text></switch>
          <switch><text id="lbew16a" x="605" y="782"><tspan id="trsvg316">Outram</tspan></text></switch>
          <switch><text id="lbew16b" x="621" y="794"><tspan id="trsvg317">Park</tspan></text></switch>
          <switch><text id="lbew24a" x="292" y="495"><tspan id="trsvg318">Jurong</tspan></text></switch>
          <switch><text id="lbew24b" x="292" y="508"><tspan id="trsvg319">East</tspan></text></switch>
          <switch><text id="lbns4a" x="247" y="213"><tspan id="trsvg320">Choa</tspan></text></switch>
          <switch><text id="lbns4b" x="221" y="225"><tspan id="trsvg321">Chu Kang</tspan></text></switch>
          <switch><text id="lbns21" x="714" y="536"><tspan id="trsvg322">Newton</tspan></text></switch>
          <switch><text id="lbns9" x="480" y="100"><tspan id="trsvg103">Woodlands</tspan></text></switch>
          <switch><text id="lbne4" x="702" y="758"><tspan id="trsvg323">Chinatown</tspan></text></switch>
          <switch><text id="lbne7a" x="739" y="605"><tspan id="trsvg324">Little</tspan></text></switch>
          <switch><text id="lbne7b" x="738" y="617"><tspan id="trsvg325">India</tspan></text></switch>
          <switch><text id="lbne16" x="1013" y="309"><tspan id="trsvg326">Sengkang</tspan></text></switch>
          <switch><text id="lbne17" x="1117" y="215"><tspan id="trsvg327">Punggol</tspan></text></switch>
          <switch><text id="lbdt1a" x="445" y="240"><tspan id="trsvg328">Bukit</tspan></text></switch>
          <switch><text id="lbdt1b" x="429" y="252"><tspan id="trsvg329">Panjang</tspan></text></switch>
          <switch><text id="lbcc17" x="595" y="399"><tspan id="trsvg145">Caldecott</tspan></text></switch>
          <switch><text id="lbdt10" x="664" y="484"><tspan id="trsvg178">Stevens</tspan></text></switch>
          <switch><text id="lbns22" x="604" y="590"><tspan id="trsvg117">Orchard</tspan></text></switch>
        </g>
        <g id="lbbpl" fontSize="10" fill="#000000">
          <switch><text id="lbbp2a" x="307" y="211"><tspan id="trsvg330">South</tspan></text></switch>
          <switch><text id="lbbp2b" x="309" y="221"><tspan id="trsvg331">View</tspan></text></switch>
          <switch><text id="lbbp3a" x="345" y="239"><tspan id="trsvg332">Keat</tspan></text></switch>
          <switch><text id="lbbp3b" x="344" y="249"><tspan id="trsvg333">Hong</tspan></text></switch>
          <switch><text id="lbbp4a" x="380" y="239"><tspan id="trsvg334">Teck</tspan></text></switch>
          <switch><text id="lbbp4b" x="378" y="249"><tspan id="trsvg335">Whye</tspan></text></switch>
          <switch><text id="lbbp5" x="407" y="221"><tspan id="trsvg336">Phoenix</tspan></text></switch>
          <switch><text id="lbbp7" x="525" y="242"><tspan id="trsvg337">Petir</tspan></text></switch>
          <switch><text id="lbbp8" x="525" y="272"><tspan id="trsvg338">Pending</tspan></text></switch>
          <switch><text id="lbbp9" x="569" y="251"><tspan id="trsvg339">Bangkit</tspan></text></switch>
          <switch><text id="lbbp10" x="569" y="229"><tspan id="trsvg340">Fajar</tspan></text></switch>
          <switch><text id="lbbp11" x="569" y="207"><tspan id="trsvg341">Segar</tspan></text></switch>
          <switch><text id="lbbp12" x="525" y="186"><tspan id="trsvg342">Jelapang</tspan></text></switch>
          <switch><text id="lbbp13" x="525" y="215"><tspan id="trsvg343">Senja</tspan></text></switch>
        </g>
        <g id="lbskl" fontSize="10" fill="#000000">
          <switch><text id="lbse1" x="1096" y="315"><tspan id="trsvg344">Compassvale</tspan></text></switch>
          <switch><text id="lbse2" x="1155" y="335"><tspan id="trsvg345">Rumbia</tspan></text></switch>
          <switch><text id="lbse3" x="1157" y="379"><tspan id="trsvg346">Bakau</tspan></text></switch>
          <switch><text id="lbse4" x="1071" y="384"><tspan id="trsvg347">Kangkar</tspan></text></switch>
          <switch><text id="lbse5" x="1045" y="354"><tspan id="trsvg348">Ranggung</tspan></text></switch>
          <switch><text id="lbsw1a" x="1071" y="273"><tspan id="trsvg349">Cheng</tspan></text></switch>
          <switch><text id="lbsw1b" x="1071" y="283"><tspan id="trsvg350">Lim</tspan></text></switch>
          <switch><text id="lbsw2" x="1065" y="246"><tspan id="trsvg351">Farmway</tspan></text></switch>
          <switch><text id="lbsw3" x="1048" y="228"><tspan id="trsvg352">Kupang</tspan></text></switch>
          <switch><text id="lbsw4" x="970" y="226"><tspan id="trsvg353">Thanggam</tspan></text></switch>
          <switch><text id="lbsw5" x="961" y="246"><tspan id="trsvg354">Fernvale</tspan></text></switch>
          <switch><text id="lbsw6" x="974" y="277"><tspan id="trsvg355">Layar</tspan></text></switch>
          <switch><text id="lbsw7" x="973" y="293"><tspan id="trsvg356">Tongkang</tspan></text></switch>
          <switch><text id="lbsw8" x="1025" y="286"><tspan id="trsvg357">Renjong</tspan></text></switch>
        </g>
        <g id="lbpgl" fontSize="10" fill="#000000">
          <switch><text id="lbpe1" x="1164" y="250"><tspan id="trsvg358">Cove</tspan></text></switch>
          <switch><text id="lbpe2" x="1154" y="275"><tspan id="trsvg359">Meridian</tspan></text></switch>
          <switch><text id="lbpe3" x="1160" y="293"><tspan id="trsvg360">Coral Edge</tspan></text></switch>
          <switch><text id="lbpe4" x="1252" y="282"><tspan id="trsvg361">Riviera</tspan></text></switch>
          <switch><text id="lbpe5" x="1259" y="245"><tspan id="trsvg362">Kadaloor</tspan></text></switch>
          <switch><text id="lbpe6" x="1243" y="229"><tspan id="trsvg363">Oasis</tspan></text></switch>
          <switch><text id="lbpe7" x="1198" y="219"><tspan id="trsvg364">Damai</tspan></text></switch>
          <switch><text id="lbpw1" x="1166" y="177"><tspan id="trsvg365">Sam Kee</tspan></text></switch>
          {/* <switch><text id="lbpw2" x="1162" y="150" fill="#aaaaaa"><tspan id="trsvg366">Teck Lee</tspan></text></switch> */}
          <switch><text id="lbpw3" x="1145" y="131"><tspan id="trsvg367">Punggol Point</tspan></text></switch>
          <switch><text id="lbpw4" x="1056" y="142"><tspan id="trsvg368">Samudera</tspan></text></switch>
          <switch><text id="lbpw5" x="1063" y="181"><tspan id="trsvg369">Nibong</tspan></text></switch>
          <switch><text id="lbpw6" x="1075" y="198"><tspan id="trsvg370">Sumang</tspan></text></switch>
          <switch><text id="lbpw7a" x="1131" y="182"><tspan id="trsvg371">Soo</tspan></text></switch>
          <switch><text id="lbpw7b" x="1130" y="191"><tspan id="trsvg372">Teck</tspan></text></switch>
        </g>
        {/* <g id="rtsl" fontSize="12" fill="#aaaaaa">
          <switch><text id="lbjb2a" x="360" y="29"><tspan id="trsvg373">Bukit Chagar</tspan></text></switch>
          <switch><text id="lbjb2b" x="356" y="41"><tspan id="trsvg374">(Johor Bahru)</tspan></text></switch>
        </g> */}
      </g>
    </svg>
  );
};