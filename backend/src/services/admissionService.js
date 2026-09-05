const { pool } = require("../config/db");

// Get all admissions
async function getAllAdmissions() {
  const result = await pool.query(`
    SELECT
      a.id,
      a.admission_id AS "admissionId",

      a.patient_id AS "patientId",
      p.patient_id AS "patientCode",
      p.name AS "patientName",

      a.doctor_id AS "doctorId",
      d.doctor_id AS "doctorCode",
      d.name AS "doctorName",
      d.specialization,

      a.room_number AS "roomNumber",
      a.bed_number AS "bedNumber",

      a.admission_date AS "admissionDate",
      a.expected_discharge_date AS "expectedDischargeDate",
      a.actual_discharge_date AS "actualDischargeDate",

      a.diagnosis,
      a.status,

      a.created_at AS "createdAt",
      a.updated_at AS "updatedAt"

    FROM admissions a

    INNER JOIN patients p
      ON a.patient_id = p.id

    INNER JOIN doctors d
      ON a.doctor_id = d.id

    ORDER BY
      a.admission_date DESC,
      a.id DESC
  `);

  return result.rows;
}

// Get one admission by ID
async function getAdmissionById(id) {
  const result = await pool.query(
    `
      SELECT
        a.id,
        a.admission_id AS "admissionId",

        a.patient_id AS "patientId",
        p.patient_id AS "patientCode",
        p.name AS "patientName",

        a.doctor_id AS "doctorId",
        d.doctor_id AS "doctorCode",
        d.name AS "doctorName",
        d.specialization,

        a.room_number AS "roomNumber",
        a.bed_number AS "bedNumber",

        a.admission_date AS "admissionDate",
        a.expected_discharge_date AS "expectedDischargeDate",
        a.actual_discharge_date AS "actualDischargeDate",

        a.diagnosis,
        a.status,

        a.created_at AS "createdAt",
        a.updated_at AS "updatedAt"

      FROM admissions a

      INNER JOIN patients p
        ON a.patient_id = p.id

      INNER JOIN doctors d
        ON a.doctor_id = d.id

      WHERE a.id = $1
    `,
    [Number(id)]
  );

  return result.rows[0] || null;
}

// Create admission
async function createAdmission(admissionData) {
  const {
    patientId,
    doctorId,
    roomNumber,
    bedNumber,
    admissionDate,
    expectedDischargeDate,
    actualDischargeDate,
    diagnosis,
    status = "Admitted",
  } = admissionData;

  const result = await pool.query(
    `
      INSERT INTO admissions (
        admission_id,
        patient_id,
        doctor_id,
        room_number,
        bed_number,
        admission_date,
        expected_discharge_date,
        actual_discharge_date,
        diagnosis,
        status
      )
      VALUES (
        'TEMP',
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING id
    `,
    [
      Number(patientId),
      Number(doctorId),
      roomNumber || null,
      bedNumber || null,
      admissionDate,
      expectedDischargeDate || null,
      actualDischargeDate || null,
      diagnosis || null,
      status,
    ]
  );

  const admission = result.rows[0];

  const admissionId = `ADM${String(
    admission.id
  ).padStart(3, "0")}`;

  await pool.query(
    `
      UPDATE admissions
      SET
        admission_id = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `,
    [admissionId, admission.id]
  );

  return getAdmissionById(admission.id);
}

// Update admission
async function updateAdmission(
  id,
  admissionData
) {
  const {
    patientId,
    doctorId,
    roomNumber,
    bedNumber,
    admissionDate,
    expectedDischargeDate,
    actualDischargeDate,
    diagnosis,
    status,
  } = admissionData;

  const result = await pool.query(
    `
      UPDATE admissions
      SET
        patient_id = COALESCE($1, patient_id),
        doctor_id = COALESCE($2, doctor_id),
        room_number = COALESCE($3, room_number),
        bed_number = COALESCE($4, bed_number),
        admission_date = COALESCE($5, admission_date),
        expected_discharge_date =
          COALESCE($6, expected_discharge_date),
        actual_discharge_date =
          COALESCE($7, actual_discharge_date),
        diagnosis = COALESCE($8, diagnosis),
        status = COALESCE($9, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING id
    `,
    [
      patientId ?? null,
      doctorId ?? null,
      roomNumber ?? null,
      bedNumber ?? null,
      admissionDate ?? null,
      expectedDischargeDate ?? null,
      actualDischargeDate ?? null,
      diagnosis ?? null,
      status ?? null,
      Number(id),
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return getAdmissionById(result.rows[0].id);
}

// Delete admission
async function deleteAdmission(id) {
  const result = await pool.query(
    `
      DELETE FROM admissions
      WHERE id = $1
      RETURNING id
    `,
    [Number(id)]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return {
    id: result.rows[0].id,
  };
}

module.exports = {
  getAllAdmissions,
  getAdmissionById,
  createAdmission,
  updateAdmission,
  deleteAdmission,
};