import FormInput from "./FormInput"
  
const AddContactForm = (props) => {
return (
    <form onSubmit={props.addContactHandler}>
    <FormInput text={"name: "} value={props.nameValue} onChange={props.nameOnChange} />
    <FormInput text={"number: "} value={props.NumberValue} onChange={props.numberOnChange} />
    <div>
        <button type="submit">add</button>
    </div>
    </form>
)}

export default AddContactForm