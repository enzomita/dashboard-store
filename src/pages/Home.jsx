import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useMediaQuery } from "@mui/material";
import { apiConfig } from "../api/apiConfig";
import { useAxios } from "../hooks/useAxios";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from '@mui/icons-material/Add';
import Animate from "../components/Animate";
import AddProduct from "../components/AddProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Home = () => {

  const [layoutGrid, setLayoutGrid] = useState('panel');
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productToBeDeleted, setProductToBeDeleted] = useState(null);

  const { data: products = [], loading, refreshCall } = useAxios({
    url: apiConfig.getProducts,
    method: 'get',
  });

  const { res: responseDelete, err: errorDelete, loading: loadingDelete, triggerFetch, reInitState } = useAxios({}, false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isUpDesktop = useMediaQuery(theme.breakpoints.up("md"), {
    noSsr: true
  });


  const handleProductDelete = () => {
    triggerFetch({ 
      url: apiConfig.deleteProduct(productToBeDeleted),
      method: 'delete',
    })
  }

  return (
    <>

      <Grid container mb={5}>
        <Grid item xs={12} sm={6}>
          <Animate animation="fadeInTop">
            <Typography variant="h4" mb={2}>Elenco prodotti</Typography>
          </Animate>
        </Grid>
        {isUpDesktop && (
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <Animate animation="fadeInRight">
                {layoutGrid === 'panel' ? (
                  <Button variant="outlined" color="secondary" startIcon={<GridViewIcon />} onClick={() => setLayoutGrid("grid")}>
                    Griglia
                  </Button>
                ) : (
                  <Button variant="outlined" color="secondary" startIcon={<TableRowsIcon />} onClick={() => setLayoutGrid("panel")}>
                    Pannello
                  </Button>
                )}
              </Animate>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} mb={3}>
          <Animate animation="fadeInLeft">
            <Button variant="contained" color="secondary" sx={{ color: theme.palette.primary.contrastText}} startIcon={<AddIcon />} onClick={() => setAddProductOpen(true)}>
              Aggiungi Prodotto
            </Button>
          </Animate>
        </Grid>
      </Grid>
      

      {loading && (
        <Loader></Loader>
      )}

      {products && (
        <Grid container spacing={5}>

        {products && products.map(product => (
          <React.Fragment key={`${product.id}`}>

            <Grid item xs={layoutGrid === 'panel' ? 12 : 4}>
              <ProductCard 
                product={product.data} 
                onClickCard={() => navigate(`/detail/${product.id}`)} 
                gridstyle={layoutGrid}
                onDelete={() => setProductToBeDeleted(product.id)}
              ></ProductCard>
            </Grid>
           
          </React.Fragment>
        ))}

        </Grid>
      )}

      <AddProduct 
        open={addProductOpen} 
        onClose={() => setAddProductOpen(false)} 
        onCloseAfterApi={() =>{ setAddProductOpen(false), refreshCall(); }}
      ></AddProduct>

      <Dialog
        open={!!productToBeDeleted}
        onClose={() => {}}
        fullWidth
      >
        <DialogTitle>
          ELIMINA PRODOTTO
        </DialogTitle>
        {!responseDelete && !errorDelete && (
          <DialogContent>
            {!loadingDelete ? (
              <DialogContentText>
                {"Procedere con l'eliminazione del prodotto?"}
              </DialogContentText>
            ) : (
              <DialogContentText>
                <Loader></Loader>
                Eliminazione in corso ...
              </DialogContentText>
            )}
          </DialogContent>
        )}
        {responseDelete && (
           <DialogContent>
            <DialogContentText>
              <Alert severity="success">Prodotto rimosso con successo</Alert>
            </DialogContentText>
          </DialogContent>
        )}
        {errorDelete && (
          <Alert severity="error">
            Si è verificato un errore durante la rimozione del prodotto, riprovare più tardi:<br/>
            {errorDelete.message}
          </Alert>
        )}
        
        {!responseDelete && !errorDelete ? (
          <DialogActions>
            <Button 
              color="secondary" 
              onClick={() => setProductToBeDeleted(null)} 
              disabled={!!loadingDelete}
            >
              ANNULLA
            </Button>
            <Button 
              color="error" 
              variant="contained" 
              startIcon={<DeleteIcon></DeleteIcon>} 
              onClick={() => handleProductDelete()} 
              autoFocus 
              disabled={!!loadingDelete}
            >
              ELIMINA
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button 
              color="secondary"
              variant="contained"
              onClick={() => { setProductToBeDeleted(null); setTimeout(() => { reInitState() }, 500) }} 
            >
              OK
            </Button>
          </DialogActions>
        )}
        
      </Dialog>

    </>
  )
}

export default Home;