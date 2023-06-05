import React from "react";

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
        <div className="country-selector">
            {countries.map((country, index) => {
                return (
                    <div
                        ref={(el) => { refs[index] = el!; }}
                        key={index}
                        className={"country" + (index === 0 ? " selected" : "")}
                        onClick={() => {
                            selectionChanged(country);

                            // add the class selected to the currently selected country
                            refs.forEach((ref, i) => {
                                if (i === index) {
                                    ref.classList.add("selected");
                                } else {
                                    ref.classList.remove("selected");
                                }
                            });

                        }}
                    >
                        <p>
                            <span style={{ fontWeight: "bold" }}> {country.name} </span>
                            <span style={{ display: "block" }}> Humidity: {country.averageHumidity}% </span>
                            <span style={{ display: "block" }}>Visibility: {country.averageVisibility}km</span>
                        </p>
                    </div>
                )
            })}
        </div>
    )

}

export type { Country };