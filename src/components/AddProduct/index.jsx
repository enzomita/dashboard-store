import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { apiConfig } from "../../api/apiConfig";
import Loader from "../Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const AddProduct = ({ open, onClose, onCloseAfterApi }) => {

  const formDataDefault = {
    title: {
      label: "Titolo",
      id: "title",
      type: "text",
      required: true,
      value: "",
      error: {
        show: false,
        label: "Inserisci un titolo",
      },
    },
    category: {
      label: "Categoria",
      id: "category",
      type: "text",
      required: true,
      value: "",
      error: {
        show: false,
        label: "Inserisci una categoria",
      },
    },
    price: {
      label: "Prezzo",
      id: "price",
      type: "text",
      required: true,
      value: "",
      error: {
        show: false,
        label: "Inserisci un prezzo",
      },
    },
    description: {
      label: "Descrizione",
      id: "description",
      type: "text",
      required: false,
      value: "",
      error: false,
    },
  }

  const [formData, setFormData] = useState(formDataDefault);
  const [debugReviews, setDebugReviews] = useState("");

  const { res, err, loading, triggerFetch, reInitState } = useAxios({}, false);

  const generateBodyApi = () => {
    let body = {};
    Object.keys(formData).forEach(key => {
      body[key] = formData[key].value;
    })

    // Add reviews debug

    if (debugReviews) {
      const reviewsArray = debugReviews.split("|");
      body.reviews = reviewsArray;
    } else {
      body.reviews = [];
    }

    body.employee = localStorage.getItem("login-user") || sessionStorage.getItem("login-user") || "";

    return body;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // Form Validation
    // Required
    let formDataValidated = { ...formData };
    Object.keys(formDataValidated).forEach(key => {
      const item = formDataValidated[key];
      if (item.error) {
        if (item.required && item.value === "") {
          item.error.show = true;
          isValid = false;
        } else {
          item.error.show = false;
        }
      }
      formDataValidated[key] = item;
    })

    setFormData(formDataValidated);

    if (isValid) {
      triggerFetch({
        url: apiConfig.postProduct,
        method: 'post',
        data: generateBodyApi(),
      })
    }
  };

  const handleRespModaleClose = () => {
    if (err) {
      reInitState();
    } else {
      onCloseAfterApi();
      setTimeout(() => {
        reInitState();
      }, 500)
    }
  }

  return (
    <Dialog open={open} onClose={() => {}} fullWidth>
      <>
        {!res && !err ? (
          <>
            <DialogTitle>Aggiungi prodotto</DialogTitle>
            {loading && (
              <Loader></Loader>
            )}
            <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate>
              <DialogContent>
                <DialogContentText>
                  Compila i campi di seguito per inserire un nuovo prodotto.
                </DialogContentText>
                {Object.keys(formData).map((key, index) => (
                  <React.Fragment key={`form-${formData[key].id}`}>
                    {key !== 'price' ? (
                      <TextField
                        disabled={!!loading}
                        autoFocus={index === 0}
                        margin="dense"
                        id={formData[key].id}
                        label={formData[key].label}
                        type="text"
                        fullWidth
                        variant="outlined"
                        required={formData[key].required}
                        sx={{ mt: 2, mb: 2 }}
                        error={formData[key].error.show}
                        helperText={formData[key].error.show ? formData[key].error.label : ''}
                        onChange={(e) => setFormData({
                          ...formData, [key]: { ...formData[key], value: e.target.value }
                        })}
                      />
                    ) : (
                      <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                        <InputLabel htmlFor={formData[key].id}>Prezzo</InputLabel>
                        <OutlinedInput
                          disabled={!!loading}
                          id={formData[key].id}
                          startAdornment={<InputAdornment position="start">€</InputAdornment>}
                          label={formData[key].label}
                          margin="dense"
                          type="number"
                          required={formData[key].required}
                          error={formData[key].error.show}
                          onChange={(e) => setFormData({
                            ...formData, [key]: { ...formData[key], value: e.target.value }
                          })}
                        />
                        {formData[key].error.show && (
                          <FormHelperText error>
                            {formData[key].error.show ? formData[key].error.label : ''}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </React.Fragment>
                ))}

                <Accordion sx={{ mt: 3 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Debug fields
                    </Typography>
                    <TextField
                      disabled={!!loading}
                      margin="dense"
                      id="debug-review"
                      label="Recensioni"
                      type="text"
                      fullWidth
                      variant="outlined"
                      helperText={"Per inserire multiple recensioni separarle con la pipe | -> esempio di 3 recensioni: Bello|Molto Buono|Una fantastica sorpresa"}
                      sx={{ mt: 2, mb: 2 }}
                      onChange={(e) => setDebugReviews(e.target.value) }
                    />
                  </AccordionDetails>
                </Accordion>

              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClose()} disabled={!!loading}>Annulla</Button>
                <Button type="submit" disabled={!!loading}>AGGIUNGI</Button>
              </DialogActions>
            </Box>
          </>
        ) : res || err ? (
          <>
            <DialogTitle>Aggiungi prodotto</DialogTitle>
            {res && (
              <Alert severity="success">Il prodotto <strong>{formData.title.value}</strong> è stato aggiunto con successo.</Alert>
            )}
            {err && (
              <Alert severity="error">
                Il prodotto <strong>{formData.title.value}</strong> non è stato aggiunto per via di un errore nel sistema:<br/>
                {err.message}
              </Alert>
            )}
            <DialogActions>
              <Button onClick={() => handleRespModaleClose()}>CHIUDI</Button>
            </DialogActions>
          </>
        ) : <></>}
      </>
    </Dialog>
  )
}

export default AddProduct;