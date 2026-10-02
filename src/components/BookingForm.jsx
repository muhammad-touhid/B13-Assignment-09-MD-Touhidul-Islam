"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Label,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from "@heroui/react";
import { CarFront, FileText } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function BookingForm({ car }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: user?.id,
      carId: car._id,
      carName: car.carName,
      carImage: car.imageUrl,
      dailyRentPrice: Number(car.dailyRentPrice),
      driverNeeded,
      specialNote,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bookingData),
    });

    router.push("/my-bookings");
    const data = await res.json();
    console.log("Booking Response:", data);
    toast.success("Booking submitted successfully!");
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0d0915] sm:p-8">
      <div className="mb-7">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ed1d26]/10 text-[#ed1d26]">
          <CarFront size={24} />
        </div>

        <h2 className="text-2xl font-bold text-[#07030e] dark:text-[#fefefe]">
          Book {car.carName}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-white/60">
          Complete the form below to book this vehicle.
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-6">
        {/* Driver Needed */}
        <div className="w-full">
          <RadioGroup
            name="driverNeeded"
            value={driverNeeded}
            onChange={setDriverNeeded}
            orientation="horizontal"
          >
            <Label>Do you need a driver?</Label>

            <Radio value="Yes">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                Yes
              </Radio.Content>
            </Radio>

            <Radio value="No">
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                No
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>

        {/* Special Note */}
        <TextField name="specialNote" className="w-full">
          <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#07030e] dark:text-[#fefefe]">
            <FileText size={16} />
            Special Note
          </Label>

          <TextArea
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="Add any special request or note..."
            rows={5}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#ed1d26] dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </TextField>

        {/* Booking Summary */}
        <div className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-white/60">
              Daily Rent
            </span>

            <span className="font-bold text-[#ed1d26]">
              ${car.dailyRentPrice} / day
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-white/60">
              Driver Needed
            </span>

            <span className="font-medium text-[#07030e] dark:text-[#fefefe]">
              {driverNeeded}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          type="submit"
          className="w-full rounded-xl bg-[#ed1d26] px-6 py-3 font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
        >
          Book Now
        </Button>
      </Form>
    </div>
  );
}
