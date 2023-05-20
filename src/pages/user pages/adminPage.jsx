import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AdminPage() {
  const classes = useStyles();
  return (
    <Container fluid>
        <h1>Welcome to Admin Page</h1>
      <Row>
        <Col md={9}>
          <Paper className={classes.root}>
            <Typography variant="h5"></Typography>
            
          </Paper>
          <Paper style={{}}>
            
          </Paper>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
