import { useState } from "react";
import Header from "../Components/Header";
import "../CSS/Form.css";

function Form() {
  const [branches, setBranches] = useState([
  {
    id: 1,
    branch_code: "",
    approved_intake: "",
    course_start_year: "",
    nba_accredited: "",
    valid_year: ""
  }
]);
  
const initialForms = {
  essentials:[
    {id:1,field_name:"college_code",label:"College Code",value:"",editing:false},
    {id:2,field_name:"college_name",label:"College Name",value:"",editing:false}
  ],
  college: [
    { id: 1, field_name: "principal", label: "Dean/Principal", value: "", editing: false },
    { id: 2, field_name: "address", label: "Address", value: "", editing: false },
    { id: 3, field_name: "taluk", label: "Taluk", value: "", editing: false },
    { id: 4, field_name: "district", label: "District", value: "", editing: false },
    { id: 5, field_name: "pincode", label: "Pincode", value: "", editing: false },
    { id: 6, field_name: "phone", label: "Phone/Fax", value: "", editing: false },
    { id: 7, field_name: "email", label: "Email-ID", value: "", editing: false },
    { id: 8, field_name: "website", label: "Website", value: "", editing: false },
    { id: 9, field_name: "anti_ragging", label: "Anti-Ragging Phone No", value: "", editing: false },
    { id: 10, field_name: "placement", label: "Placement", value: "", editing: false },
  ],

  bank: [
    { id: 1, field_name: "bank_account", label: "Bank A/c No", value: "", editing: false },
    { id: 2, field_name: "bank_name", label: "Bank Name", value: "", editing: false },
    { id: 3, field_name: "ifsc", label: "IFSC Code", value: "", editing: false },
    { id: 4, field_name: "distance_hq", label: "Distance in KMS from Dist. HQ", value: "", editing: false },
    { id: 5, field_name: "railway_station", label: "Nearest Railway Station", value: "", editing: false },
    { id: 6, field_name: "distance_station", label: "Distance in KMS from Nearest Railway Station", value: "", editing: false },
    { id: 7, field_name: "minority", label: "Minority Status", value: "", editing: false },
    { id: 8, field_name: "autonomous", label: "Autonomous Status", value: "", editing: false },
  ],

  hostel: [
    { id: 1, field_name: "accommodation", label: "Accommodation Available for UG", boys: "", girls: "", editing: false },
    { id: 2, field_name: "permanent_rental", label: "Permanent or Rental (P/R)", boys: "", girls: "", editing: false },
    { id: 3, field_name: "mess_type", label: "Type of Mess (Veg/NV)", boys: "", girls: "", editing: false },
    { id: 4, field_name: "mess_bill", label: "Mess Bill (Per annum)", boys: "", girls: "", editing: false },
    { id: 5, field_name: "room_rent", label: "Room Rent (Per annum)", boys: "", girls: "", editing: false },
    { id: 6, field_name: "electricity", label: "Electricity Charges (Per annum)", boys: "", girls: "", editing: false },
    { id: 7, field_name: "caution", label: "Caution Deposit", value: "", editing: false },
    { id: 8, field_name: "establishment", label: "Establishment Charges", value: "", editing: false },
    { id: 9, field_name: "admission", label: "Admission Fees", value: "", editing: false },
    { id: 10, field_name: "transport", label: "Transport Facilities (Y/N)", value: "", editing: false },
    { id: 11, field_name: "min_transport", label: "Min Transport Charges (Per annum)", value: "", editing: false },
    { id: 12, field_name: "max_transport", label: "Max Transport Charges (Per annum)", value: "", editing: false },
  ],

  department: []
};

  const [forms, setForms] = useState(initialForms);
  

  // Toggle Edit
  const toggleEdit = (section, id) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id ? { ...field, editing: !field.editing } : field,
      ),
    }));
  };

  // Update Label
  const updateLabel = (section, id, newLabel) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id ? { ...field, label: newLabel } : field,
      ),
    }));
  };

  // Update Value
  const updateValue = (section, id, value) => {
    setForms((prev) => ({
      ...prev,
      [section]: prev[section].map((field) =>
        field.id === id ? { ...field, value } : field,
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

  const addBranch = () => {
  setBranches([
    ...branches,
    {
      id: Date.now(),
      branch_code: "",
      approved_intake: "",
      course_start_year: "",
      nba_accredited: "",
      valid_year: ""
    }
  ]);
};

const deleteBranch = (id) => {
  setBranches(
    branches.filter(
      branch => branch.id !== id
    )
  );
};

const updateBranch = (
  id,
  field,
  value
) => {

  setBranches(
    branches.map(branch =>
      branch.id === id
        ? {
            ...branch,
            [field]: value
          }
        : branch
    )
  );
};

  // Submit
  const submitForm = async () => {
  const formData = {
    ...forms,
    department: branches,
  };

  console.log(formData);

  try {
    const response = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


   const data = await response.json();
   console.log(data);
   const clgcode = data.code;


    alert("Form Submitted");
    window.location.href = `http://localhost:5000/api/booklet/download/${data.code}`;
    alert("PDF GENERATEd");

    // setForms(initialForms);

    setBranches([
      {
        id: 1,
        branch_code: "",
        approved_intake: "",
        course_start_year: "",
        nba_accredited: "",
        valid_year: "",
      },
    ]);
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
                onChange={(e) => updateLabel(section, field.id, e.target.value)}
              />
            ) : (
              <label>{field.label}</label>
            )}

            <button
              className="edit-btn"
              onClick={() => toggleEdit(section, field.id)}
            >
              {field.editing ? "Save" : "Edit"}
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteField(section, field.id)}
            >
              Delete
            </button>
          </div>

          <input
            type="text"
            placeholder={`Enter ${field.label}`}
            value={field.value}
            onChange={(e) => updateValue(section, field.id, e.target.value)}
          />
        </div>
      ))}

      <button className="add-btn" onClick={() => addField(section)}>
        Add Field
      </button>
    </div>
  );

  return (
    <div>
      <Header />
      {renderSection("COLLEGE IDENTITY","essentials")}
    
      {renderSection("COLLEGE DETAILS", "college")}

      {renderSection(
        "HOSTEL DETAILS",
        "hostel"
      )}
      {renderSection("BANK DETAILS", "bank")}

      <div className="section">

  <h2>BRANCH DETAILS</h2>

  <table>

    <thead>
      <tr>
        <th>Branch Code</th>
        <th>Approved Intake</th>
        <th>Course Start Year</th>
        <th>NBA Accredited</th>
        <th>Valid Year</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>

      {branches.map(branch => (

        <tr key={branch.id}>

          <td>
            <input
              value={branch.branch_code}
              onChange={(e) =>
                updateBranch(
                  branch.id,
                  "branch_code",
                  e.target.value
                )
              }
            />
          </td>

          <td>
            <input
              type="number"
              value={branch.approved_intake}
              onChange={(e) =>
                updateBranch(
                  branch.id,
                  "approved_intake",
                  e.target.value
                )
              }
            />
          </td>

          <td>
            <input
              type="number"
              value={branch.course_start_year}
              onChange={(e) =>
                updateBranch(
                  branch.id,
                  "course_start_year",
                  e.target.value
                )
              }
            />
          </td>

          <td>
            <select
              value={branch.nba_accredited}
              onChange={(e) =>
                updateBranch(
                  branch.id,
                  "nba_accredited",
                  e.target.value
                )
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </td>

          <td>
            <input
              type="number"
              value={branch.valid_year}
              onChange={(e) =>
                updateBranch(
                  branch.id,
                  "valid_year",
                  e.target.value
                )
              }
            />
          </td>

          <td>
            <button
              onClick={() =>
                deleteBranch(branch.id)
              }
            >
              Delete
            </button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

  <button onClick={addBranch}>
    Add Branch
  </button>

</div>

      <button className="submit-btn" onClick={submitForm}>
        Submit Form
      </button>
    </div>
  );
}

export default Form;
