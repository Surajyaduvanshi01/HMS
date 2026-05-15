import {
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import DoctorCard from "../components/doctors/DoctorCard";

import AddDoctorModal from "../components/doctors/AddDoctorModal";

import {
  getDoctors,
  addDoctor,
} from "../api/doctorApi";

import { Plus } from "lucide-react";

function Doctors() {
  const [doctors, setDoctors] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors =
    async () => {
      try {
        const data =
          await getDoctors();

        setDoctors(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleAddDoctor =
    async (formData) => {
      try {
        await addDoctor(formData);
        toast.success("Doctor added successfully");
        fetchDoctors();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>

      <div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Doctors
          </h1>

          <button
            onClick={() =>
              setOpen(true)
            }
            className="btn-primary px-5 py-3 rounded-xl"
          >

            <Plus size={18} />

            Add Doctor

          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))}

        </div>

        <AddDoctorModal
          open={open}
          onClose={() =>
            setOpen(false)
          }
          onAdd={handleAddDoctor}
        />

      </div>

    </MainLayout>
  );
}

export default Doctors;
