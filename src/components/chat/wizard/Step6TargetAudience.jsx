import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Box,
  Typography,
  FormGroup,
  Checkbox,
  Grid,
} from "@mui/material";

function Step6TargetAudience({ data, onUpdate, onNext, onPrevious }) {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleAgeGroupChange = (field, value) => {
    onUpdate({
      targetAgeGroup: {
        ...(data.targetAgeGroup || {}),
        [field]: value,
      },
    });
  };

  const handleCheckboxChange = (field, value, checked) => {
    const current = data[field] || [];
    if (checked) {
      onUpdate({ [field]: [...current, value] });
    } else {
      onUpdate({ [field]: current.filter((item) => item !== value) });
    }
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Target Audience & Platform
      </Typography>
      <Typography variant="body2" className="step-description">
        Define your target audience and platform strategy.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Target Age Group
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="Min age"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={data.targetAgeGroup?.min || ""}
              onChange={(e) => handleAgeGroupChange("min", e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Max age"
              type="number"
              inputProps={{ min: 0, max: 100 }}
              value={data.targetAgeGroup?.max || ""}
              onChange={(e) => handleAgeGroupChange("max", e.target.value)}
              fullWidth
              autoComplete="off"
            />
          </Grid>
        </Grid>

        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Player Type</FormLabel>
          <RadioGroup
            row
            value={data.playerType || ""}
            onChange={(e) => handleChange("playerType", e.target.value)}
          >
            <FormControlLabel
              value="casual"
              control={<Radio />}
              label="Casual"
            />
            <FormControlLabel
              value="midcore"
              control={<Radio />}
              label="Midcore"
            />
            <FormControlLabel
              value="hardcore"
              control={<Radio />}
              label="Hardcore"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Target Region"
          value={data.targetRegion || ""}
          onChange={(e) => handleChange("targetRegion", e.target.value)}
          placeholder="e.g., North America, Europe, Global"
          fullWidth
          autoComplete="off"
          sx={{ mb: 3 }}
        />

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Platform Focus
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={(data.platformFocus || []).includes("PC")}
                onChange={(e) =>
                  handleCheckboxChange("platformFocus", "PC", e.target.checked)
                }
              />
            }
            label="PC"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={(data.platformFocus || []).includes("Steam Deck")}
                onChange={(e) =>
                  handleCheckboxChange(
                    "platformFocus",
                    "Steam Deck",
                    e.target.checked
                  )
                }
              />
            }
            label="Steam Deck"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={(data.platformFocus || []).includes("Console")}
                onChange={(e) =>
                  handleCheckboxChange(
                    "platformFocus",
                    "Console",
                    e.target.checked
                  )
                }
              />
            }
            label="Console"
          />
        </FormGroup>
      </Box>

      <Box
        className="wizard-actions"
        sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}
      >
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step6TargetAudience;
