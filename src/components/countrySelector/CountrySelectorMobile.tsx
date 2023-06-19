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
        </div >
    )

}

export type { Country };