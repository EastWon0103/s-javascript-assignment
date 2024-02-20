import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/home/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CampaignDetailPage from './page/campaignDetail/campaignDetail';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
