import { Routes, Route } from 'react-router-dom';
import CountryView from './views/country/CountryView';
import CountryDetailView from './views/country/CountryDetailView';
import HeaderPx from './components/HeaderPx';

export default function App() {
  return (
    <>
      <HeaderPx />

      <Routes>
        <Route path="/" element={<CountryView />} />
        <Route path="/country/:code" element={<CountryDetailView />} />
      </Routes>
    </>
  );
}
