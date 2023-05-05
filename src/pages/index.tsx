import Head from 'next/head'
import Link from 'next/link'
import MapContainer from '../containers/mapContainer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Public Transport Calculator</title>
        <meta name="description" content="Find the best route in the train network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <p><Link href="/graph-builder">Graph Builder (for graph development manual entry)</Link></p>
        <main>
          <h1>Train Map</h1>
          <MapContainer />
        </main>
      </div>
    </>
  )
}
