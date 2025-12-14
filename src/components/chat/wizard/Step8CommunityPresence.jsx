import {
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";
import SubmitButton from "./SubmitButton";

const channels = ["Discord", "Twitter", "Steam page"];

function Step8CommunityPresence({ data, onUpdate, onSubmit, onPrevious }) {
  const handleCheckboxChange = (value, checked) => {
    const current = data.communityChannels || [];
    if (checked) {
      onUpdate({ communityChannels: [...current, value] });
    } else {
      onUpdate({ communityChannels: current.filter((item) => item !== value) });
    }
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Community Presence
      </Typography>
      <Typography variant="body2" className="step-description">
        Select your community engagement channels.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <FormGroup>
          {channels.map((channel) => (
            <FormControlLabel
              key={channel}
              control={
                <Checkbox
                  checked={(data.communityChannels || []).includes(channel)}
                  onChange={(e) =>
                    handleCheckboxChange(channel, e.target.checked)
                  }
                />
              }
              label={channel}
            />
          ))}
        </FormGroup>
      </Box>

      <Box
        className="wizard-actions"
        sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}
      >
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <SubmitButton onSubmit={onSubmit} formData={data} />
      </Box>
    </Box>
  );
}

export default Step8CommunityPresence;
