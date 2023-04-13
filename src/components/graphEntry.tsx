import Select from 'react-select';
import { fetchData } from '@/api/utilities';
import { FormEvent, useEffect, useState } from 'react';

enum Lines {
  ccl, ewl, nsl, nel, dtl, tel, bplrt, sklrt, pglrt 
}

interface StationDataElements extends HTMLFormControlsCollection {
  stationId: HTMLInputElement;
  lines: HTMLInputElement;
  neighbors: HTMLInputElement;
}

interface StationDataForm extends HTMLFormElement {
  readonly elements: StationDataElements;
}

export default function GraphEntry({ enterData }: {[key:string]:Function}) {
  const lineList = Object.keys(Lines).filter((v) => isNaN(Number(v))).map((index, line) => {
    return { value: line, label: index };
  });
  const stationNamesDataFile = '../data/trainmap/train-codename.json';
  const [stationNamesList, setStationNames] = useState<{[key:string]:string}[]>([]);
  const [lines, setLines] = useState<string>('');
  const [neighbors, setNeighbors] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function getNames() {
    var data = await fetchData(stationNamesDataFile);
    var names = [];
    for(let [value, label] of Object.entries(data)) {
      names.push({ value: value, label: label as string});
    }
    setStationNames(names);
  }

  useEffect(() => {
    getNames();
  }, [])

  function handleSubmit(event: FormEvent<StationDataForm>) {
    event.preventDefault();
    // check
    let form = event.currentTarget.elements;
    let id = form.stationId.value;
    let split = neighbors.split(', ');
    if(split.includes(id)) setError('station cannot be its own neightbor');
    let data = {
      'stationId': id,
      'lines': lines,
      'neighbors': neighbors
    }
    enterData(data);
    form.stationId.value = '';
  }

  return (
    <>
      <form className="row g-3 pt-5" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <div className="row">
            <label className="col-sm-2 col-form-label col-form-label-sm">Station ID</label>
            <div className="col-sm-10">
              <input type="text" name="stationId" className="form-control form-control-sm" required></input>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row">
            <label className="col-sm-2 col-form-label col-form-label-sm">Lines</label>
            <div className="col-sm-10">
              <Select 
                instanceId="lineSelect"
                isMulti
                required
                name="lines"  
                className="form-control form-control-sm" 
                options={lineList} 
                onChange={(e) => {
                  var values = e.map((item, i) => {
                    return item.label;
                  });
                  setLines(values.join(', '));
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-sm">Neighbors</label>
            <div className="col-sm-10">
              <Select 
                instanceId="stationSelect"
                isMulti
                required
                name="neighbors" 
                className="form-control form-control-sm"
                options={stationNamesList}
                onChange={(e) => {
                  var values = e.map((item, i) => {
                    return item.value;
                  });
                  setNeighbors(values.join(', '));
                }}
              />
            </div>
          </div>
        </div>
        <p className="text-danger">{error}</p>
        <div className="col-md-3 align-self-end">
          <button type="submit" className="btn btn-primary">Enter Station</button>       
        </div>
      </form>
      
    </>
  )
}
