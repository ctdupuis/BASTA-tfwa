import React from "react";

import ReactDOM from "react-dom"

import { Formik, Field, Form } from "formik";

import { gql, useMutation } from '@apollo/client'
import { Input } from "reactstrap";

//const AddTenant: React.FC = () => (<div >I AM A DIV</div>);

// Credit to the Formik documentation - this was largely copied from an example there

function ValidatePhoneNumber(number: any) {
    let error;
    if(!number) {
        error = "Please enter your cell phone number. ";
    }
    if(!/^[2-9][0-9]{9}/.test(number)) {
        error = "Please make sure to enter your 10-digit cell phone number, without hyphens or parentheses. "
    }
}

const AddTenant = () => {
    // Copied largely from the Apollo and GraphQL documentation
    const ADD_TENANT_MUT = gql`
        mutation AddTenantMut($type: String!) {
            addTM(type: $type) {
                id
                type
            }
        }
    `;

    const [addTM, { data }] = useMutation(ADD_TENANT_MUT);

    return (
    <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            addressLn1: '',
            addressLn2: '',
            city: '',
            state: '',
            zip: '',
            bldgName: '',
            phoneNumber: ''
        }}
        onSubmit={async values => {
            addTM({ variables: { type: String } });

            await new Promise(r => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        }}>
        <Form>
            <label htmlFor="firstName">*First Name:</label>
            <Field id="firstName" name="firstName" />
            <br></br>
            <label htmlFor="lastName">*Last Name:</label>
            <Field id="lastName" name="lastName" />
            <br></br>
            <label htmlFor="addressLn1">*Address Line 1:</label>
            <Field id="addressLn1" name="addressLn1" />
            <br></br>
            <label htmlFor="addressLn2">Address Line 2:</label>
            <Field id="addressLn2" name="addressLn2" />
            <br></br>
            <label htmlFor="city">*City:</label>
            <Field id="city" name="city" />
            <br></br>
            <label htmlFor="state">*State:</label>
            <Field id="state" name="state" />
            <br></br>
            <label htmlFor="zip">*Zip Code:</label>
            <Field id="zip" name="zip" />
            <br></br>
            <label htmlFor="bldgName">Building Name:</label>
            <Field id="bldgName" name="bldgName" />
            <br></br>
            <label htmlFor="phoneNumber">*Cell Phone Number:</label>
            <Field id="phoneNumber" name="phoneNumber" />
            <br></br>
            <button>Click Here to Submit</button>
        </Form>
    </Formik>
)};

ReactDOM.render(<AddTenant />, document.getElementById('root'));

export default AddTenant;