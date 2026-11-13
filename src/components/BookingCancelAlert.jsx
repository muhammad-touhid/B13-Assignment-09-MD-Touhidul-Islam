"use client";

import { AlertDialog, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function BookingCancelAlert({ bookingId }) {
  const router = useRouter();

  const handleCancelBooking = async () => {
    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please login first");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      if (res.ok) {
        toast.success("Booking cancelled successfully");
        router.refresh();
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        type="button"
        className="rounded-xl border border-gray-200 bg-transparent px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
      >
        <Trash /> Cancel Booking
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
