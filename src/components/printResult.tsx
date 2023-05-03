import React, { useEffect, useRef, useState } from "react";

type Result = {
  data: string[][][];
  list: {[key:string]: string};
  source: string;
  destination: string;
  onClose: Function;
  open: boolean;
}

type AccordionProps = {
  path: string[];
  instructions: string[];
  open: boolean;
  color: string[];
}

const lineColors:{[key:string]: string} = {
  ccl: '#fa9e0d',
  ewl: '#009645',
  nsl: '#d42e12',
  nel: '#9900aa',
  dtl: '#005ec4',
  tel: '#784008',
  lrt: '#999999'
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
            <div key={i} className="line-pill" style={{background:lineColors[line]}}>{line.toUpperCase()}</div>
            {i !== props.color.length - 1 ? React.createElement('span', { dangerouslySetInnerHTML: { __html: '&bull;&bull;&bull;' }}) : ''}
          </React.Fragment>
        ))}
        <div>
          {props.path.join(' -> ')}
        </div>
        <div className={`panel-close ${open ? 'open' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div ref={content} className={`panel-content ${open ? 'open' : ''}`} style={{maxHeight:height}}>
        <div className="py-3">
          <ol>
            {props.instructions.map((ins, i) => (
              <li key={i}>{ins}</li>
            ))}
          </ol>
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
    let ins: string[] = [];
    
    let currLine = lines[0];
    let startStation = props.list[stations[0]];
    let endStation = '';
    let signalChange = false;
    for(let i=1; i<lines.length; i++) {
      if(lines[i] != currLine) {
        endStation = props.list[stations[i]];
        ins.push('Take the ' + currLine.toUpperCase() + ' from ' + startStation + ' to ' + endStation);
        currLine = lines[i];
        startStation = props.list[stations[i]];
        signalChange = true;
      }
      if(signalChange) {
        ins.push('Then change line to ' + currLine.toUpperCase());
        signalChange = false;
      }
    }
    endStation = props.list[stations[stations.length-1]];
    ins.push('Take the ' + currLine.toUpperCase() + ' from ' + startStation + ' to ' + endStation);

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
    </div>
  )
}