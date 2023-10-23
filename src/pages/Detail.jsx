import { useNavigate, useParams } from "react-router-dom";
import { apiConfig } from "../api/apiConfig";
import { useAxios } from "../hooks/useAxios";
import Loader from "../components/Loader";
import { Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Animate from "../components/Animate";
import { useTheme } from "@emotion/react";

const Detail = () => {

  let { productId } = useParams();
  const navigate = useNavigate();

  const { data: product, loading } = useAxios({
    url: apiConfig.getProduct(productId),
    method: 'get',
  });

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true
  });

  return (
    <>
      {loading && (
        <Loader></Loader>
      )}
      {product && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Animate animation="fadeInTop">
                  <Typography variant="h6">{product.title}</Typography>
                </Animate>
              </Box>
              <Animate animation="fadeInLeft">
                <Button variant="contained" color="secondary" sx={{ color: theme.palette.primary.contrastText }} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                  {!isMobile ? 'Dashboard' : ''}
                </Button>
              </Animate>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 5 }}>
            <Grid item sm={3}></Grid>
            <Grid item sm={6}>
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">Categoria:</Typography>
                <Typography variant="body1">{product.category || "/"}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">Prezzo:</Typography>
                <Typography variant="body1">{product.price || "0"} €</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">Dipendente:</Typography>
                <Typography variant="body1">{product.employee || "/"}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">Descrizione:</Typography>
                <Typography variant="body1">{product.description || "/"}</Typography>
              </Box>
            </Grid>
            <Grid item sm={3}></Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center" }} mt={2} mb={3}>
                <Typography variant="h6" >Recensioni:</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              {product.reviews && Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                <Animate animation="fadeInRight">
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: "0 auto" }}>
                    {product.reviews.map((review, index) => (
                      <ListItem key={`review-${index}`}>
                        <ListItemAvatar>
                          <Avatar>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={review} />
                      </ListItem>
                    ))}
                  </List>
                </Animate>
              ) : (
                <>
                  <Typography variant="body1" sx={{ textAlign: "center" }}>Nessuna recensione disponibile</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default Detail;