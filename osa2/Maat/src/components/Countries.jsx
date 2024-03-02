import InfoBox from "./InfoBox"
import ShowButton from "./ShowButton"

const Countries = ({countries, setSearch}) => {
    const length = countries.length

    if (length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (length === 1) { 
        const country = countries[0]

        return (
            <InfoBox 
                name={country.name.common} 
                capital={country.capital} 
                area={country.area}
                languages={country.languages}
                img={country.flags.png}
                alt={country.flags.alt}
            />
        )
    } else {
        return (
            <div>{
                countries.map((country, id) => 
                    <Country key={id} name={country.name.common} onClick={setSearch}/>
            )}</div>
        )
    }
}

const Country = ({name, onClick}) => <div>{name} <ShowButton name={name} onClick={onClick}/></div>

export default Countries