import useCountries from "@/hooks/useCountries";
import Select from 'react-select'
import Flag from "react-world-flags";
export default function CountrySelect({ onChange, value }) {
  const { getAll } = useCountries();

  return (
    <div className="w-full ">

        <Select
          placeholder="Select a country"
          options ={getAll()}
          value={value}
          isClearable
          isSearchable
          onChange={(value)=>{
            onChange(value)
          }}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-2">
              <Flag
                code={option.value}
                style={{ width: '24px', height: '24px' }}
                className="rounded-full"
              />
              <span>{option.label},{option.region}</span>
            </div>
          )}
          className="w-full"
          classNamePrefix="react-select"    
          />
          
    </div>

  );
}
// value = {value}
