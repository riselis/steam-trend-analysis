import { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const teamRoles = [
  "Programmer",
  "Artist",
  "Designer",
  "Producer",
  "Audio Engineer",
  "Writer",
  "QA Tester",
  "Marketing",
  "Other",
];

function Step1TeamComposition({ data, onUpdate, onNext }) {
  const [teamSize, setTeamSize] = useState(data.teamSize || "");
  const [teamMembers, setTeamMembers] = useState(data.teamMembers || []);

  useEffect(() => {
    if (teamSize && parseInt(teamSize) > 0) {
      const size = parseInt(teamSize);
      if (teamMembers.length < size) {
        const newMembers = Array.from(
          { length: size },
          (_, i) =>
            teamMembers[i] || {
              teamRole: "",
              experienceYears: "",
              hoursByWeek: "",
            }
        );
        setTeamMembers(newMembers);
      } else if (teamMembers.length > size) {
        setTeamMembers(teamMembers.slice(0, size));
      }
    }
  }, [teamSize]);

  const handleTeamSizeChange = (e) => {
    const value = e.target.value;
    setTeamSize(value);
    onUpdate({ teamSize: value });
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    setTeamMembers(updated);
    onUpdate({ teamMembers: updated });
  };

  const canProceed = () => {
    if (!teamSize || parseInt(teamSize) <= 0) return false;
    return teamMembers.every(
      (member) =>
        member.teamRole && member.experienceYears && member.hoursByWeek
    );
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Team Composition
      </Typography>
      <Typography variant="body2" className="step-description">
        Tell us about your development team structure.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <TextField
          label="Team Size"
          type="number"
          inputProps={{ min: 1 }}
          value={teamSize}
          onChange={handleTeamSizeChange}
          placeholder="Enter team size"
          fullWidth
          autoComplete="off"
          sx={{ mb: 3 }}
        />

        {teamSize && parseInt(teamSize) > 0 && (
          <Box className="dynamic-list">
            {teamMembers.map((member, index) => (
              <Paper
                key={index}
                className="dynamic-list-item"
                sx={{ p: 2, mb: 2 }}
              >
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Team Member {index + 1}
                </Typography>
                <Autocomplete
                  options={teamRoles}
                  value={member.teamRole || null}
                  onChange={(event, newValue) => {
                    handleMemberChange(index, "teamRole", newValue || "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Role" autoComplete="off" />
                  )}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Years of Experience"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={member.experienceYears}
                  onChange={(e) =>
                    handleMemberChange(index, "experienceYears", e.target.value)
                  }
                  fullWidth
                  autoComplete="off"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Hours per Week"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={member.hoursByWeek}
                  onChange={(e) =>
                    handleMemberChange(index, "hoursByWeek", e.target.value)
                  }
                  fullWidth
                  autoComplete="off"
                />
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <Box
        className="wizard-actions"
        sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}
      >
        <Box />
        <Button variant="contained" onClick={onNext} disabled={!canProceed()}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step1TeamComposition;
