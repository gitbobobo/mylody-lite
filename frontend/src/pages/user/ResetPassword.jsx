import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import SitemarkIcon from "../../components/SitemarkIcon";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "../../api/user";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function ResetPassword() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [codeError, setCodeError] = React.useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState("");
  const [sendTick, setSendTick] = React.useState(0);
  const [openActiveDialog, setOpenActiveDialog] = React.useState(false);

  const { t } = useTranslation();
  const sendMutation = useMutation({
    mutationFn: forgotPassword,
  });
  const resetMutation = useMutation({
    mutationFn: resetPassword,
  });
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenActiveDialog(false);
    if (resetMutation.isError) {
      resetMutation.reset();
    } else {
      navigate("/login", { replace: true });
    }
  };

  React.useEffect(() => {
    let timer;
    if (sendTick > 0) {
      timer = setInterval(() => {
        setSendTick((prevTick) => prevTick - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sendTick]);

  const handleSendCode = async () => {
    const email = document.getElementById("email");
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t("invalidEmailFormat"));
      return;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }
    try {
      await sendMutation.mutateAsync({ email: email.value });
      setSendTick(60);
      enqueueSnackbar(t("sentSuccessfully"), { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailError || passwordError || codeError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    try {
      await resetMutation.mutateAsync({
        password: data.get("password"),
        code: data.get("code"),
      });
    } catch (error) {
      console.error(error);
    }
    setOpenActiveDialog(true);
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const code = document.getElementById("code");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage(t("invalidEmailFormat"));
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage(t("passwordLengthDesc"));
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!code.value || code.value.length !== 6) {
      setCodeError(true);
      setCodeErrorMessage(t("invalidVerificationCodeFormat"));
      isValid = false;
    } else {
      setCodeError(false);
      setCodeErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      <SitemarkIcon />
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
        {t("resetPassword")}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}>
        <FormControl>
          <FormLabel htmlFor="email">{t("email")}</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">{t("newPassword")}</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder={t("pleaseInputNewPassword")}
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <Stack direction="row" spacing={2} sx={{ alignItems: "flex-end" }}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel htmlFor="code">{t("emailVerificationCode")}</FormLabel>
            <TextField
              error={codeError}
              helperText={codeErrorMessage}
              name="code"
              placeholder={t("pleaseInputEmailVerificationCode")}
              type="text"
              id="code"
              required
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleSendCode}
            disabled={sendTick > 0}
            loading={sendMutation.isLoading}>
            {t("sendCode") + (sendTick > 0 ? ` (${sendTick})` : "")}
          </Button>
        </Stack>

        <Button
          type="submit"
          fullWidth
          loading={sendMutation.isLoading}
          variant="contained"
          onClick={validateInputs}>
          {t("submit")}
        </Button>
        <Dialog
          open={openActiveDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {resetMutation.isError
              ? t("operationFailed")
              : t("operationSucceeded")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {resetMutation.isError
                ? t("pleaseRetry")
                : t("passwordResetSuccessfully")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              {resetMutation.isError ? t("gotIt") : t("goToSignIn")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
}
