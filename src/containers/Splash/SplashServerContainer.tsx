import SplashClientContainer from "./SplashClientContainer";
import SplashServerBlock from "./SplashServerBlock";

export default function SplashServerContainer() {
  return (
    <SplashClientContainer>
      <SplashServerBlock />
    </SplashClientContainer>
  );
}
