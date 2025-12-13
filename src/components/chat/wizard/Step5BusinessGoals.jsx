import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";

function Step5BusinessGoals({ data, onUpdate, onNext, onPrevious }) {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleRevenueChange = (field, value) => {
    onUpdate({
      revenueExpected: {
        ...(data.revenueExpected || {}),
        [field]: value,
      },
    });
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Business & Production Goals
      </Typography>
      <Typography variant="body2" className="step-description">
        Define your business objectives and production timeline.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Project Goal Type</InputLabel>
          <Select
            value={data.projectGoalType || ""}
            onChange={(e) => handleChange("projectGoalType", e.target.value)}
            label="Project Goal Type"
          >
            <MenuItem value="one-time-boom">One-time Boom</MenuItem>
            <MenuItem value="long-tail">Long-tail / Live Game</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Target Price Range
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="Min ($)"
              type="number"
              value={data.targetPriceRange?.min || ""}
              onChange={(e) =>
                handleChange("targetPriceRange", {
                  ...(data.targetPriceRange || {}),
                  min: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Max ($)"
              type="number"
              value={data.targetPriceRange?.max || ""}
              onChange={(e) =>
                handleChange("targetPriceRange", {
                  ...(data.targetPriceRange || {}),
                  max: e.target.value,
                })
              }
              fullWidth
            />
          </Grid>
        </Grid>

        <TextField
          label="Max Development Time (months)"
          type="number"
          inputProps={{ min: 1 }}
          value={data.maxDevelopmentTime || ""}
          onChange={(e) => handleChange("maxDevelopmentTime", e.target.value)}
          placeholder="Months"
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          label="Target Release Window"
          value={data.targetReleaseWindow || ""}
          onChange={(e) => handleChange("targetReleaseWindow", e.target.value)}
          placeholder="e.g., Q2 2024"
          fullWidth
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Primary Objective</InputLabel>
          <Select
            value={data.primaryObjective || ""}
            onChange={(e) => handleChange("primaryObjective", e.target.value)}
            label="Primary Objective"
          >
            <MenuItem value="profit">Profit</MenuItem>
            <MenuItem value="portfolio">Portfolio</MenuItem>
            <MenuItem value="publisher-deal">Publisher Deal</MenuItem>
            <MenuItem value="community-building">Community Building</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Expected Revenue Range
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Min ($)"
              type="number"
              inputProps={{ min: 0 }}
              value={data.revenueExpected?.min || ""}
              onChange={(e) => handleRevenueChange("min", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Max ($)"
              type="number"
              inputProps={{ min: 0 }}
              value={data.revenueExpected?.max || ""}
              onChange={(e) => handleRevenueChange("max", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
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

export default Step5BusinessGoals;
