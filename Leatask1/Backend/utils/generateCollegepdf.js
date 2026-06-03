const PDFDocument = require("pdfkit");

const generatePDF = (
  res,
  college_name,
  collegeCode,
  collegeDetails,
  bankdetails,
  hostelDetails,
  branchDetails
) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 20,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${collegeCode}.pdf`
  );

  doc.pipe(res);


  const PAGE_WIDTH = 595;
const MARGIN = 20;
const GAP = 15;

const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

const COLUMN_WIDTH =
  (CONTENT_WIDTH - GAP) / 2;

const LEFT_X = MARGIN;

const RIGHT_X =
  LEFT_X +
  COLUMN_WIDTH +
  GAP;

const TOP_Y = 70;

const TOP_TABLE_HEIGHT = 280;
const BOTTOM_TABLE_HEIGHT = 300;

  // ===========================
  // Helpers
  // ===========================

  function getTableFontSize(
  rows,
  labelWidth,
  valueWidth,
  maxHeight,
  startSize = 10,
  minSize = 6
) {
  let size = startSize;

  while (size >= minSize) {
    let totalHeight = 0;

    rows.forEach((row) => {

      const value =
        row.field_value ??
        row.single_value ??
        "";

      const labelHeight =
        doc.fontSize(size)
          .heightOfString(
            String(row.field_lable),
            {
              width: labelWidth - 8
            }
          );

      const valueHeight =
        doc.fontSize(size)
          .heightOfString(
            String(value),
            {
              width: valueWidth - 8
            }
          );

      totalHeight +=
        Math.max(
          labelHeight,
          valueHeight
        ) + 10;
    });

    if (totalHeight <= maxHeight) {
      return size;
    }

    size--;
  }

  return minSize;
}

  function getRowHeight(
  label,
  value,
  labelWidth,
  valueWidth,
  fontSize
) {

  const labelHeight =
    doc.fontSize(fontSize)
      .heightOfString(
        String(label),
        {
          width: labelWidth - 8
        }
      );

  const valueHeight =
    doc.fontSize(fontSize)
      .heightOfString(
        String(value),
        {
          width: valueWidth - 8
        }
      );

  return Math.max(
    24,
    Math.max(
      labelHeight,
      valueHeight
    ) + 10
  );
}

  function drawCell(
  x,
  y,
  width,
  height,
  text,
  fontSize = 9,
  align = "center"
) {

  doc.rect(x, y, width, height).stroke();

  const textHeight =
    doc.fontSize(fontSize)
      .heightOfString(
        String(text ?? ""),
        {
          width: width - 8
        }
      );

  const textY =
    y + (height - textHeight) / 2;

  doc
    .fontSize(fontSize)
    .text(
      String(text ?? ""),
      x + 4,
      textY,
      {
        width: width - 8,
        align
      }
    );
}

  // ===========================
  // Header
  // ===========================

  doc.fontSize(14).font("Helvetica-Bold");

  drawCell(
  20,
  20,
  40,
  40,
  collegeCode,
  10,
  "center"
);

drawCell(
  70,
  20,
  505,
  40,
  college_name[0].college_name,
  12,
  "center"
);

  // ===========================
  // COLLEGE DETAILS TABLE
  // ===========================
  
  doc.font('Times-Roman');

  const LABEL_WIDTH = 90;
const VALUE_WIDTH = 180;

const collegeFont =
  getTableFontSize(
    collegeDetails,
    LABEL_WIDTH,
    VALUE_WIDTH,
    TOP_TABLE_HEIGHT
  );

let collegeY = TOP_Y;

collegeDetails.forEach((row) => {

  const rowHeight =
    getRowHeight(
      row.field_lable,
      row.field_value,
      LABEL_WIDTH,
      VALUE_WIDTH,
      collegeFont
    );

  drawCell(
    LEFT_X,
    collegeY,
    LABEL_WIDTH,
    rowHeight,
    row.field_lable,
    collegeFont
  );

  drawCell(
    LEFT_X + LABEL_WIDTH,
    collegeY,
    VALUE_WIDTH,
    rowHeight,
    row.field_value,
    collegeFont
  );

  collegeY += rowHeight;
});
  // ===========================
  // HOSTEL TABLE
  // ===========================

  
  // ===========================
  // BRANCH TABLE
  // ===========================
  const HOSTEL_LABEL = 110;
const HOSTEL_BOYS = 80;
const HOSTEL_GIRLS = 80;
  const hostelFont =
  getTableFontSize(
    hostelDetails,
    120,
    120,
    BOTTOM_TABLE_HEIGHT
  );

let hostelY = collegeY + 20;

drawCell(
  LEFT_X,
  hostelY,
  HOSTEL_LABEL,
  30,
  "Field",
  hostelFont,
  "center"
);

drawCell(
  LEFT_X + HOSTEL_LABEL,
  hostelY,
  HOSTEL_BOYS,
  30,
  "Boys",
  hostelFont,
  "center"
);

drawCell(
  LEFT_X + HOSTEL_LABEL + HOSTEL_BOYS,
  hostelY,
  HOSTEL_GIRLS,
  30,
  "Girls",
  hostelFont,
  "center"
);

hostelY += 30;

hostelDetails.forEach((row) => {

  if (row.single_value) {

    drawCell(
      LEFT_X,
      hostelY,
      HOSTEL_LABEL,
      30,
      row.field_lable,
      hostelFont
    );

    drawCell(
      LEFT_X + HOSTEL_LABEL,
      hostelY,
      HOSTEL_BOYS+HOSTEL_GIRLS,
      30,
      row.single_value,
      hostelFont
    );

  } else {

    drawCell(
      LEFT_X,
      hostelY,
      HOSTEL_LABEL,
      30,
      row.field_lable,
      hostelFont
    );

    drawCell(
      LEFT_X + HOSTEL_LABEL,
      hostelY,
      HOSTEL_BOYS,
      30,
      row.boys_value,
      hostelFont
    );

   drawCell(
  LEFT_X + HOSTEL_LABEL + HOSTEL_BOYS,
  hostelY,
  HOSTEL_GIRLS,
  30,
  row.girls_value,
  hostelFont
);
  }

  hostelY += 30;
});


const bankFont =
  getTableFontSize(
    bankdetails,
    LABEL_WIDTH,
    VALUE_WIDTH,
    TOP_TABLE_HEIGHT
  );

let bankY = TOP_Y;

bankdetails.forEach((row) => {

  const rowHeight =
    getRowHeight(
      row.field_lable,
      row.field_value,
      LABEL_WIDTH,
      VALUE_WIDTH,
      bankFont
    );

  drawCell(
    RIGHT_X,
    bankY,
    LABEL_WIDTH,
    rowHeight,
    row.field_lable,
    bankFont
  );

  drawCell(
    RIGHT_X + LABEL_WIDTH,
    bankY,
    VALUE_WIDTH,
    rowHeight,
    row.field_value,
    bankFont
  );

  bankY += rowHeight;
});

let branchY = bankY + 20;
const cols = [
  35,
  45,
  50,
  50,
  45,
  45
];

const headers = [
  "SL_No",
  " Branch  Code",
  "Approved Intake",
  "Year of Starting of Course",
  "Whether NBA Accredited",
  "Accreditation Valid Upto"
];

let headerX = RIGHT_X;
doc.font("Helvetica-Bold");
headers.forEach((head, i) => {

  drawCell(
    headerX,
    branchY,
    cols[i],
    45,
    head,
    10,
    "center"
  );

  headerX += cols[i];
});

branchY += 45;
doc.font('Times-Roman');
branchDetails.forEach(
  (branch, index) => {

    const values = [
      index + 1,
      branch.branch_code,
      branch.approved_intake,
      branch.course_start_year,
      branch.nba_accredited,
      branch.valid_year
    ];

    let rowX = RIGHT_X;

    values.forEach(
      (value, i) => {

        drawCell(
  rowX,
  branchY,
  cols[i],
  20,
  value,
  10
);

        rowX += cols[i];
      }
    );

    branchY += 20;
  }
);
  doc.end();
};

module.exports = generatePDF;