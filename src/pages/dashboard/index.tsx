import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import Head from 'next/head'
import { Inter } from 'next/font/google'

import styles from '@/styles/index.module.css'

import Map from "@/components/Map";
import SessionInfo from "@/components/Auth/SessionInfo";
import CountrySelector, { Country } from "@/countrySelector/CountrySelector";
import Leaderboard from "@/components/Leaderboard/Leaderboard";


import HistoryWrapper from "@/components/history/historyWrapper";
import Navbar from "@/components/Navbar/navbar";



const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
  const session = useSession();

  let [countries, setCountries] = React.useState([] as Country[]);
  const [country, setCountry] = React.useState({} as Country);
  const [data, setData] = React.useState([] as any[]);
  const [center, setCenter] = React.useState(null as any);
  const [zoom, setZoom] = React.useState(null as any);

  useEffect(() => {
    fetch("/api/data.json")
      .then((res) => res.json())
      .then((data) => {

        countries = [];
        const dt: { [key: string]: any } = {};
        data.forEach((d: any) => {
          dt[d.country] = d.stations;

          // get the average humidity and visibility from the data
          let humiditySum = 0;
          let visibilitySum = 0;
          d.stations.forEach((location: any) => {
            humiditySum += location.measurements[0].humidity;
            visibilitySum += location.measurements[0].visib;
          });

          // round to 1 decimal
          humiditySum = Math.round((humiditySum / d.stations.length) * 10) / 10;
          visibilitySum = Math.round((visibilitySum / d.stations.length) * 10) / 10;

          countries.push({
            name: d.country,
            averageHumidity: humiditySum,
            averageVisibility: visibilitySum,
            defaultCenter: {
              lat: d.latitude,
              lng: d.longitude
            },
            defaultZoom: d.zoom ?? 6,
          } as Country);
        });

        setData(dt as any);
        setCenter(countries[0].defaultCenter);
        setCountry(countries[0]);
        setZoom(countries[0].defaultZoom);
        setCountries(countries);

      });
  }, [])

  if (
    !(session && session.data && session.data.user &&
      session.status === "authenticated")) {
    return (
      <>
        <p>Not logged in</p>
      </>
    )
  }


  const renderBody = () => {
    if (data == null || data.length === 0) {
      return <p> Loading... </p>
    } else {
      return (
        <div className={styles.mainRow}>
          <h1 className={styles.GI}> General inforation</h1>
          <div className={styles.hero}>
            <CountrySelector
              countries={countries}
              selectionChanged={(country: Country) => {
                setCenter(country.defaultCenter);
                setCountry(country);
                setZoom(country.defaultZoom);
              }} />

            <Map
              center={center}
              zoom={zoom}
              data={data[country.name as any]}
            />
            <Leaderboard data={data[country.name as any]} country={country.name} />
          </div>

          <HistoryWrapper data={data[country.name as any]} country={country.name} />

        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar logo="/logo.jpg" links={[]} />
      <main className={`${styles.main} ${inter.className}`}>
        {renderBody()}
      </main>
    </>

  );
}
