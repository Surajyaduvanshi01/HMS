import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import PatientTable from "../components/patients/PatientTable";

import AddPatientModal from "../components/patients/AddPatientModal";

import {
  getPatients,
  addPatient,
  deletePatient,
} from "../api/patientApi";

import { Plus } from "lucide-react";

function Patients() {
  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients =
    async () => {
      try {
        const data =
          await getPatients(search);

        setPatients(data.patients);
      } catch (error) {
        console.log(error);
      }
    };

  const handleAddPatient =
    async (formData) => {
      try {
        await addPatient(formData);
        toast.success(
        "Patient added successfully"
        );
        fetchPatients();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        await deletePatient(id);
        toast.success(
        "Patient deleted"
        );

        fetchPatients();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>

      <div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Patients
          </h1>

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl outline-none text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:bg-white transition"
            />

            <button
              onClick={() =>
                setOpen(true)
              }
              className="btn-primary px-5 py-3 rounded-xl"
            >

              <Plus size={18} />

              Add Patient

            </button>

          </div>

        </div>

        <PatientTable
          patients={patients || []}
          onDelete={handleDelete}
        />

        <AddPatientModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
          onAdd={handleAddPatient}
        />

      </div>

    </MainLayout>
  );
}

export default Patients;
