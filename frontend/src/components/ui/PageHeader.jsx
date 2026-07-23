import { Box, Typography, Stack, Breadcrumbs, Link as MuiLink } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

export default function PageHeader({ title, subtitle, breadcrumbs = [], action }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" sx={{ color: "text.disabled" }} />}
          sx={{ mb: 1.5, "& .MuiBreadcrumbs-li": { fontSize: "0.8125rem" } }}
        >
          <MuiLink
            component={Link}
            to="/admin/dashboard"
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, fontWeight: 500 }}
          >
            <HomeOutlinedIcon sx={{ fontSize: 16 }} />
            Home
          </MuiLink>
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={idx} variant="caption" color="primary.main" fontWeight={600}>
                {crumb.label}
              </Typography>
            ) : (
              <MuiLink
                key={idx}
                component={Link}
                to={crumb.path || "#"}
                underline="hover"
                color="inherit"
                fontWeight={500}
              >
                {crumb.label}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      )}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            color="text.primary"
            sx={{ letterSpacing: "-0.02em", fontSize: { xs: "1.35rem", sm: "1.85rem", md: "2.125rem" } }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        {action && <Box>{action}</Box>}
      </Stack>
    </Box>
  );
}
