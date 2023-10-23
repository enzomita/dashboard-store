import { useTheme } from "@mui/material"
import { LoaderContainer, LoaderEl } from "./styles"

const Loader = () => {
  const theme = useTheme();

  return (
    <LoaderContainer>
      <LoaderEl theme={theme}></LoaderEl>
    </LoaderContainer>
  )
}

export default Loader