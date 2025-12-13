import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";

function Step7RiskFlexibility({ data, onUpdate, onNext, onPrevious }) {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Risk & Flexibility
      </Typography>
      <Typography variant="body2" className="step-description">
        Assess your team's readiness for changes and delays.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Pivot Readiness (1-5 scale)</InputLabel>
          <Select
            value={data.pivotReadiness || ""}
            onChange={(e) => handleChange("pivotReadiness", e.target.value)}
            label="Pivot Readiness (1-5 scale)"
          >
            <MenuItem value="1">1 - Not ready</MenuItem>
            <MenuItem value="2">2 - Low readiness</MenuItem>
            <MenuItem value="3">3 - Moderate readiness</MenuItem>
            <MenuItem value="4">4 - High readiness</MenuItem>
            <MenuItem value="5">5 - Very ready</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Release Delay Readiness (1-5 scale)</InputLabel>
          <Select
            value={data.releaseDelayReadiness || ""}
            onChange={(e) =>
              handleChange("releaseDelayReadiness", e.target.value)
            }
            label="Release Delay Readiness (1-5 scale)"
          >
            <MenuItem value="1">1 - Not ready</MenuItem>
            <MenuItem value="2">2 - Low readiness</MenuItem>
            <MenuItem value="3">3 - Moderate readiness</MenuItem>
            <MenuItem value="4">4 - High readiness</MenuItem>
            <MenuItem value="5">5 - Very ready</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="wizard-actions" sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
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

export default Step7RiskFlexibility;
