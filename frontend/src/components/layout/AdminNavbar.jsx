import React, { useState } from "react";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
  Chip,
} from "@mui/material";
import { Menu, Logout } from "@mui/icons-material";
import {
  LayoutDashboard,
  UserCheck,
  NotepadText,
  Users,
  Settings,
  Home,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/auth.context";

const drawerWidth = 240;

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser, logout } = useAuth();
  const userFromLs = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleLogout = () => {
    logout()
    navigate("/");
    toast.success("Logged out successfully");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Leads", href: "/admin/leads", icon: <UserCheck size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },

  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: "bold", color: "primary.main" }}>
          Sales Lead
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.href}
              selected={location.pathname.startsWith(item.href)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white", // or "transparent"
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {user?.name}
          </Typography>
          <Box textAlign="right" mr={2}>
            <Typography variant="caption" color="text.secondary">
              <Chip
                label={user?.role || "User"}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Typography>
            <Typography variant="body1">{userFromLs?.user.name}</Typography>

          </Box>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
<Box
  component="main"
  sx={(theme) => ({
    flexGrow: 1,
    width: '100%',
    // px: { xs: 1, sm: 2, md: 3 },   // Responsive padding
    pt: { xs: 1, sm: 1 },
    pb: 2,
    overflow: 'hidden',

    // ✅ Only apply drawer offset on large screens and up
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  })}
>

        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
