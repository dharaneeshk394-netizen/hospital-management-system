import { initialPatients } from "../data/patients";

const STORAGE_KEY = "hospital_management_patients";

function getStoredPatients() {
  const storedPatients = localStorage.getItem(STORAGE_KEY);

  if (storedPatients) {
    return JSON.parse(storedPatients);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialPatients)
  );

  return initialPatients;
}

function savePatients(patients) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(patients)
  );
}

export function getPatients() {
  return getStoredPatients();
}

export function getPatientById(id) {
  const patients = getStoredPatients();

  return patients.find((patient) => patient.id === id);
}

export function createPatient(patientData) {
  const patients = getStoredPatients();

  const newPatient = {
    ...patientData,
    id: `PAT${String(patients.length + 1).padStart(3, "0")}`,
    age: Number(patientData.age),
  };

  const updatedPatients = [
    ...patients,
    newPatient,
  ];

  savePatients(updatedPatients);

  return newPatient;
}

export function updatePatient(id, patientData) {
  const patients = getStoredPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === id
      ? {
          ...patient,
          ...patientData,
          age: Number(patientData.age),
        }
      : patient
  );

  savePatients(updatedPatients);

  return updatedPatients.find(
    (patient) => patient.id === id
  );
}

export function deletePatient(id) {
  const patients = getStoredPatients();

  const updatedPatients = patients.filter(
    (patient) => patient.id !== id
  );

  savePatients(updatedPatients);

  return true;
}