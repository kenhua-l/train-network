import React, { useEffect, useRef, useState } from "react";

type Result = {
  data: string[][][];
  list: {[key:string]: string};
  source: string;
  destination: string;
  onClose: Function;
  toggleOpen: Function;
  open: boolean;
  hasResult: boolean
}

type AccordionProps = {
  path: string[];
  instructions: (string|(string|string[])[])[];
  open: boolean;
  color: string[];
}

type InstructionsProps = {
  instructions: (string|(string|string[])[])[];
}

const lineColors:{[key:string]: string} = {
  ccl: '#fa9e0d',
  ewl: '#009645',
  nsl: '#d42e12',
  nel: '#9900aa',
  dtl: '#005ec4',
  tel: '#784008',
  lrt: '#999999',
  bplrt: '#999',
  sklrt: '#999',
  pglrt: '#999'
}

function Instructions(props: InstructionsProps) {
  function renderLineColorClass(ins: string) {
    let mat = ins.match(/\$.*\$/g);
    let line = mat ? mat[0].substring(1, mat[0].length-1) : '';
    return line;
  }

  function renderLine(ins: string) {
    let split = ins.split('$');
    return (
      <>
      {split.map((w, i) => {
        return i%2===1 ?
        (<React.Fragment key={i}><span className="line-pill pill" style={{background: lineColors[w], color: (w !== 'ccl' ? 'white' : 'black')}}>{w.toUpperCase()}</span> </React.Fragment>) : 
        (w);
      })}
      </>
    )
  }

  return (
    <ol>
      {props.instructions.map((ins, i) => {
        return (
          <li key={i}>{
            typeof ins === 'string' ? <p>{renderLine(ins)}</p> :
            typeof ins[0] === 'string' && typeof ins[1] === 'string' && Array.isArray(ins[2]) ? (<>
              <p>{renderLine(ins[1])}</p>
              <ul className={`line-list ${renderLineColorClass(ins[1])}`}>
                {ins[2].map((sub, j) => {
                  return (<li key={j}>{sub}</li>)
                })}
              </ul>
            </>) : (<></>)
          }</li>
        )
      })}
    </ol>
  )
}

function Accordion(props: AccordionProps) {
  const [open, setOpen] = useState(props.open);
  const [height, setHeight] = useState(0);
  const content = useRef<any>(null);

  useEffect(() => {
    setOpen(open);
    if(open) {
      setHeight(content.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open])

  function togglePanel() {
    if(open) {
      setOpen(false);
      setHeight(0);
    } else {
      setOpen(true);
      setHeight(content.current.scrollHeight);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head" onClick={() => togglePanel()}>
        {props.color.map((line, i) => (
          <React.Fragment key={i}>
            <div key={i} className="line-pill" style={{background:lineColors[line], color: (line !== 'ccl' ? 'white' : 'black')}}>{line.toUpperCase()}</div>
            {i !== props.color.length - 1 ? React.createElement('span', { dangerouslySetInnerHTML: { __html: '&bull;&bull;&bull;' }}) : ''}
          </React.Fragment>
        ))}
        <p className="mb-0 px-3">
          {props.path.length - 1} {props.path.length - 1 > 1 ? 'stations' : 'station'} away
        </p>
        <div className={`panel-close ${open ? 'open' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div ref={content} className={`panel-content ${open ? 'open' : ''}`} style={{maxHeight:height}}>
        <div className="py-3">
          <Instructions instructions={props.instructions} />
        </div>
      </div>
    </div>
  )
}

export default function PrintResult(props: Result) {
  function getColors(journey: string[]) {
    let condensed = [];
    let currentLine = journey[0];
    condensed.push(currentLine);
    for(let i=1; i<journey.length; i++) {
      if(journey[i] !== currentLine) {
        currentLine = journey[i];
        condensed.push(currentLine);
      }
    }
    return condensed;
  }

  function writeInstruction(lines: string[], stations: string[]) {
    let ins: (string|(string|string[])[])[] = [];
    
    let currLine = lines[0];
    let startIdx = 0;
    let endIdx = 0;
    let signalChange = false;
    let currLineStations = [];
    for(let i=1; i<=lines.length; i++) {
      currLineStations.push(props.list[stations[i]]);
      if(lines[i] != currLine) {
        endIdx = i;
        let sentence = 'Take the $' + currLine + '$ from ';
        sentence = sentence + props.list[stations[startIdx]] + ' to ' + props.list[stations[endIdx]];
        sentence = sentence + ' (' + (endIdx - startIdx) + (endIdx - startIdx  === 1 ? ' station' : ' stations') + ' away)';
        ins.push([currLine, sentence, currLineStations]);
        currLine = lines[i];
        startIdx = i;
        signalChange = true;
        currLineStations = [];
      }
      if(signalChange && i<lines.length) {
        let sentence = 'Then change line from $' + lines[i-1] + '$ to $' + currLine + '$';
        ins.push(sentence);
        signalChange = false;
      }
    }

    return ins;
  }

  return (
    <div className={`drawer ${props.open && 'open'}`}>
      <div className="close-icon" onClick={() => props.onClose()}>
        <span></span>
        <span></span>
      </div>
      <h3 className="pb-3 drawer-title">Here are some results for {props.source} to {props.destination}</h3>
      <div className="drawer-content">
        <ul className="panel-group">
          {props.data.map((path, i) => {
            var pathString = path[0].map((id) => {
              return props.list[id];
            })
            return (
              <li key={i}>
                <Accordion
                  open={i === 0}
                  path={pathString}
                  instructions={writeInstruction(path[1], path[0])}
                  color={getColors(path[1])}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {props.hasResult && 
        <div className="knob" onClick={() => props.toggleOpen()}>
          Click to {props.open ? 'hide' : 'see'} results {React.createElement('span', { dangerouslySetInnerHTML: { __html: props.open ? '&darr;' : '&uarr;' }})}
        </div>
      }
    </div>
  )
}