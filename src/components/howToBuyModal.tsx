import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface PropsTypes {
  open: boolean;
  onClose: () => void;
}
export default function HowToBuyDialog({ open, onClose }: PropsTypes) {
  const { t } = useTranslation();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            background: "#EBBF66",
          },
        },
      }}
    >
      <DialogContent>
        <Typography
          variant='h1'
          sx={{
            fontSize: {
              xs: "21px",
              sm: "36px",
              md: matchesSM ? "48px" : "21px",
            },
            //lineHeight: "25px",
            fontWeight: 500,
            textTransform: "uppercase",
            //width: { xs: "100%", sm: "90%", md: "100%" },
          }}
        >
          {t("howToBuy.dialog.title")}
        </Typography>
        <Grid container direction='column' sx={{ gap: "20px", mt: "20px" }}>
          {(
            t("howToBuy.dialog.steps", {
              returnObjects: true,
            }) as string[]
          ).map((step, i) => (
            <Grid key={i}>
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 500,
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? "text.primary"
                      : "primary.dark",
                  textTransform: "uppercase",
                  lineHeight: "23px",
                }}
              >
                {t("howToBuy.dialog.step")} {i + 1}
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  mt: "5px",
                  fontFamily: "Inter",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "#000",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                {step}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          sx={{
            background:
              "linear-gradient(180deg, #E9ED00 0%, #ACDD25 48%, #08D745 100%)",
            borderRadius: "14px",
            border: "2px solid #fff",
            fontWeight: 500,
            px: "19px",
            color: "#000",
          }}
          onClick={onClose}
        >
          {t("howToBuy.dialog.gotIt")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
