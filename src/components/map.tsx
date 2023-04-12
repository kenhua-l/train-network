import { FormEvent, useState } from 'react';

export default function Map() {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  
  async function getAddress(e : FormEvent) {
    e.preventDefault();
    var url = 'https://developers.onemap.sg/commonapi/search?searchVal=' + postcode + '&returnGeom=Y&getAddrDetails=Y';
    const res = await fetch(url);
    const ans = await res.json();
    var add = ans?.results ? ans.results[0]?.ADDRESS : '';
    setAddress(add);
  }

  return (
    <>
      <div>
        <h1>hello</h1>
        <form onSubmit={(e) => getAddress(e)}>
          <label>
            Postcode:  
            <input type="text" name="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)}></input>
          </label>
        </form>
        <p>{address}</p>
        
      </div>
    </>
  )
}


