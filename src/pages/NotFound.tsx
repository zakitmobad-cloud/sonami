import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Container, Typography, Button, Box } from '@mui/material';
import { Home } from '@mui/icons-material';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
          Oops! Page not found
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home />}
        >
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
