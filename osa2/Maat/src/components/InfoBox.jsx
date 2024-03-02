const InfoBox = ({name, capital, area, languages, img, alt}) => (
    <>
        <Name name={name}/>
        <Capital capital={capital}/>
        <Area area={area}/>
        <LanguageBox languages={languages}/>
        <Flag img={img} alt={alt}/>
    </>
)

const Name = ({name}) => <h1>{name}</h1>

const Capital = ({capital}) => <div>Capital {capital}</div>

const Area = ({area}) => <div>Area {area}</div>

const LanguageBox = ({languages}) => (
    <>
        <h3>Languages:</h3>
        <ul>
            {Object.values(languages).map((language, i) => 
                <li key={i}>{language}</li>)}
        </ul>
    </>
) 

const Flag = ({img, alt}) => <img src ={img} alt={alt} height="20%"/>

export default InfoBox