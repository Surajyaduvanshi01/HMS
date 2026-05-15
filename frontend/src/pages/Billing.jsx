import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import BillTable from "../components/billing/BillTable";

import {
  getBills,
} from "../api/billApi";

function Billing() {
  const [bills, setBills] =
    useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills =
    async () => {
      try {
        const data =
          await getBills();

        setBills(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <MainLayout>

      <div className="rounded-4xl border border-emerald-200/50 bg-white/95 p-6 shadow-2xl">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Billing
          </h1>
          <p className="mt-2 text-gray-600">
            Review billing records and payment status at a glance.
          </p>
        </div>

        <BillTable bills={bills} />

      </div>

    </MainLayout>
  );
}

export default Billing;
