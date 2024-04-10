import { Alert } from "@mui/material";

const Message = ({ severity, children }) => {
  return <Alert severity={severity}>{children}</Alert>;
};

Message.defaultProps = {
  severity: "info",
};

export default Message;
