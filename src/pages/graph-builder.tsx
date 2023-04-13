import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.scss'
import TrainMap from '@/components/trainMap';
import GraphForm from '@/containers/graphForm';

export default function GraphBuilder() {
  return (
    <>
      <Head>
        <title>Graph Builder</title>
        <meta name="description" content="Build the graph network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <p><Link href="/">Home</Link></p>
        <main className={styles.main}>
          <h1>Graph Builder</h1>
          <GraphForm />
          <div className="half-page">
            <TrainMap />
          </div>
        </main>
      </div>
    </>
  )
}
