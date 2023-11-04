import AppRouter from "@/route/AppRouter";
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppRouter></AppRouter>
    </Provider>
  );
}