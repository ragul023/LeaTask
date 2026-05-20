import { useState } from "react";
import "../CSS/Form.css";
import Header from "../Components/Header";

function Form() {
  const [fields, setFields] = useState([
    {
      id: 1,
      field_name: "name",
      label: "Name",
      value: "",
      editing: false
    },
    {
      id: 2,
      field_name: "email",
      label: "Email",
      value: "",
      editing: false
    }
  ]);

  // To enablwe edit mode
  const toggleEdit = (id) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              editing: !field.editing
            }
          : field
      )
    );
  };

  // Update the name of the label
  const updateLabel = (id, newLabel) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              label: newLabel
            }
          : field
      )
    );
  };

  // Update the input value
  const updateValue = (id, newValue) => {
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              value: newValue
            }
          : field
      )
    );
  };

  // to add new feild
  const addField = () => {

    const fieldCount = fields.length + 1;

    const newField = {
      id: Date.now(),
      

      field_name: `field_${fieldCount}`,

      label: `Field ${fieldCount}`,

      value: "",

      editing: false
    };

    setFields([...fields, newField]);
  };

  // used to delete feild
  const deleteField = (id) => {
    setFields(
      fields.filter(
        (field) => field.id !== id
      )
    );
  };

  // MOck Backend api
  const submitForm = async () => {

    console.log(fields);

    try {

      const response = await fetch(
        "http://localhost:5000/api/submit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(fields)
        }
      );

      const data =
        await response.json();

      console.log(data);

      alert("Form Submitted");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>

    <Header/>

      {fields.map((field) => (
        <div
          key={field.id}
          className="field-card"
        >

          {/* //for the label section  */}
          <div className="label-section">

            {field.editing ? (
              <input
                className="label-input"
                value={field.label}
                onChange={(e) =>
                  updateLabel(
                    field.id,
                    e.target.value
                  )
                }
              />
            ) : (
              <label className="label">
                {field.label}
              </label>
            )}

            <div className="btn-group">

              <button
                className="edit-btn"
                onClick={() =>
                  toggleEdit(field.id)
                }
              >
                {field.editing
                  ? "Save"
                  : "Edit"}
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteField(field.id)
                }
              >
                Delete
              </button>

            </div>

          </div>

          {/* to get the user input */}
          <input
            type="text"
            className="user-input"
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChange={(e) =>
              updateValue(
                field.id,
                e.target.value
              )
            }
          />

        </div>
      ))}

      {/* //buttons to add feilds */}
      <div className="bottom-buttons">

        <button
          className="add-btn"
          onClick={addField}
        >
          Add Field
        </button>
{/* //button to submit form */}
        <button
          className="submit-btn"
          onClick={submitForm}
        >
          Submit Form
        </button>

      </div>

   </>
  );
}

export default Form;