import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Chip, Grid, useMediaQuery, useTheme } from '@mui/material';
import { CardProduct } from './styles';

const ProductCard = ({ product, onClickCard, gridstyle, onDelete }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true
  });

  return (
    <CardProduct $gridStyle={gridstyle} $isMobile={isMobile}>
      <CardContent>
        <Grid container>

          <Grid item xs={12} sm={6}>
            {product.title && (
              <>
                <Typography variant="h5" gutterBottom>
                  {product.title}
                </Typography>
                <Chip label={product.category} color="secondary" variant="outlined" size="small" />
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {product.price ? (
              <Box sx={{ textAlign: isMobile ? "left" : "right", mt: isMobile ? 2 : 0}}>
                <Typography variant="h4" gutterBottom>
                  <strong>{product.price} €</strong>
                </Typography>
              </Box>
            ) : <></>}
          </Grid>
          {!isMobile && (
            <Grid item xs={12} mt={2}>
              {product.description && (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Descrizione
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {product.description}
                  </Typography>
                </>
              )}
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="large" onClick={onClickCard} endIcon={<ArrowForwardIcon />}>Dettaglio</Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete()}>
          Elimina
        </Button>
      </CardActions>
    </CardProduct>
  )
}

export default ProductCard;