import { AuthProvider } from "./context/AuthContext.jsx";
import AppRouter from "./routes/AppRouter.jsx";


// ======================================
// APP
// ======================================

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};


export default App;