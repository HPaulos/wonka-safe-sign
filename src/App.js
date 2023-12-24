import { ChakraProvider } from "@chakra-ui/react"
import Chat from "./pages/chat";

function App() {
  return (
    <ChakraProvider>
      <Chat />
    </ChakraProvider>
  );
}

export default App;
