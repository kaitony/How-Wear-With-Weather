import MainClientContainer from "./MainClientContainer";
import MainServerBlock from "./MainServerBlock";

export default function MainServerContainer() {
  return (
    <MainClientContainer>
      <MainServerBlock />
    </MainClientContainer>
  );
}
