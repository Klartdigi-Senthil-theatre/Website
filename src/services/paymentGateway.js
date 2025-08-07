import { sha512 } from "js-sha512";

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

export const getAccessKey = async (data) => {
  console.log("generate access key function");
  //   const txnid = await this.common.generateUniqueTransactionId(
  //     this.authService.currentUserValue.id
  //   );

  const txnid = "123459876545676";
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
  initiatePayment("");

  //   const url = "api/feeinfo/getaccesskey";
  //   return await this.apiService.post(url, form).toPromise();
};

export const initiatePayment = async (accessKey) => {
  console.log(accessKey);

  const options = {
    access_key:
      "6f144045fba991f44125edb54e2ed70e94001c06c67d35fc681c729792477364",
    pay_mode: "production", // access key received via Initiate Payment
    // onResponse: (response) => {
    //   if (response.status == "success") {

    //   } else {
    //     this.snackBar.open(
    //       `Payment failed, Reason: "${response.error_Message}". Please try again.`,
    //       "Close",
    //       {
    //         duration: 6000,
    //       }
    //     );
    //   }
    // },
    theme: "#123456", // color hex
  };

  new window.EasebuzzCheckout("Z9NHVY7G41", "prod").initiatePayment(options);

  //   this.easebuzzCheckout.initiatePayment(options);
};
