import React from "react";

import styles from "./CountrySelectorMobile.module.css"
import Select from 'react-select';

type Country = {
    name: string,
    defaultCenter: { lat: number, lng: number },
    defaultZoom: number,
    averageHumidity: number,
    averageVisibility: number,
}

type CountrySelectorProps = {
    countries: Country[],
    selectedCountry: Country,
    selectionChanged: (country: Country) => void,
}

export default function CountrySelectorMobile({ countries, selectionChanged, selectedCountry }: CountrySelectorProps) {

    const refs: HTMLDivElement[] = [];
    const selected = selectedCountry ?? countries[0];

    const options = countries.map((country) => {
        return {
            value: country,
            label: country.name
        }
    });


    return (
        <div className={styles.countrySelector}>
            <Select
                className={styles.select}
                defaultValue={options[0]}
                options={options}
                onChange={(e) => {
                    if (e == null) {
                        return;
                    }
                    selectionChanged(e.value)
                }} />
            {/* {countries.map((country, index) => {
                return (
                    <div
                        ref={(el) => { refs[index] = el!; }}
                        key={index}
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
            })} */}
        </div >
    )

}

export type { Country };