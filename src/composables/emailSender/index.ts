import { send } from "@emailjs/browser";

const PUBLIC_KEY = "Z_lRAKYLN7CgdIbAQ";
const ORDER_PROCESSED_TEMPLATE_ID = "template_t9xc1ff";
const SUBSCRIPTION_TEMPLATE_ID = "template_py3192k";
const SERVICE_ID = "service_5x6fccl";

// function initEmailJs() {
//   init(PUBLIC_KEY);
// }

export async function sendEmail({
  emailNameReceiver,
  message,
  userNameReceiver,
  useSubscriptionTemplate,
}: {
  emailNameReceiver: string;
  userNameReceiver: string;
  message: string;
  useSubscriptionTemplate?: true;
}) {
  const templateParams = {
    to_name: userNameReceiver,
    name: emailNameReceiver,
    from_name: "Dance Gavin Dance ",
    message,
  };
  const templateIdUsed =
    useSubscriptionTemplate == null
      ? ORDER_PROCESSED_TEMPLATE_ID
      : SUBSCRIPTION_TEMPLATE_ID;

  const response = await send(
    SERVICE_ID,
    templateIdUsed,
    templateParams,
    PUBLIC_KEY
  );
  // response returns {status:200,text:'OK'} if the email has been send for example
  return response;
}
