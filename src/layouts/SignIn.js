import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../config/firebase";
import {
  useDispatch,
  useSelector
} from "react-redux";


import { loginUser } from "../reducer/userReducer";

function Copyright(props) {
  // const history = useHistory()
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">PARTYFIXER</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({ setAdminAuth, setcallCenterAuth, setUserAuth }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  React.useEffect(() => {
    const collectionProduct = collection(db, "adminRole");
    const unsub1 = onSnapshot(collectionProduct, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUser(data);
    });

    return unsub1;
  }, []);



  const submit = () => {
    user.map((data) => {
      if (data.email === values.email && data.password === values.password && data.type === 'admin') {
        // setAdminAuth(true)
        dispatch(loginUser(true))
        setTimeout(() => {

          history.push("/login");
        }, 1000)
      }

      else if (data.email === values.email && data.password === values.password && data.type === 'user') {
        // setUserAuth(true)
        dispatch(loginUser(true))
        setTimeout(() => {
          history.push("/loginUser");
        }, 1000)
      }

      else if (data.email === values.email && data.password === values.password && data.type === 'callCenter') {
        // setcallCenterAuth(true)
        dispatch(loginUser(true))
        setTimeout(() => {
          history.push("/loginCall");
        }, 1000)
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              onChange={handleChange("email")}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange("password")}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => submit()}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
