import { useState } from "react";
import Header from "../Components/Header";
import '../CSS/Form.css'

function Form() {
  const initialForms = {
    college: [
      {
        id: 1,
        field_name: "name",
        label: "Name",
        value: "",
        editing: false,
      },
      {
        id: 2,
        field_name: "email",
        label: "Email",
        value: "",
        editing: false,
      },
    ],

    hostel: [
      {
        id: 1,
        field_name: "room_no",
        label: "Room No",
        value: "",
        editing: false,
      },
    ],

    department: [
      {
        id: 1,
        field_name: "department_name",
        label: "Department Name",
        value: "",
        editing: false,
      },
    ],
  };

  const [forms, setForms] = useState(initialForms);

  // Toggle Edit
  const toggleEdit = (section, id) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id
          ? { ...field, editing: !field.editing }
          : field
      ),
    }));
  };

  // Update Label
  const updateLabel = (section, id, newLabel) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id
          ? { ...field, label: newLabel }
          : field
      ),
    }));
  };

  // Update Value
  const updateValue = (section, id, value) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id
          ? { ...field, value }
          : field
      ),
    }));
  };

  // Add Field
  const addField = (section) => {
    const fieldCount = forms[section].length + 1;

    const newField = {
      id: Date.now(),
      field_name: `field_${fieldCount}`,
      label: `Field ${fieldCount}`,
      value: "",
      editing: false,
    };

    setForms((prev) => ({
      ...prev,
      [section]: [...prev[section], newField],
    }));
  };

  // Delete Field
  const deleteField = (section, id) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].filter(
        (field) => field.id !== id
      ),
    }));
  };

  // Submit
  const submitForm = async () => {
    console.log(forms);

    try {
      const response = await fetch(
        "http://localhost:5000/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forms),
        }
      );

      const data = await response.json();

      console.log(data);
      alert("Form Submitted");

      setForms(initialForms);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSection = (title, section) => (
    <div className="section">
      <h2>{title}</h2>

      {forms[section].map((field) => (
        <div key={field.id} className="field-card">

          <div className="label-section">

            {field.editing ? (
              <input
              className="input"
                value={field.label}
                onChange={(e) =>
                  updateLabel(
                    section,
                    field.id,
                    e.target.value
                  )
                }
              />
            ) : (
              <label>{field.label}</label>
            )}

            <button
            className="edit-btn"
              onClick={() =>
                toggleEdit(section, field.id)
              }
            >
              {field.editing ? "Save" : "Edit"}
            </button>

            <button
            className="delete-btn"
              onClick={() =>
                deleteField(section, field.id)
              }
            >
              Delete
            </button>
          </div>

          <input
            type="text"
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChange={(e) =>
              updateValue(
                section,
                field.id,
                e.target.value
              )
            }
          />
        </div>
      ))}

      <button
      className="add-btn"
        onClick={() => addField(section)}
      >
        Add Field
      </button>
    </div>
  );

  return (
    <div>
      <Header/>
      {renderSection(
        "COLLEGE DETAILS",
        "college"
      )}

      {renderSection(
        "HOSTEL DETAILS",
        "hostel"
      )}

      {renderSection(
        "DEPARTMENT DETAILS",
        "department"
      )}

      <button
      className="submit-btn" onClick={submitForm}>
        Submit Form
      </button>
    </div>
  );
}

export default Form;