CREATE TABLE form_fields (

    id INT AUTO_INCREMENT PRIMARY KEY,

    submission_id INT,

    field_name VARCHAR(255),

    field_label VARCHAR(255),

    field_value TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);