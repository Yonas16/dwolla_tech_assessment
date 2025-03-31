import Head from 'next/head';
import useSWR from 'swr';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
};

export type Customers = Customer[];

export type ApiError = {
  code: string;
  message: string;
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    firstName: '',
    lastName: '',
    email: '',
    businessName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const body = await response.json();
    if (!response.ok) throw body;
    return body;
  };

  const { data, error, isLoading, mutate } = useSWR<Customers, ApiError>(
    '/api/customers',
    fetcher
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCustomer({
      firstName: '',
      lastName: '',
      email: '',
      businessName: ''
    });
    setErrors({});
    setSubmitError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    
    if (!newCustomer.firstName) {
      newErrors.firstName = 'First name is required';
    }else if (!lettersOnlyRegex.test(newCustomer.firstName)) {
      newErrors.firstName = 'First name should contain only letters';
    }
    
    if (!newCustomer.lastName) {
      newErrors.lastName = 'Last name is required';
    }else if (!lettersOnlyRegex.test(newCustomer.lastName)) {
      newErrors.lastName = 'Last name should contain only letters';
    }
    
    if (!newCustomer.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCustomer.email)) {
      newErrors.email = 'Email should be valid (e.g., user@example.com)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create customer');
      }
      
      mutate();
      handleClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDisplayName = (customer: Customer) => {
    return customer.businessName || `${customer.firstName} ${customer.lastName}`;
  };

  return (
    <>
      <Head>
        <title>Dwolla | Customers</title>
      </Head>
      <main>
        <Box sx={{ p: 3 }}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
  
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Error: {error.message}
            </Alert>
          )}
  
          {data && (
            <TableContainer 
              component={Paper}
              sx={{
                maxWidth: '66%',
                mx: 'auto'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    borderBottom: 'none',
                    '& .MuiTableCell-root': {
                      paddingBottom: 0
                    }
                  }}>
                    <TableCell colSpan={2} sx={{ borderBottom: 'none', py: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                      }}>
                        <Typography variant="h6" component="div">
                          {data.length} Customers
                        </Typography>
                        <Button 
                          variant="contained" 
                          endIcon={<AddRounded />}
                          onClick={handleOpen}
                          size="small"
                          sx={{ textTransform: 'none' }}
                        >
                          Add Customer
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {data.map(customer => (
                    <TableRow key={customer.email}>
                      <TableCell>{getDisplayName(customer)}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
  
  <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Add Customer</DialogTitle>
  <form onSubmit={handleSubmit}>
    <DialogContent>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <Box sx={{ 
        display: 'flex', 
        gap: 2,
        mb: 2
      }}>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name *"
          type="text"
          variant="outlined"
          value={newCustomer.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          sx={{ flex: 1 }}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name *"
          type="text"
          variant="outlined"
          value={newCustomer.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          sx={{ flex: 1 }}
        />
        <TextField
          margin="dense"
          name="businessName"
          label="Business Name"
          type="text"
          variant="outlined"
          value={newCustomer.businessName}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </Box>
      <TextField
        margin="dense"
        name="email"
        label="Email *"
        type="email"
        fullWidth
        variant="outlined"
        value={newCustomer.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </DialogActions>
  </form>
</Dialog>
        </Box>
      </main>
    </>
  );
};

export default Home;