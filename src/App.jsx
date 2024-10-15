import React, { useState } from 'react';
import './App.css'
import {TextField ,Button,FormControl,InputLabel,Select,MenuItem,RadioGroup,FormControlLabel,Radio,Grid,Typography,} from '@mui/material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    email: '',
    gender: '',
    dob: '',
    course: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? '' : 'Name is required.';
    tempErrors.address = formData.address ? '' : 'Address is required.';
    tempErrors.mobile = formData.mobile.match(/^\d{10}$/) ? '' : 'Mobile number must be 10 digits.';
    tempErrors.email = formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? '' : 'Email is invalid.';
    tempErrors.gender = formData.gender ? '' : 'Gender is required.';
    tempErrors.dob = formData.dob ? '' : 'Date of Birth is required.';
    tempErrors.course = formData.course ? '' : 'Course selection is required.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Data stored successfully");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      address: '',
      mobile: '',
      email: '',
      gender: '',
      dob: '',
      course: '',
    });
    setErrors({});
  };

  return (
    <div id="bg" >
          <h1 className='text-center text-dark pt-1'>Higher Secondary Admission Form</h1>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh',marginTop:'-60px'
    }} >
      <Grid item xs={12} sm={8} md={6} className='bg-light p-4 rounded'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {['name', 'address', 'mobile', 'email'].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                  InputProps={{ sx: { color: 'black' }, style: { border: '1px solid white' } }}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!errors.gender}>
                <Typography style={{ color: 'black' }}>Gender</Typography>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
                {errors.gender && <Typography color="error">{errors.gender}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={handleChange}
                error={!!errors.dob}
                helperText={errors.dob}
                InputProps={{ style: { color: 'black' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.course}>
                <InputLabel style={{ color: 'black' }}>Course</InputLabel>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                  <MenuItem value="Commerce">Commerce</MenuItem>
                  <MenuItem value="Humanities">Humanities</MenuItem>
                </Select>
                {errors.course && <Typography color="error">{errors.course}</Typography>}
              </FormControl>
            </Grid>

            <Grid item xs={12} container justifyContent="center" gap={2}>
              <Button id='btn1' variant="contained" className='btn text-dark' type="submit">
                Register
              </Button>
              <Button id='btn2' variant="outlined" className=' text-dark' onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  </div>
  );
};

export default RegistrationForm;

