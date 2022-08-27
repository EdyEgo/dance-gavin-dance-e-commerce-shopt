import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { sendEmail } from "../../../composables/emailSender";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface EmailSubscriptionInputProps {}

const EmailSubscriptionInput: React.FC<EmailSubscriptionInputProps> = () => {
  const [emailInput, setEmailInput] = React.useState<string>("");

  function handleChange(event: any) {
    setEmailInput(event.target.value);
  }

  async function sendEmailSubscription() {
    // if(emailInput) // verify if it is an email
    await sendEmail({
      emailNameReceiver: emailInput,
      useSubscriptionTemplate: true,
      message: `Thank you for subscribing to my app.Don't worry this is the only message you're gonna see, 
      if you want to subscribe to the real 
      band go to this link: https://dancegavindanceband.com/. 
      Have an amazing day!
      `,
      userNameReceiver: "",
    });

    setEmailInput("");
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        color: "white",
        borderColor: "white",
      }}
      color="antiquewhite"
    >
      <FormControl
        sx={{
          m: 1,
          width: "25ch",
          // "&:.MuiFormControl-root > .MuiOutlinedInput-root": {
          //   border: "1px solid white",
          // },
        }}
        variant="outlined"
        style={{ color: "white", borderColor: "white" }}
      >
        <OutlinedInput
          style={{
            color: "white",
            borderColor: "white",
            outline: "none",
          }}
          color="info"
          type="email"
          id="outlined-adornment-weight"
          value={emailInput}
          onChange={handleChange}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              sendEmailSubscription();
            }
          }}
          endAdornment={
            <InputAdornment
              position="end"
              style={{ outline: "none", borderColor: "white" }}
            >
              <div
                className="arrow-container cursor-pointer"
                onClick={sendEmailSubscription}
              >
                <ArrowRightAltIcon className="text-white" />
              </div>
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
        <div id="outlined-weight-helper-text" className="text-white ml-2 mt-2">
          Your e-mail
        </div>
      </FormControl>
    </Box>
  );
};

export default EmailSubscriptionInput;
