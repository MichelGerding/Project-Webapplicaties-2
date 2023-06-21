import React from "react";

import styles from "./CountrySelector.module.css"


type Country = {
    name: string,
    defaultCenter: { lat: number, lng: number },
    defaultZoom: number,
    averageHumidity: number,
    averageVisibility: number,
}

type CountrySelectorProps = {
    countries: Country[],
    selectionChanged: (country: Country) => void,
}

export default function CountrySelector({ countries, selectionChanged }: CountrySelectorProps) {

    const refs: HTMLDivElement[] = [];

    return (
        <div className={styles.countrySelector}>
            {countries.map((country, index) => {
                return (
                    <div
                        ref={(el) => { refs[index] = el!; }}
                        key={index}
                        style={{
                            cursor: "pointer",
                        }}
                        className={index === 0 ? styles.selected : ""}
                        onClick={() => {
                            selectionChanged(country);

                            // add the class selected to the currently selected country
                            refs.forEach((ref, i) => {
                                if (i === index) {
                                    ref.classList.add(styles.selected);
                                } else {
                                    ref.classList.remove(styles.selected);
                                }
                            });

                        }}
                    >
                        <span className={styles.countryName}> {country.name} </span>
                        <span className={styles.countrySubtitle}> Humidity: {country.averageHumidity}% </span>
                        <span className={styles.countrySubtitle}>Visibility: {country.averageVisibility}km</span>
                    </div>
                )
            })}
        </div >
    )

}

export type { Country };