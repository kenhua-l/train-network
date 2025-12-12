import Head from 'next/head'
import Link from 'next/link'
import mapSvg from '../assets/map.svg';
import Image from 'next/image';

export default function Map() {
  return (
    <>
      <Head>
        <title>Map</title>
        <meta name="description" content="New Map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <p><Link href="/">Home</Link></p>
        <main>
          <h1>Map</h1>
          <Image src={mapSvg} alt="map" layout="responsive" />
        </main>
      </div>
    </>
  )
}
