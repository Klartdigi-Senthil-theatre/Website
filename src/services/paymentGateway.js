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
  hashstring += "|" + "WYZ2OVE1AU";
  return sha512.sha512(hashstring);
};

export const getAccessKey = async (data, onSuccess, onFailure) => {
  console.log("generate access key function");
  //   const txnid = await this.common.generateUniqueTransactionId(
  //     this.authService.currentUserValue.id
  //   );

  const txnid = Math.floor(100000 + Math.random() * 900000).toString();
  const form = {
    key: "Z9NHVY7G41",
    txnid: txnid,
    amount: data.amount,
    email: data.email,
    phone: data.phone,
    firstname: data.name.trim(),
    hash: "",
    udf1: "",
    udf2: "",
    udf3: "",
    udf4: "",
    productinfo: "Book Ticket",
    furl: "https://www.klartopedia.in/#/authentication/signin",
    surl: "https://www.klartopedia.in/#/authentication/signin",
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
    //payment failer message
  }
};

export const initiatePayment = async (
  accessKey,
  data,
  onSuccess,
  onFailure
) => {
  const options = {
    access_key: accessKey,
    pay_mode: "production", // access key received via Initiate Payment
    iframe: true,
    onResponse: async (response) => {
      if (response.status == "success") {
        try {
          console.log(response);
          const booking = await api.post("/movie-seat-bookings", {
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
            UDF1: `${data.userId}` ?? "",
            UDF2: data.phone ?? "",
          });
        } catch (error) {
          console.error("Booking API error:", err);
          onFailure?.("Booking API error");
        }

        onSuccess?.(response);
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
    theme: "#123456", // color hex
  };

  new window.EasebuzzCheckout("Z9NHVY7G41", "prod").initiatePayment(options);
};
