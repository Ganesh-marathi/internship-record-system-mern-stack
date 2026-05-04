import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button,
  Chip, Box, IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/internships');
      setInternships(response.data);
    } catch (error) {
      toast.error('Failed to fetch internships');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/internships/${id}`);
        toast.success('Deleted successfully!');
        fetchInternships();
      } catch (error) {
        toast.error('Delete failed!');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'ongoing': 'warning',
      'completed': 'success',
      'rejected': 'error',
      'pending': 'default'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Internship Records
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/add"
          startIcon={<Add />}
        >
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map((item) => (
              <TableRow key={item._id} hover>
                <TableCell>{item.studentName}</TableCell>
                <TableCell>{item.studentId}</TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>
                  {new Date(item.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={getStatusColor(item.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(item._id)}
                    color="error"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;