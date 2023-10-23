import { AnimationFadeIn, AnimationFadeInLeft, AnimationFadeInRight, AnimationFadeInTop } from "./styles";

const Animate = ({ children, animation, sx }) => {

  const renderAnimation = () => {
    switch(animation) {
      case "fadeInLeft":
        return <AnimationFadeInLeft style={sx}>{children}</AnimationFadeInLeft>
      case "fadeInRight":
        return <AnimationFadeInRight style={sx}>{children}</AnimationFadeInRight>
      case "fadeInTop":
        return <AnimationFadeInTop style={sx}>{children}</AnimationFadeInTop>
      default:
        return <AnimationFadeIn style={sx}>{children}</AnimationFadeIn>
    }
  }
  
  return (
    <>
      {renderAnimation()}
    </>
  )
}

export default Animate;