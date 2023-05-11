import FormInput from "./FormInput"

const FilterForm = (props) => {
    return (
      <form>
        <FormInput text={props.text} value={props.filterValue} onChange={props.filterOnChange} />
      </form>
    )
}

export default FilterForm