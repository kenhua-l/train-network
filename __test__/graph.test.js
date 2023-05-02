import Graph from '@/helper/graph.tsx'

var trainNetwork = new Graph();
var network = [
  {
      "stationId": "ce1",
      "lines": "ccl, dtl",
      "neighbors": "ce2, cc4, dt17"
  },
  {
      "stationId": "ce2",
      "lines": "ccl, nsl, tel",
      "neighbors": "ce1, ns28, ew14, te22, te19"
  },
  {
      "stationId": "cc1",
      "lines": "ccl, nsl, nel",
      "neighbors": "cc2, ew13, ns23, ne5, ne7"
  },
  {
      "stationId": "cc2",
      "lines": "ccl",
      "neighbors": "cc1, cc3"
  },
  {
      "stationId": "cc3",
      "lines": "ccl",
      "neighbors": "cc2, cc4"
  },
  {
      "stationId": "cc4",
      "lines": "ccl, dtl",
      "neighbors": "cc3, cc5, ce1, ew12"
  },
  {
      "stationId": "cc5",
      "lines": "ccl",
      "neighbors": "cc4, cc6"
  },
  {
      "stationId": "cc6",
      "lines": "ccl",
      "neighbors": "cc5, cc7"
  },
  {
      "stationId": "cc7",
      "lines": "ccl",
      "neighbors": "cc6, cc8"
  },
  {
      "stationId": "cc8",
      "lines": "ccl",
      "neighbors": "cc7, cc9"
  },
  {
      "stationId": "cc9",
      "lines": "ccl, ewl",
      "neighbors": "cc8, cc10, ew9, ew7"
  },
  {
      "stationId": "cc10",
      "lines": "ccl, dtl",
      "neighbors": "cc9, cc11, dt25, dt27"
  },
  {
      "stationId": "cc11",
      "lines": "ccl",
      "neighbors": "cc10, cc12"
  },
  {
      "stationId": "cc12",
      "lines": "ccl",
      "neighbors": "cc11, cc13"
  },
  {
      "stationId": "cc13",
      "lines": "ccl, nel",
      "neighbors": "cc12, cc14, ne11, ne13"
  },
  {
      "stationId": "cc14",
      "lines": "ccl",
      "neighbors": "cc13, cc15"
  },
  {
      "stationId": "cc15",
      "lines": "ccl, nsl",
      "neighbors": "cc14, cc16, ns18, ns16"
  },
  {
      "stationId": "cc16",
      "lines": "ccl",
      "neighbors": "cc15, cc17"
  },
  {
      "stationId": "cc17",
      "lines": "ccl, tel",
      "neighbors": "cc16, cc19, dt10, te8"
  },
  {
      "stationId": "cc19",
      "lines": "ccl, dtl",
      "neighbors": "cc17, cc20, dt10, dt8"
  },
  {
      "stationId": "cc20",
      "lines": "ccl",
      "neighbors": "cc19, cc21"
  },
  {
      "stationId": "cc21",
      "lines": "ccl",
      "neighbors": "cc20, cc22"
  },
  {
      "stationId": "cc22",
      "lines": "ccl, ewl",
      "neighbors": "cc21, cc23, ew20, ew22"
  },
  {
      "stationId": "cc23",
      "lines": "ccl",
      "neighbors": "cc22, cc24"
  },
  {
      "stationId": "cc24",
      "lines": "ccl",
      "neighbors": "cc23, cc25"
  },
  {
      "stationId": "cc25",
      "lines": "ccl",
      "neighbors": "cc24, cc26"
  },
  {
      "stationId": "cc26",
      "lines": "ccl",
      "neighbors": "cc25, cc27"
  },
  {
      "stationId": "cc27",
      "lines": "ccl",
      "neighbors": "cc26, cc28"
  },
  {
      "stationId": "cc28",
      "lines": "ccl",
      "neighbors": "cc27, cc29"
  },
  {
      "stationId": "cc29",
      "lines": "ccl, nel",
      "neighbors": "cc28, ew16"
  },
  {
      "stationId": "cg1",
      "lines": "ewl, dtl",
      "neighbors": "cg2, ew4, dt34"
  },
  {
      "stationId": "cg2",
      "lines": "ewl",
      "neighbors": "cg1"
  },
  {
      "stationId": "ew1",
      "lines": "ewl",
      "neighbors": "ew2"
  },
  {
      "stationId": "ew2",
      "lines": "ewl, dtl",
      "neighbors": "ew1, ew3, dt33, dt31"
  },
  {
      "stationId": "ew3",
      "lines": "ewl",
      "neighbors": "ew2, ew4"
  },
  {
      "stationId": "ew4",
      "lines": "ewl",
      "neighbors": "ew3, cg1, ew5"
  },
  {
      "stationId": "ew5",
      "lines": "ewl",
      "neighbors": "ew4, ew6"
  },
  {
      "stationId": "ew6",
      "lines": "ewl",
      "neighbors": "ew5, ew7"
  },
  {
      "stationId": "ew7",
      "lines": "ewl",
      "neighbors": "ew6, cc9"
  },
  {
      "stationId": "ew9",
      "lines": "ewl",
      "neighbors": "cc9, ew10"
  },
  {
      "stationId": "ew10",
      "lines": "ewl",
      "neighbors": "ew9, ew11"
  },
  {
      "stationId": "ew11",
      "lines": "ewl",
      "neighbors": "ew10, ew12"
  },
  {
      "stationId": "ew12",
      "lines": "ewl, dtl",
      "neighbors": "ew11, ew13, cc4, dt13"
  },
  {
      "stationId": "ew13",
      "lines": "ewl, nsl",
      "neighbors": "ew12, ew14, cc1"
  },
  {
      "stationId": "ew14",
      "lines": "ewl, nsl",
      "neighbors": "ew13, ew15, ce2"
  },
  {
      "stationId": "ew15",
      "lines": "ewl",
      "neighbors": "ew14, ew16"
  },
  {
      "stationId": "ew16",
      "lines": "ewl, nel, tel",
      "neighbors": "ew15, ew17, cc29, ne4, te18, te16"
  },
  {
      "stationId": "ew17",
      "lines": "ewl",
      "neighbors": "ew16, ew18"
  },
  {
      "stationId": "ew18",
      "lines": "ewl",
      "neighbors": "ew17, ew19"
  },
  {
      "stationId": "ew19",
      "lines": "ewl",
      "neighbors": "ew18, ew20"
  },
  {
      "stationId": "ew20",
      "lines": "ewl",
      "neighbors": "ew19, cc22"
  },
  {
      "stationId": "ew22",
      "lines": "ewl",
      "neighbors": "cc22, ew23"
  },
  {
      "stationId": "ew23",
      "lines": "ewl",
      "neighbors": "ew22, ew24"
  },
  {
      "stationId": "ew24",
      "lines": "ewl, nsl",
      "neighbors": "ew23, ew25, ns2"
  },
  {
      "stationId": "ew25",
      "lines": "ewl",
      "neighbors": "ew24, ew26"
  },
  {
      "stationId": "ew26",
      "lines": "ewl",
      "neighbors": "ew25, ew27"
  },
  {
      "stationId": "ew27",
      "lines": "ewl",
      "neighbors": "ew26, ew28"
  },
  {
      "stationId": "ew28",
      "lines": "ewl",
      "neighbors": "ew27, ew29"
  },
  {
      "stationId": "ew29",
      "lines": "ewl",
      "neighbors": "ew28, ew30"
  },
  {
      "stationId": "ew30",
      "lines": "ewl",
      "neighbors": "ew29, ew31"
  },
  {
      "stationId": "ew31",
      "lines": "ewl",
      "neighbors": "ew30, ew32"
  },
  {
      "stationId": "ew32",
      "lines": "ewl",
      "neighbors": "ew31, ew33"
  },
  {
      "stationId": "ew33",
      "lines": "ewl",
      "neighbors": "ew32"
  },
  {
      "stationId": "ns2",
      "lines": "nsl",
      "neighbors": "ew24, ns3"
  },
  {
      "stationId": "ns3",
      "lines": "nsl",
      "neighbors": "ns2, ns4"
  },
  {
      "stationId": "ns4",
      "lines": "nsl, bplrt",
      "neighbors": "ns3, ns5, bp2"
  },
  {
      "stationId": "ns5",
      "lines": "nsl",
      "neighbors": "ns4, ns7"
  },
  {
      "stationId": "ns7",
      "lines": "nsl",
      "neighbors": "ns5, ns8"
  },
  {
      "stationId": "ns8",
      "lines": "nsl",
      "neighbors": "ns7, ns9"
  },
  {
      "stationId": "ns9",
      "lines": "nsl, tel",
      "neighbors": "ns8, ns10, te1, te3"
  },
  {
      "stationId": "ns10",
      "lines": "nsl",
      "neighbors": "ns9, ns11"
  },
  {
      "stationId": "ns11",
      "lines": "nsl",
      "neighbors": "ns10, ns12"
  },
  {
      "stationId": "ns12",
      "lines": "nsl",
      "neighbors": "ns11, ns13"
  },
  {
      "stationId": "ns13",
      "lines": "nsl",
      "neighbors": "ns12, ns14"
  },
  {
      "stationId": "ns14",
      "lines": "nsl",
      "neighbors": "ns13, ns15"
  },
  {
      "stationId": "ns15",
      "lines": "nsl",
      "neighbors": "ns14, ns16"
  },
  {
      "stationId": "ns16",
      "lines": "nsl",
      "neighbors": "ns15, cc15"
  },
  {
      "stationId": "ns18",
      "lines": "nsl",
      "neighbors": "cc15, ns19"
  },
  {
      "stationId": "ns19",
      "lines": "nsl",
      "neighbors": "ns18, ns20"
  },
  {
      "stationId": "ns20",
      "lines": "nsl",
      "neighbors": "ns19, ns21"
  },
  {
      "stationId": "ns21",
      "lines": "nsl, dtl",
      "neighbors": "ns20, ns22, dt10, ne7"
  },
  {
      "stationId": "ns22",
      "lines": "nsl, tel",
      "neighbors": "ns21, ns23, te13, te15"
  },
  {
      "stationId": "ns23",
      "lines": "nsl",
      "neighbors": "ns22, cc1"
  },
  {
      "stationId": "ns28",
      "lines": "nsl",
      "neighbors": "ce2"
  },
  {
      "stationId": "ne4",
      "lines": "nel, dtl",
      "neighbors": "ew16, ne5, dt18, dt20"
  },
  {
      "stationId": "ne5",
      "lines": "nel",
      "neighbors": "ne4, cc1"
  },
  {
      "stationId": "ne7",
      "lines": "nel, dtl",
      "neighbors": "cc1, ne8, dt13, ns21"
  },
  {
      "stationId": "ne8",
      "lines": "nel",
      "neighbors": "ne7, ne9"
  },
  {
      "stationId": "ne9",
      "lines": "nel",
      "neighbors": "ne8, ne10"
  },
  {
      "stationId": "ne10",
      "lines": "nel",
      "neighbors": "ne9, ne11"
  },
  {
      "stationId": "ne11",
      "lines": "nel",
      "neighbors": "ne10, cc13"
  },
  {
      "stationId": "ne13",
      "lines": "nel",
      "neighbors": "cc13, ne14"
  },
  {
      "stationId": "ne14",
      "lines": "nel",
      "neighbors": "ne13, ne15"
  },
  {
      "stationId": "ne15",
      "lines": "nel",
      "neighbors": "ne14, ne16"
  },
  {
      "stationId": "ne16",
      "lines": "nel, sklrt",
      "neighbors": "ne15, ne17, se1, se5, sw1, sw8"
  },
  {
      "stationId": "ne17",
      "lines": "nel, pglrt",
      "neighbors": "ne16, pe7, pe1, pw7, pw1"
  },
  {
      "stationId": "dt1",
      "lines": "dtl, bplrt",
      "neighbors": "dt2, bp5, bp13, bp7"
  },
  {
      "stationId": "dt2",
      "lines": "dtl",
      "neighbors": "dt1, dt3"
  },
  {
      "stationId": "dt3",
      "lines": "dtl",
      "neighbors": "dt2, dt5"
  },
  {
      "stationId": "dt5",
      "lines": "dtl",
      "neighbors": "dt3, dt6"
  },
  {
      "stationId": "dt6",
      "lines": "dtl",
      "neighbors": "dt5, dt7"
  },
  {
      "stationId": "dt7",
      "lines": "dtl",
      "neighbors": "dt6, dt8"
  },
  {
      "stationId": "dt8",
      "lines": "dtl",
      "neighbors": "dt7, cc19"
  },
  {
      "stationId": "dt10",
      "lines": "dtl, tel",
      "neighbors": "cc19, ns21, te12, cc17"
  },
  {
      "stationId": "dt13",
      "lines": "dtl",
      "neighbors": "ne7, ew12"
  },
  {
      "stationId": "dt17",
      "lines": "dtl",
      "neighbors": "ce1, dt18"
  },
  {
      "stationId": "dt18",
      "lines": "dtl",
      "neighbors": "dt17, ne4"
  },
  {
      "stationId": "dt20",
      "lines": "dtl",
      "neighbors": "ne4, dt21"
  },
  {
      "stationId": "dt21",
      "lines": "dtl",
      "neighbors": "dt20, dt22"
  },
  {
      "stationId": "dt22",
      "lines": "dtl",
      "neighbors": "dt21, dt23"
  },
  {
      "stationId": "dt23",
      "lines": "dtl",
      "neighbors": "dt22, dt24"
  },
  {
      "stationId": "dt24",
      "lines": "dtl",
      "neighbors": "dt23, dt25"
  },
  {
      "stationId": "dt25",
      "lines": "dtl",
      "neighbors": "dt24, cc10"
  },
  {
      "stationId": "dt27",
      "lines": "dtl",
      "neighbors": "cc10, dt28"
  },
  {
      "stationId": "dt28",
      "lines": "dtl",
      "neighbors": "dt27, dt29"
  },
  {
      "stationId": "dt29",
      "lines": "dtl",
      "neighbors": "dt28, dt30"
  },
  {
      "stationId": "dt30",
      "lines": "dtl",
      "neighbors": "dt29, dt31"
  },
  {
      "stationId": "dt31",
      "lines": "dtl",
      "neighbors": "dt30, ew2"
  },
  {
      "stationId": "dt33",
      "lines": "dtl",
      "neighbors": "ew2, dt34"
  },
  {
      "stationId": "dt34",
      "lines": "dtl",
      "neighbors": "dt33, cg1"
  },
  {
      "stationId": "te1",
      "lines": "tel",
      "neighbors": "ns9"
  },
  {
      "stationId": "te3",
      "lines": "tel",
      "neighbors": "ns9, te4"
  },
  {
      "stationId": "te4",
      "lines": "tel",
      "neighbors": "te3, te5"
  },
  {
      "stationId": "te5",
      "lines": "tel",
      "neighbors": "te4, te6"
  },
  {
      "stationId": "te6",
      "lines": "tel",
      "neighbors": "te5, te7"
  },
  {
      "stationId": "te7",
      "lines": "tel",
      "neighbors": "te6, te8"
  },
  {
      "stationId": "te8",
      "lines": "tel",
      "neighbors": "te7, cc17"
  },
  {
      "stationId": "te12",
      "lines": "tel",
      "neighbors": "dt10, te13"
  },
  {
      "stationId": "te13",
      "lines": "tel",
      "neighbors": "te12, ns22"
  },
  {
      "stationId": "te15",
      "lines": "tel",
      "neighbors": "ns22, te16"
  },
  {
      "stationId": "te16",
      "lines": "tel",
      "neighbors": "te15, ew16"
  },
  {
      "stationId": "te18",
      "lines": "tel",
      "neighbors": "ew16, te19"
  },
  {
      "stationId": "te19",
      "lines": "tel",
      "neighbors": "te18, ce2"
  },
  {
      "stationId": "te22",
      "lines": "tel",
      "neighbors": "ce2"
  },
  {
      "stationId": "bp2",
      "lines": "bplrt",
      "neighbors": "ns4, bp3"
  },
  {
      "stationId": "bp3",
      "lines": "bplrt",
      "neighbors": "bp2, bp4"
  },
  {
      "stationId": "bp4",
      "lines": "bplrt",
      "neighbors": "bp3, bp5"
  },
  {
      "stationId": "bp5",
      "lines": "bplrt",
      "neighbors": "bp4, dt1"
  },
  {
      "stationId": "bp7",
      "lines": "bplrt",
      "neighbors": "dt1, bp8"
  },
  {
      "stationId": "bp8",
      "lines": "bplrt",
      "neighbors": "bp7, bp9"
  },
  {
      "stationId": "bp9",
      "lines": "bplrt",
      "neighbors": "bp8, bp10"
  },
  {
      "stationId": "bp10",
      "lines": "bplrt",
      "neighbors": "bp9, bp11"
  },
  {
      "stationId": "bp11",
      "lines": "bplrt",
      "neighbors": "bp10, bp12"
  },
  {
      "stationId": "bp12",
      "lines": "bplrt",
      "neighbors": "bp11, bp13"
  },
  {
      "stationId": "bp13",
      "lines": "bplrt",
      "neighbors": "bp12, dt1"
  },
  {
      "stationId": "se1",
      "lines": "sklrt",
      "neighbors": "ne16, se2"
  },
  {
      "stationId": "se2",
      "lines": "sklrt",
      "neighbors": "se1, se3"
  },
  {
      "stationId": "se3",
      "lines": "sklrt",
      "neighbors": "se2, se4"
  },
  {
      "stationId": "se4",
      "lines": "sklrt",
      "neighbors": "se3, se5"
  },
  {
      "stationId": "se5",
      "lines": "sklrt",
      "neighbors": "se4, ne16"
  },
  {
      "stationId": "sw1",
      "lines": "sklrt",
      "neighbors": "ne16, sw2"
  },
  {
      "stationId": "sw2",
      "lines": "sklrt",
      "neighbors": "sw1, sw3"
  },
  {
      "stationId": "sw3",
      "lines": "sklrt",
      "neighbors": "sw2, sw4"
  },
  {
      "stationId": "sw4",
      "lines": "sklrt",
      "neighbors": "sw3, sw5"
  },
  {
      "stationId": "sw5",
      "lines": "sklrt",
      "neighbors": "sw4, sw6"
  },
  {
      "stationId": "sw6",
      "lines": "sklrt",
      "neighbors": "sw5, sw7"
  },
  {
      "stationId": "sw7",
      "lines": "sklrt",
      "neighbors": "sw6, sw8"
  },
  {
      "stationId": "sw8",
      "lines": "sklrt",
      "neighbors": "sw7, ne16"
  },
  {
      "stationId": "pe1",
      "lines": "pglrt",
      "neighbors": "ne17, pe2"
  },
  {
      "stationId": "pe2",
      "lines": "pglrt",
      "neighbors": "pe1, pe3"
  },
  {
      "stationId": "pe3",
      "lines": "pglrt",
      "neighbors": "pe2, pe4"
  },
  {
      "stationId": "pe4",
      "lines": "pglrt",
      "neighbors": "pe3, pe5"
  },
  {
      "stationId": "pe5",
      "lines": "pglrt",
      "neighbors": "pe4, pe6"
  },
  {
      "stationId": "pe6",
      "lines": "pglrt",
      "neighbors": "pe5, pe7"
  },
  {
      "stationId": "pe7",
      "lines": "pglrt",
      "neighbors": "pe6, ne17"
  },
  {
      "stationId": "pw1",
      "lines": "pglrt",
      "neighbors": "ne17, pw3"
  },
  {
      "stationId": "pw3",
      "lines": "pglrt",
      "neighbors": "pw1, pw4"
  },
  {
      "stationId": "pw4",
      "lines": "pglrt",
      "neighbors": "pw3, pw5"
  },
  {
      "stationId": "pw5",
      "lines": "pglrt",
      "neighbors": "pw4, pw6"
  },
  {
      "stationId": "pw6",
      "lines": "pglrt",
      "neighbors": "pw5, pw7"
  },
  {
      "stationId": "pw7",
      "lines": "pglrt",
      "neighbors": "pw6, ne17"
  }
]

function initializeGraph() {
  network.forEach((station, i) => {
    let neighbors = station.neighbors.split(', ');
    let lines = station.lines.split(', ');
    trainNetwork.add(station.stationId, neighbors, lines);
  });
}

// initialise the graph
beforeAll(() => {
  console.log('graph loaded once');
  return initializeGraph();
});

// TESTS
var tests = [
  { src: "cc15", dest: "ew16", id: "Bishan to Outram Park", type: "Interchange change line",
    musthaveroute:['cc15', 'ns18', 'ns19', 'ns20', 'ns21', 'ns22', 'te15', 'te16', 'ew16']
  },
  { src: "cc15", dest: "ns16", id: "Bishan to Ang Mo Kio", type: "Interchange to normal one stop",
    musthaveroute:['cc15', 'ns16']
  },
  { src: "cc15", dest: "pw3", id: "Bishan to Punggol Point", type: "Interchange to LRT",
    musthaveroute:['cc15', 'cc14', 'cc13', 'ne13', 'ne14', 'ne15', 'ne16', 'ne17', 'pw1', 'pw3']
  },
  { src: "cc15", dest: "cg2", id: "Bishan to Changi Airport", type: "Interchange to edge",
    musthaveroute:['cc15', 'cc14', 'cc13', 'cc12', 'cc11', 'cc10', 'cc9', 'ew7', 'ew6', 'ew5', 'ew4', 'cg1', 'cg2']
  },
  { src: "cc15", dest: "ew14", id: "Bishan to Raffles Place", type: "Interchange to busy station",
    musthaveroute:['cc15', 'ns18', 'ns19', 'ns20', 'ns21', 'ns22', 'ns23', 'cc1', 'ew13', 'ew14']
  },
  { src: "cc15", dest: "bp2", id: "Bishan to South View", type: "Interchange to sandwiched LRT",
    musthaveroute:['cc15', 'ns16', 'ns15', 'ns14', 'ns13', 'ns12', 'ns11', 'ns10', 'ns9', 'ns8', 'ns7', 'ns5', 'ns4', 'bp2']
  },
  { src: "ns16", dest: "ew11", id: "Ang Mo Kio to Lavender", type: "Normal change line",
    musthaveroute:['ns16', 'cc15', 'ns18', 'ns19', 'ns20', 'ns21', 'ns22', 'ns23', 'cc1', 'ew13', 'ew12', 'ew11']
  },
  { src: "ns16", dest: "dt28", id: "Ang Mo Kio to Kaki Bukit", type: "Normal change line",
    musthaveroute:['ns16', 'cc15', 'cc14', 'cc13', 'cc12', 'cc11', 'cc10', 'dt27', 'dt28']
  },
  { src: "ns2", dest: "ns3", id: "Bukit Batok to Bukit Gombak", type: "One stop sandwiched line",
    musthaveroute:['ns2', 'ns3']
  },
  { src: "ew28", dest: "ew27", id: "Pioneer to Boon Lay", type: "One stop edge line",
    musthaveroute:['ew28', 'ew27']
  },
  { src: "ns9", dest: "te1", id: "Woodlands to Woodlands North", type: "One stop edge to interchange",
    musthaveroute:['ns9', 'te1']
  },
  { src: "ew14", dest: "ew13", id: "Raffles City to City Hall", type: "One stop busy to busy",
    musthaveroute:['ew14', 'ew13']
  },
  { src: "bp10", dest: "bp9", id: "Fajar to Bangkit", type: "One stop LRT to LRT",
    musthaveroute:['bp10', 'bp9']
  },
  { src: "pw4", dest: "bp11", id: "Samudera to Segar", type: "LRT to LRT go through city",
    musthaveroute:['pw4', 'pw3', 'pw1', 'ne17', 'ne16', 'ne15', 'ne14', 'ne13', 'cc13', 'cc14', 'cc15', 'cc16', 'cc17', 'cc19', 'dt8', 'dt7', 'dt6', 'dt5', 'dt3', 'dt2', 'dt1', 'bp13', 'bp12', 'bp11']
  },
  { src: "pw4", dest: "pe4", id: "Samudera to Riviera", type: "LRT to LRT different loop",
    musthaveroute:['pw4', 'pw3','pw1', 'ne17', 'pe7', 'pe6', 'pe5', 'pe4']
  },
  { src: "pw4", dest: "se3", id: "Samudera to Bakau", type: "LRT to LRT different system",
    musthaveroute:['pw4', 'pw3', 'pw1', 'ne17', 'ne16', 'se1', 'se2', 'se3']
  },
  { src: "cc1", dest: "ew16", id: "Dhoby Ghaut to Outram Park", type: "Interchange to interchage in same line",
    musthaveroute:['cc1', 'ne5', 'ne4', 'ew16']
  },
  { src: "te18", dest: "te19", id: "Maxwell to Shenton Way", type: "Same line TEL",
    musthaveroute:['te18', 'te19']
  },
  { src: "ne13", dest: "ne11", id: "Kovan to Woodleigh", type: "Same line NEL",
    musthaveroute:['ne13', 'cc13', 'ne11']
  },
  { src: "cc29", dest: "cc1", id: "Harbourfront to Dhoby Ghaut", type: "Same line edge to interchange",
    musthaveroute:['cc29', 'ew16', 'ne4', 'ne5', 'cc1']
  },
  { src: "ew4", dest: "cg1", id: "Tanah Merah to Expo", type: "Same line EWL with forked direction from interchange",
    musthaveroute:['ew4', 'cg1']
  },
  { src: "ew5", dest: "cg1", id: "Bedok to Expo", type: "Same line EWL with forked direction",
    musthaveroute:['ew5', 'ew4', 'cg1']
  },
  { src: "ns11", dest: "ns15", id: "Sembawang to Yio Chu Kang", type: "Same line NSL",
    musthaveroute:['ns11', 'ns12', 'ns13', 'ns14', 'ns15']
  },
  { src: "ce1", dest: "cc4", id: "Bayfront to Promenade", type: "Same line double busy stations",
    musthaveroute:['ce1', 'cc4']
  },
  { src: "cc29", dest: "cc29", id: "Harbourfront to Harbourfront", type: "Interchange station to itself",
    musthaveroute:['cc29']
  },
  { src: "ew33", dest: "ew33", id: "Tuas Link to Tuas Link", type: "Edge station to itself",
    musthaveroute:['ew33']
  },
  { src: "ew23", dest: "ew23", id: "Clementi to Clementi", type: "Normal station to itself",
    musthaveroute:['ew23']
  },
  { src: "ns4", dest: "dt1", id: "Choa Chu Kang to Bukit Panjang", type: "Red to Blue via LRT but on LRT line",
    musthaveroute:['ns4', 'bp2', 'bp3', 'bp4', 'bp5', 'dt1']
  },
  { src: "ns5", dest: "dt2", id: "Yew Tee to Cashew", type: "Red to Blue via LRT not on LRT line",
    musthaveroute:['ns5', 'ns4', 'bp2', 'bp3', 'bp4', 'bp5', 'dt1', 'dt2']
  },
  { src: "cc2", dest: "cc16", id: "Bras Basah to Marymount", type: "Same line but change line better",
    musthaveroute:['cc2', 'cc1', 'ns23', 'ns22', 'te13', 'te12', 'dt10', 'cc17', 'cc16']
  },
  { src: "dt8", dest: "dt27", id: "Tan Kah Kee to Ubi", type: "Same line but change line better",
    musthaveroute:['dt8', 'cc19', 'cc17', 'cc16', 'cc15', 'cc14', 'cc13', 'cc12', 'cc11', 'cc10', 'dt27']
  },
  { src: "cc3", dest: "cc20", id: "Esplanade to Farrer Road", type: "Same line but change line better",
    musthaveroute:['cc3', 'cc4', 'ew12', 'dt13', 'ne7', 'ns21', 'dt10', 'cc19', 'cc20']
  },
  { src: "ce1", dest: "cc20", id: "Bayfront to Farrer Road", type: "Same line but change line better",
    musthaveroute:['ce1', 'cc4', 'ew12', 'dt13', 'ne7', 'ns21', 'dt10', 'cc19', 'cc20']
  },
  { src: "ew29", dest: "pe7", id: "Joo Koon to Damai", type: "Change multiple lines",
    musthaveroute:['ew29', 'ew28', 'ew27', 'ew26', 'ew25', 'ew24', 'ew23', 'ew22', 'cc22', 'cc21', 'cc20', 'cc19', 'cc17', 'cc16', 'cc15', 'cc14', 'cc13', 'ne13', 'ne14', 'ne15', 'ne16', 'ne17', 'pe7']
  },
  { src: "cg2", dest: "te1", id: "Changi Airport to Woodlands North", type: "Change multiple lines",
    musthaveroute:['cg2', 'cg1', 'ew4', 'ew5', 'ew6', 'ew7', 'cc9', 'cc10', 'cc11', 'cc12', 'cc13', 'cc14', 'cc15', 'ns16', 'ns15', 'ns14', 'ns13', 'ns12', 'ns11', 'ns10', 'ns9', 'te1']
  }
]

expect.extend({
  hasArray(received, args) {
    var pass = false;
    for(let j=0; j<received.length; j++) {
      var paths = received[j];
      if(paths.length === args.length) {
        var check = true;
        for(let i=0; i<paths.length; i++) {
          if(paths[i] != args[i]) {
            check = false;
            break;
          }
        }
        if(check) {
          pass = true;
          break;
        }
      }
    }
    if(pass) {
      return {
        message: () => 'has the path',
        pass: true,
      };
    } else {
      console.log(received)
      return {
        message: () => 'does not have the path',
        pass: false,
      }
    }
  }
});

function testAll() {
  describe('How to Get There', () => {
    test('Bishan to Ang Mo Kio', () => {
      let test =  trainNetwork.howToGetThere('cc15', 'ns16');
      expect(test).toHaveLength(1);
      expect(test).toContain('nsl');
    });
    test('Lakeside to Chinese Garden', () => {
      let test =  trainNetwork.howToGetThere('ew26', 'ew25');
      expect(test).toHaveLength(1);
      expect(test).toContain('ewl');
    });
    test('Stevens to Caldecott', () => {
      let test =  trainNetwork.howToGetThere('dt10', 'cc17');
      expect(test).toHaveLength(1);
      expect(test).toContain('tel');
    });
    test('Outram Park to Chinatown', () => {
      let test =  trainNetwork.howToGetThere('ew16', 'ne4');
      expect(test).toHaveLength(1);
      expect(test).toContain('nel');
    });
    test('Macpherson to Paya Lebar', () => {
      let test =  trainNetwork.howToGetThere('cc10', 'cc9');
      expect(test).toHaveLength(1);
      expect(test).toContain('ccl');
    });
    test('Bishan to Ang Mo Kio', () => {
      let test =  trainNetwork.howToGetThere('cc15', 'ns16');
      expect(test).toHaveLength(1);
      expect(test).toContain('nsl');
    });
    // edge case: skip station
    test('Tanah Merah to Tampines', () => {
      let test =  trainNetwork.howToGetThere('ew4', 'ew2');
      expect(test).toHaveLength(1);
      expect(test).toContain('ewl');
    });
    // edge case: more than one line
    test('Promenade to Bayfront', () => {
      let test =  trainNetwork.howToGetThere('cc4', 'ce1');
      expect(test).toHaveLength(2);
      expect(test).toContain('ccl');
      expect(test).toContain('dtl');
    });
    // edge case: more than one line
    test('City Hall to Raffles Place', () => {
      let test =  trainNetwork.howToGetThere('ew13', 'ew14');
      expect(test).toHaveLength(2);
      expect(test).toContain('ewl');
      expect(test).toContain('nsl');
    });
    // edge case: same station
    test('Bugis to Bugis', () => {
      let test =  trainNetwork.howToGetThere('ew12', 'ew12');
      expect(test).toHaveLength(2);
      expect(test).toContain('dtl');
      expect(test).toContain('ewl');
    });
    // edge case: no overlap line
    test('Bugis to Bishan', () => {
      let test =  trainNetwork.howToGetThere('ew12', 'cc15');
      expect(test).toHaveLength(0);
    });
  });

  describe('Has Same Line', () => {
    test('Same line once', () => {
      expect(trainNetwork.hasSameLine(['ccl', 'ccl', 'ccl', 'ewl', 'ewl', 'ccl', 'ccl'])).toBeTruthy();
    });
    test('Same line in between', () => {
      expect(trainNetwork.hasSameLine(['nsl', 'ccl', 'ccl', 'ewl', 'ewl', 'ccl', 'dtl'])).toBeTruthy();
    });
    test('No same line', () => {
      expect(trainNetwork.hasSameLine(['nsl', 'ccl', 'ccl', 'ewl', 'ewl', 'dtl'])).toBeFalsy();
    });
    test('No same line at all', () => {
      expect(trainNetwork.hasSameLine(['nsl', 'ccl', 'tel', 'ewl', 'nel', 'dtl'])).toBeFalsy();
    });
    test('Same line twice', () => {
      expect(trainNetwork.hasSameLine(['nsl', 'ccl', 'nsl', 'ewl', 'ccl', 'dtl'])).toBeTruthy();
    });
    test('Only one line', () => {
      expect(trainNetwork.hasSameLine(['ccl'])).toBeFalsy();
    });
    test('Only one line multiple', () => {
      expect(trainNetwork.hasSameLine(['ccl', 'ccl', 'ccl', 'ccl'])).toBeFalsy();
    });
    test('Empty', () => {
      expect(trainNetwork.hasSameLine([])).toBeFalsy();
    });
  });

  describe('How Many Line Changes', () => {
    test('Same line once', () => {
      expect(trainNetwork.howManyLineChanges(['ccl', 'ccl', 'ccl', 'ewl', 'ewl', 'ccl', 'ccl'])).toBe(2);
    });
    test('Same line in between', () => {
      expect(trainNetwork.howManyLineChanges(['nsl', 'ccl', 'ccl', 'ewl', 'ewl', 'ccl', 'dtl'])).toBe(4);
    });
    test('No same line', () => {
      expect(trainNetwork.howManyLineChanges(['nsl', 'ccl', 'ccl', 'ewl', 'ewl', 'dtl'])).toBe(3);
    });
    test('No same line at all', () => {
      expect(trainNetwork.howManyLineChanges(['nsl', 'ccl', 'tel', 'ewl', 'nel', 'dtl'])).toBe(5);
    });
    test('Same line twice', () => {
      expect(trainNetwork.howManyLineChanges(['nsl', 'ccl', 'nsl', 'ewl', 'ccl', 'dtl'])).toBe(5);
    });
    test('Only one line', () => {
      expect(trainNetwork.howManyLineChanges(['ccl'])).toBe(0);
    });
    test('Only one line multiple', () => {
      expect(trainNetwork.howManyLineChanges(['ccl', 'ccl', 'ccl', 'ccl'])).toBe(0);
    });
    test('Empty', () => {
      expect(trainNetwork.howManyLineChanges([])).toBe(0);
    });
  });

  describe('Find Shortest Distance, djikstra', () => {
    test('Bishan to Outram Park', () => {
      expect(trainNetwork.djikstra('cc15', 'ew16')).toBe(8);
    });
    test('Bishan to Ang Mo Kio', () => {
      expect(trainNetwork.djikstra('cc15', 'ns16')).toBe(1);
    });
    test('Bishan to Punggol Point', () => {
      expect(trainNetwork.djikstra('cc15', 'pw3')).toBe(9);
    });
    test('Bishan to Changi Airport', () => {
      expect(trainNetwork.djikstra('cc15', 'cg2')).toBe(12);
    });
    test('Bishan to Raffle Place', () => {
      // via newtown dtl little india to dhoby again nel
      expect(trainNetwork.djikstra('cc15', 'ew14')).toBe(8);
    });
    test('Bishan to South View', () => {
      expect(trainNetwork.djikstra('cc15', 'bp2')).toBe(13);
    });
    test('Ang Mo Kio to Lavender', () => {
      // nsl, dtl, ewl
      expect(trainNetwork.djikstra('ns16', 'ew11')).toBe(9);
    });
    test('Ang Mo Kio to Kaki Bukit', () => {
      expect(trainNetwork.djikstra('ns16', 'dt28')).toBe(8);
    });
    test('Bukit Batok to Bukit Gombak', () => {
      expect(trainNetwork.djikstra('ns2', 'ns3')).toBe(1);
    });
    test('Pioneer to Boon Lay', () => {
      expect(trainNetwork.djikstra('ew28', 'ew27')).toBe(1);
    });
    test('Woodlands to Woodlands North', () => {
      expect(trainNetwork.djikstra('ns9', 'te1')).toBe(1);
    });
    test('Raffles Place to City Hall', () => {
      expect(trainNetwork.djikstra('ew14', 'ew13')).toBe(1);
    });
    test('Fajar to Bangkit', () => {
      expect(trainNetwork.djikstra('bp10', 'bp9')).toBe(1);
    });
    test('Samudera to Segar', () => {
      expect(trainNetwork.djikstra('pw4', 'bp11')).toBe(23);
    });
    test('Samudera to Riviera', () => {
      expect(trainNetwork.djikstra('pw4', 'pe4')).toBe(7);
    });
    test('Samudera to Bakau', () => {
      expect(trainNetwork.djikstra('pw4', 'se3')).toBe(7);
    });
    test('Dhoby Ghaut to Outram Park', () => {
      expect(trainNetwork.djikstra('cc1', 'ew16')).toBe(3);
    });
    test('Maxwell to Shenton Way', () => {
      expect(trainNetwork.djikstra('te18', 'te19')).toBe(1);
    });
    test('Kovan to Woodleigh', () => {
      expect(trainNetwork.djikstra('ne13', 'ne11')).toBe(2);
    });
    test('Harbourfront to Dhoby Ghaut', () => {
      expect(trainNetwork.djikstra('cc29', 'cc1')).toBe(4);
    });
    test('Tanah Merah to Expo', () => {
      expect(trainNetwork.djikstra('ew4', 'cg1')).toBe(1);
    });
    test('Bedok to Expo', () => {
      expect(trainNetwork.djikstra('ew5', 'cg1')).toBe(2);
    });
    test('Sembawang to Yio Chu Kang', () => {
      expect(trainNetwork.djikstra('ns11', 'ns15')).toBe(4);
    });
    test('Bayfront to Promenade', () => {
      expect(trainNetwork.djikstra('ce1', 'cc4')).toBe(1);
    });
    test('Harbourfront to Harbourfront', () => {
      expect(trainNetwork.djikstra('cc29', 'cc29')).toBe(0);
    });
    test('Tuas Link to Tuas Link', () => {
      expect(trainNetwork.djikstra('ew33', 'ew33')).toBe(0);
    });
    test('Clementi to Clementi', () => {
      expect(trainNetwork.djikstra('ew23', 'ew23')).toBe(0);
    });
    test('Choa Chu Kang to Bukit Panjang', () => {
      expect(trainNetwork.djikstra('ns4', 'dt1')).toBe(5);
    });
    test('Yew Tee to Cashew', () => {
      expect(trainNetwork.djikstra('ns5', 'dt2')).toBe(7);
    });
    test('Bras Basah to Marymount', () => {
      // ccl to dhoby, ewl -> dtl -> tel then ccl
      expect(trainNetwork.djikstra('cc2', 'cc16')).toBe(6);
    });
    test('Tan Kah Kee to Ubi', () => {
      expect(trainNetwork.djikstra('dt8', 'dt27')).toBe(10);
    });
    test('Esplanade to Farrer Road', () => {
      // ccl to dhoby, ewl -> dtl then ccl
      expect(trainNetwork.djikstra('cc3', 'cc20')).toBe(7);
    });
    test('Bayfront to Farrer Road', () => {
      expect(trainNetwork.djikstra('ce1', 'cc20')).toBe(8);
    });
    test('Joo Koon to Damai', () => {
      expect(trainNetwork.djikstra('ew29', 'pe7')).toBe(22);
    });
    test('Changi Airport to Woodlands North', () => {
      expect(trainNetwork.djikstra('cg2', 'te1')).toBe(21);
    });
  });

  tests.forEach((data) => {
    test(data.id, () => {
      let ansTo = trainNetwork.dfs(data.src, data.dest);
      let ansFo = trainNetwork.dfs(data.dest, data.src);
      expect(ansTo).hasArray(data.musthaveroute);
      expect(ansFo).hasArray(data.musthaveroute.reverse());
      console.log(data.id, data.type, ansTo.length, ansFo.length);
    });
  })
}

testAll();