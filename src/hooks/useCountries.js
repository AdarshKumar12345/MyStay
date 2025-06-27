import countries from "world-countries";


const allCountries =  countries.map(country => ({
    label : country.name.common,
    value : country.cca2,
    flag : country.flag.svg,
    region :country.region,
    latlang : country.latlng,


}))

export default  function useCountries(){
    const getAll = ()=>{
        return allCountries
    }
    const getByValue =(value) =>{
        return allCountries.find(items => items.value === value);
    }

    return {
        getAll,
        getByValue
    }
}
