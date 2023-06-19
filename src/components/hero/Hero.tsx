import CountrySelector, { Country } from "@/components/countrySelector/CountrySelector";
import CountrySelectorMobile from "@/components/countrySelector/CountrySelectorMobile";
import Map from "@/components/Map";

import styles from "./Hero.module.css"
import Leaderboard from "../Leaderboard/Leaderboard";


type HeroProps = {
    countries: any,
    data: any,
    country: any,
    setCountry: any,
    setCenter: any,
}


export default function Hero({
    countries,
    data,
    country,
    setCountry,
    setCenter,
}: HeroProps) {
    return (
        <>
            <div className={styles.GIWrapper}>
                <h1 className={styles.GI}> General information</h1>
                <CountrySelectorMobile
                    countries={countries}
                    selectedCountry={country}
                    selectionChanged={(country: Country) => {
                        setCenter(country.defaultCenter);
                        setCountry(country);
                    }} />

            </div>
            <div className={styles.hero}>
                <CountrySelector
                    countries={countries}
                    selectionChanged={(country: Country) => {
                        setCenter(country.defaultCenter);
                        setCountry(country);
                    }} />

                <Map
                    data={data[country.name as any]}
                />
                <Leaderboard data={data[country.name as any]} country={country.name} />
            </div>
        </>
    )
}