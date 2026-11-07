"use client";

import { useEffect, useState } from "react";
import { AlertDialog, Button, Modal } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyAddedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  // Update form states
  const [editCar, setEditCar] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch logged-in user's cars
  const fetchMyCars = async () => {
    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please log in again.");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-cars`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cars");
      }

      const result = await res.json();
      setCars(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  // Delete selected car
  const handleDelete = async () => {
    if (!selectedCar) return;

    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please log in again.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${selectedCar._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete car");
      }

      setCars(cars.filter((car) => car._id !== selectedCar._id));
      setSelectedCar(null);

      toast.success("Car deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Open update modal
  const handleEdit = (car) => {
    setEditCar({
      ...car,
      dailyRentPrice: String(car.dailyRentPrice),
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditCar({
      ...editCar,
      [name]: value,
    });
  };

  // Update car
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editCar.dailyRentPrice || Number(editCar.dailyRentPrice) <= 0) {
      toast.error("Please enter a valid daily rent price.");
      return;
    }

    setUpdating(true);

    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please log in again.");
        return;
      }

      const updateData = {
        dailyRentPrice: Number(editCar.dailyRentPrice),
        description: editCar.description,
        availabilityStatus: editCar.availabilityStatus,
        imageUrl: editCar.imageUrl,
        carType: editCar.carType,
        pickupLocation: editCar.pickupLocation,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${editCar._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update car");
      }

      setCars(
        cars.map((car) =>
          car._id === editCar._id ? { ...car, ...updateData } : car,
        ),
      );

      setEditCar(null);
      toast.success("Car updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading your cars...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mt-10 mb-6">My Added Cars</h1>

      {/* Cars List */}
      {cars.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          You haven't added any cars yet.
        </p>
      ) : (
        <div className="space-y-4">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0d0915] w-full"
            >
              {/* Car Image */}
              <img
                src={car.imageUrl}
                alt={car.carName}
                className="w-full sm:w-44 h-36 object-cover rounded-xl"
              />

              {/* Car Information */}
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-bold">{car.carName}</h2>

                <p className="text-lg mt-1">
                  <span>{car.carType} . </span>
                  <span>{car.pickupLocation} . </span>
                  <span>${car.dailyRentPrice} / day</span>
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    car.availabilityStatus === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {car.availabilityStatus}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  className="bg-[#ed1d26] text-white"
                  onPress={() => handleEdit(car)}
                >
                  Update
                </Button>

                <Button
                  className="border border-[#ed1d26] text-[#ed1d26]"
                  variant="bordered"
                  color="danger"
                  onPress={() => setSelectedCar(car)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Car Modal */}
      <Modal>
        <Modal.Backdrop
          isOpen={!!editCar}
          onOpenChange={(isOpen) => {
            if (!isOpen) setEditCar(null);
          }}
        >
          <Modal.Container size="lg">
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>Update Car</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                {editCar && (
                  <form
                    id="update-car-form"
                    onSubmit={handleUpdate}
                    className="space-y-4"
                  >
                    {/* Daily Rent Price */}
                    <div>
                      <label className="block mb-2 font-medium">
                        Daily Rent Price
                      </label>

                      <input
                        type="number"
                        name="dailyRentPrice"
                        value={editCar.dailyRentPrice}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block mb-2 font-medium">
                        Description
                      </label>

                      <textarea
                        name="description"
                        value={editCar.description || ""}
                        onChange={handleChange}
                        rows="3"
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      />
                    </div>

                    {/* Availability Status */}
                    <div>
                      <label className="block mb-2 font-medium">
                        Availability Status
                      </label>

                      <select
                        name="availabilityStatus"
                        value={editCar.availabilityStatus}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block mb-2 font-medium">
                        Image URL
                      </label>

                      <input
                        type="url"
                        name="imageUrl"
                        value={editCar.imageUrl}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      />
                    </div>

                    {/* Car Type */}
                    <div>
                      <label className="block mb-2 font-medium">Car Type</label>

                      <select
                        name="carType"
                        value={editCar.carType}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      >
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Van">Van</option>
                      </select>
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <label className="block mb-2 font-medium">
                        Pickup Location
                      </label>

                      <input
                        type="text"
                        name="pickupLocation"
                        value={editCar.pickupLocation}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent outline-none"
                      />
                    </div>
                  </form>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button variant="bordered" onPress={() => setEditCar(null)}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="update-car-form"
                  className="bg-[#ed1d26] text-white"
                  isDisabled={updating}
                >
                  {updating ? "Updating..." : "Save Changes"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog>
        <AlertDialog.Backdrop
          isOpen={!!selectedCar}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedCar(null);
          }}
        >
          <AlertDialog.Container>
            <AlertDialog.Dialog>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete Car?</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                Are you sure you want to delete{" "}
                <strong>{selectedCar?.carName}</strong>? This action cannot be
                undone.
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button variant="tertiary" onPress={() => setSelectedCar(null)}>
                  Cancel
                </Button>

                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
