import PreferenceClientContainer from "./PreferenceClientContainer";
import PreferenceServerBlock from "./PreferenceServerBlock";

export default function PreferenceServerContainer() {
  return (
    <PreferenceClientContainer>
      <PreferenceServerBlock />
    </PreferenceClientContainer>
  );
}
