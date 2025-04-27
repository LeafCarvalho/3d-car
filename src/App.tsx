import { useEffect } from "react";
import { Home } from "./pages/Home";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.isInitialized) {
      document.title = t('title');
    }
  }, [i18n.isInitialized, i18n.language, t]);

  return <Home />;
}

export default App;
