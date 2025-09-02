import { sha512 } from "js-sha512";
import api from "./api";

export const generateHash = (data) => {
  let hashstring =
    data.key +
    "|" +
    data.txnid +
    "|" +
    data.amount +
    "|" +
    data.productinfo +
    "|" +
    data.firstname +
    "|" +
    data.email +
    "|" +
    data.udf1 +
    "|" +
    data.udf2 +
    "|" +
    data.udf3 +
    "|" +
    data.udf4 +
    "|" +
    "|" +
    "|" +
    "|" +
    "|" +
    "|";
  //   hashstring += "|" + this.config.salt;
  hashstring += "|" + "WQ97KS3JPM";
  return sha512.sha512(hashstring);
};

export const getAccessKey = async (data, onSuccess, onFailure) => {
  console.log("generate access key function");

  try {
    const txnid = Math.floor(100000 + Math.random() * 900000).toString();
    const form = {
      key: "BTY3RQ697R",
      txnid: txnid,
      amount: data.amount,
      email: data.email,
      phone: data.phone,
      firstname: data.name.trim(),
      hash: "",
      udf1: `ShowID - ${data?.showTimePlannerId}`,
      udf2: `UserID - ${data?.userId}`,
      udf3: `Phone Number - ${data?.phone}`,
      udf4: `MovieID - ${data?.movieId}`,
      productinfo: "Book Ticket",
      furl: "https://theatre-app-backend-api-fuarhje3aceffkcu.centralindia-01.azurewebsites.net/api/payments/easepay/failure-callback",
      surl: "https://theatre-app-backend-api-fuarhje3aceffkcu.centralindia-01.azurewebsites.net/api/payments/easepay/callback",
      address1: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    };
    const hash_key = generateHash(form);
    form.hash = hash_key;
    console.log(form.hash);

    const url = "transactions/getaccesskey";
    const response = await api.post(url, form);
    if (response.data["status"] != null && response.data["status"] == 1) {
      initiatePayment(response.data["data"], data, onSuccess, onFailure);
    } else {
      onFailure?.("Failed to get access key");
    }
  } catch (err) {
    onFailure?.("Network error");
    console.error("Access key error:", err);
  }
};

export const initiatePayment = async (
  accessKey,
  data,
  onSuccess,
  onFailure
) => {
  try {
    const options = {
      access_key: accessKey,
      pay_mode: "production", // access key received via Initiate Payment
      iframe: true,
      onResponse: async (response) => {
        if (response.status == "success") {
          let booking;
          try {
            console.log(response);
            booking = await api.post("/movie-seat-bookings", {
              movieId: data?.movieId ?? "",
              userId: data?.userId ?? "",
              showTimePlannerId: data?.showTimePlannerId ?? "",
              date: data?.date ?? "",
              bookingSeats: data?.selectedSeats ?? "",
            });

            await api.post("/transactions", {
              movieSeatBookingId: booking.data.id,
              paymentMode: response["card_type"] ?? "Card",
              easePayId: response["easepayid"] ?? "12345",
              amount: data.amount ?? 0,
              UDF1: data.userId != null ? `${data.userId}` : "",
              UDF2: data.phone ?? "",
            });
          } catch (error) {
            console.error("Booking API error:", error);
            onFailure?.("Booking API error");
          }

          onSuccess?.(response,booking.data.id);
        } else {
          this.snackBar.open(
            `Payment failed, Reason: "${response.error_Message}". Please try again.`,
            "Close",
            {
              duration: 6000,
            }
          );

          onFailure?.(response.error_Message);
        }
      },
      onClose: function () {
        // This fires when user closes the gateway
        onFailure?.("Payment cancelled by user");
      },
      theme: "#123456", // color hex
    };

    new window.EasebuzzCheckout("Z9NHVY7G41", "prod").initiatePayment(options);
  } catch (err) {
    onFailure?.("Payment initialization failed");
    console.error("Payment init error:", err);
  }
};
