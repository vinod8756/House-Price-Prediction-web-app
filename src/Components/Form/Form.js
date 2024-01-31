import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FormGroup, darken } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

const FormComponent = (props) => {
  const [place, setPlace] = useState("");
  const [bhk, setBhk] = useState(0);
  const [bath, setBath] = useState(1);
  const [sqft, setsqft] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleBhkChange = (event, newBhk) => {
    setBhk(newBhk);
  };

  const handleBathChange = (event) => {
    setBath(parseInt(event.target.value));
  };

  const handlePlaceChange = (event, newValue) => {
    setPlace(newValue);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_home_price",
        {
          total_sqft: parseFloat(sqft),
          location: place,
          bhk: parseInt(bhk),
          bath: bath,
        }
      );

      console.log(response.data.estimated_price);
      props.showResultModel(true);
      props.showResult(response.data.estimated_price);
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/get_location_names")
      .then((res) => setSuggestions(res.data.locations));
  }, []);

  return (
    <FormGroup control={props.controller}>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <Box
              sx={{
                backgroundColor: props.formcolor,
                padding: 3,
                borderRadius: 2,
                boxShadow: 1,
                width: "100%",
                margin: "auto",
                mt: 4,
                mb: 4,
                opacity: 0.9,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    value={place}
                    onChange={handlePlaceChange}
                    options={suggestions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Place Name"
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: props.primaryColor },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: props.primaryColor,
                            },
                            "&:hover fieldset": {
                              borderColor: props.primaryColor,
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: props.primaryColor,
                            },
                            "& .MuiInputLabel-root": {
                              color: props.primaryColor,
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: props.primaryColor,
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ToggleButtonGroup
                    value={bhk}
                    exclusive
                    onChange={handleBhkChange}
                    aria-label="bhk"
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <ToggleButton
                        key={number}
                        value={number}
                        style={{
                          borderRadius: "5px",
                          padding: "8px 16px",
                          margin: "4px",
                          border:
                            bhk === number
                              ? `1px solid ${props.primaryColor}`
                              : "1px solid #ccc",
                          color: bhk === number ? "white" : "#000",
                          fontWeight: "bold",
                          backgroundColor:
                            bhk === number ? props.primaryColor : "white",
                        }}
                      >
                        {number} BHK
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup
                    row
                    name="bathroom"
                    value={bath}
                    onChange={handleBathChange}
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <FormControlLabel
                        key={number}
                        value={number}
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": { color: props.primaryColor },
                            }}
                          />
                        }
                        label={`${number} Bathrooms`}
                      />
                    ))}
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Square Feet"
                    variant="outlined"
                    value={sqft}
                    onChange={(e) => setsqft(e.target.value)}
                    InputLabelProps={{
                      style: { color: props.primaryColor, textAlign: "left" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: props.primaryColor,
                        },
                        "&:hover fieldset": {
                          borderColor: props.primaryColor,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: props.primaryColor,
                        },
                        "& .MuiInputLabel-root": {
                          color: props.primaryColor,
                          textAlign: "left", // Add this line to align the label to the left
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: props.primaryColor,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    
                    sx={{
                      backgroundColor: props.primaryColor,
                      color: "white",
                      mt: 2,
                      "&:hover": {
                        backgroundColor: darken(props.primaryColor, 0.2),
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </FormGroup>
  );
};

export default FormComponent;
