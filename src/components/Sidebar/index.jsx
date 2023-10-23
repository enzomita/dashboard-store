import { SidebarContainer } from "./styles"
import { Button } from "@mui/material";
import Animate from "../Animate";
import { useTheme } from "@emotion/react";

const Sidebar = () => {

  const theme = useTheme();

  return (
    <> 
      <SidebarContainer style={{ backgroundColor: theme.palette.primary.dark}}>
        <Animate>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Aggiungi Prodotto</Button>
        </Animate>
        <Animate>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Aggiungi Prodotto</Button>
        </Animate>
      </SidebarContainer>
    </>
  )
}

export default Sidebar