import ReactDOM from "react-dom";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("app")
);
