import { useEffect, useState } from 'react';

declare interface StationSelectProps {
  source: string;
  destination: string;
  routes: string;
  cost: string;
  reset: Function;
  traverse: Function;
}

export default function StationSelect(props: StationSelectProps) {
  const [greeting, setGreeting] = useState('');
  const [instruction, setInstruction] = useState('');

  const instructions = [
    "Where are you now?",
    "Where are you going?",
    "Find the best route ",
  ]

  useEffect(() => {
    if(props.source == '') setInstruction(instructions[0]);
    else if(props.destination == '') setInstruction(instructions[1]);
    else setInstruction(instructions[2] + ' from ' + props.source + ' to ' + props.destination + '!');
  }, [props])
  
  useEffect(() => {
    var now : Date = new Date();
    var time: number = now.getHours();
    if(time >= 5 && time < 12) {
      setGreeting('Good Morning! Where would you like to go?');
    } else if(time >= 12 && time < 17) {
      setGreeting('Good Afternoon! Where are you heading to?');
    } else if(time >= 17 && time < 23) {
      setGreeting('Good Evening! Almost done for the day! Where are you going?');
    } else {
      setGreeting('The last train has probably left. Good night!')
    }
  }, [])

  return (
    <>
      <h2>{greeting}</h2>
      <p>{instruction}</p>
      <div className="from-to-div">
        <span>I&apos;m going from </span>
        <input type="text" value={props.source} readOnly></input>
        <span> to </span>
        <input type="text" value={props.destination} readOnly></input>
      </div>
      {props.routes && props.routes != '' && <p>{props.routes} routes found and total cost is {props.cost}</p>}
      <div>
        <button className="btn btn-primary me-3" type="button" onClick={() => {props.traverse()}}>See all routes</button>
        <button className="btn btn-primary" type="reset" onClick={() => {props.reset()}}>reset</button>
      </div>
    </>
  )
}