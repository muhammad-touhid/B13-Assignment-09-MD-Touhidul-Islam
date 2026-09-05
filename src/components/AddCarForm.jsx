"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";

export default function AddCarForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());

    carData.dailyRentPrice = Number(carData.dailyRentPrice);
    carData.seatCapacity = Number(carData.seatCapacity);

    const res = await fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    const data = await res.json();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10 dark:border-white/10 dark:bg-[#0d0915]"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Car Name */}
        <TextField name="carName" isRequired>
          <Label>Car Name</Label>
          <Input placeholder="Toyota Camry 2024" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Daily Rent Price */}
        <TextField name="dailyRentPrice" type="number" isRequired>
          <Label>Daily Rent Price</Label>
          <Input
            type="number"
            placeholder="80"
            min="1"
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        {/* Car Type */}
        <div>
          <Select
            name="carType"
            isRequired
            className="w-full"
            placeholder="Select car type"
          >
            <Label>Car Type</Label>

            <Select.Trigger className="rounded-2xl">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="SUV" textValue="SUV">
                  SUV
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Sedan" textValue="Sedan">
                  Sedan
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Hatchback" textValue="Hatchback">
                  Hatchback
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Luxury" textValue="Luxury">
                  Luxury
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Convertible" textValue="Convertible">
                  Convertible
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Pickup" textValue="Pickup">
                  Pickup
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Van" textValue="Van">
                  Van
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Seat Capacity */}
        <TextField name="seatCapacity" type="number" isRequired>
          <Label>Seat Capacity</Label>
          <Input
            type="number"
            placeholder="5"
            min="1"
            max="20"
            className="rounded-2xl"
          />
          <FieldError />
        </TextField>

        {/* Pickup Location */}
        <TextField name="pickupLocation" isRequired>
          <Label>Pickup Location</Label>
          <Input placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
          <FieldError />
        </TextField>

        {/* Availability Status */}
        <div>
          <Select
            name="availabilityStatus"
            isRequired
            className="w-full"
            placeholder="Select availability"
          >
            <Label>Availability Status</Label>

            <Select.Trigger className="rounded-2xl">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
              <ListBox>
                <ListBox.Item id="Available" textValue="Available">
                  Available
                  <ListBox.ItemIndicator />
                </ListBox.Item>

                <ListBox.Item id="Unavailable" textValue="Unavailable">
                  Unavailable
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <TextField name="imageUrl" isRequired>
            <Label>Image URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/car-image.jpg"
              className="rounded-2xl"
            />
            <FieldError />
          </TextField>

          <p className="mt-2 text-xs text-gray-500 dark:text-white/50">
            Add a direct image URL from ImgBB, Postimages, or another image
            hosting service.
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <TextField name="description" isRequired>
            <Label>Description</Label>
            <TextArea
              placeholder="Describe the car, its features, condition, and rental details..."
              className="min-h-32 rounded-3xl"
            />
            <FieldError />
          </TextField>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full rounded-xl bg-[#ed1d26] py-6 text-base font-semibold text-[#fefefe] transition hover:bg-[#c9151d]"
      >
        Add Car
      </Button>
    </form>
  );
}
