import * as React from "react";
import { ColorModeButton } from "../ColorModeButton";
import {
  ThemeProvider,
  responsiveFontSizes,
  createTheme,
  styled,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../ThemeHandler";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Toolbar,
  Stack,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Header } from "../Header";
import { graphql, useStaticQuery } from "gatsby";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Layout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const { colorMode } = React.useContext(ColorModeContext);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const { allStrapiConfig } = useStaticQuery(graphql`
    query header {
      allStrapiConfig {
        edges {
          node {
            subtitle
            title
          }
        }
      }
    }
  `);

  if (!colorMode) {
    return null;
  }

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{ zIndex: "1201" }}
          component="div"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
              >
                {!openDrawer ? (
                  <MenuIcon />
                ) : theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </Box>
            <ColorModeButton />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            flexDirection: "column",
          }}
          variant="persistent"
          anchor="left"
          open={openDrawer}
        >
          <Stack
            direction="column"
            justifyContent="top"
            alignItems="stretch"
            spacing={5}
            mt={{ xs: "48px", md: "64px" }}
            flex={1}
          >
            <Header
              title={allStrapiConfig.edges[0].node.title}
              subtitle={allStrapiConfig.edges[0].node.subtitle}
            />
          </Stack>
          <Typography component="strong" variant="subtitle2" p={1}>
            &copy; Alexandru Gorgos
          </Typography>
        </Drawer>
        <Main
          open={openDrawer}
          theme={theme}
          sx={{ height: "100vh", width: "100%", paddingY: "64px" }}
        >
          {children}
        </Main>
      </Box>
    </ThemeProvider>
  );
};

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
