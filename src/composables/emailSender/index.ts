import { send } from "@emailjs/browser";

const PUBLIC_KEY = "Z_lRAKYLN7CgdIbAQ";
const ORDER_PROCESSED_TEMPLATE_ID = "template_t9xc1ff";
const SERVICE_ID = "service_5x6fccl";

// function initEmailJs() {
//   init(PUBLIC_KEY);
// }

export async function sendEmail({
  emailNameReceiver,
  message,
  userNameReceiver,
}: {
  emailNameReceiver: string;
  userNameReceiver: string;
  message: string;
}) {
  const templateParams = {
    to_name: userNameReceiver,
    name: emailNameReceiver,
    from_name: "Dance Gavin Dance ",
    message,
  };

  const response = await send(
    SERVICE_ID,
    ORDER_PROCESSED_TEMPLATE_ID,
    templateParams,
    PUBLIC_KEY
  );
  // response returns {status:200,text:'OK'} if the email has been send for example
  return response;
}
