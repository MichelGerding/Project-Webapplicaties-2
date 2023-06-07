import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import Head from 'next/head'
import { Inter } from 'next/font/google'

import styles from '@/styles/Home.module.css'

import Map from "@/components/Map";
import SessionInfo from "@/components/Auth/SessionInfo";
import CountrySelector, { Country } from "@/components/CountrySelector";
import Leaderboard from "@/components/Leaderboard";
import Chart from "@/components/Chart";


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
        console.log(countries)

      });
  }, [])

  if (
    !(session && session.data && session.data.user &&
      session.status === "authenticated")) {
    return (
      <>
        <SessionInfo session={session.data!} />
        <p>Not logged in</p>
      </>
    )
  }

  if (data == null || data.length === 0) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <SessionInfo session={session.data!} />
          <p>Loading...</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <SessionInfo session={{ user: session.data?.user, expires: session.data!.expires }} />
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
        <Leaderboard data={data[country.name as any]} />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, calc(600px + 2rem))",
          gridGap: "1rem",
          width: "100%",
        }}>

          {data[country.name as any].map((location: any) => {
            return (
              <div style={{ background: "#F6FCF7", padding: "1rem" }}>
                <h2> {location.Location}</h2>
                <h3> Humidity </h3>
                <Chart
                  chartName="Humidity"
                  data={location.measurements.map((d: any) => {
                    return {
                      x: d.Date,
                      y: d.humidity
                    }
                  })}
                  xType="date"
                  yType="%"
                />

                <h3> Visibility </h3>
                <Chart
                  chartName="Visibility"
                  data={location.measurements.map((d: any) => {
                    return {
                      x: d.Date,
                      y: d.visib
                    }
                  })}
                  xType="date"
                  yType="km"
                />
              </div>
            )
          })}
        </div>


      </main>
    </>

  );
}
