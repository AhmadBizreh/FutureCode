import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../pages/Layout/Layout";
import HomePage from "../pages/Home/Home";
import QuestionStepper from "../pages/Stepper/Stepper";
import { ShowDataPage } from "../pages/ShowData/ShowDataPage";


export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/stepper" element={<QuestionStepper />} />
                    <Route path="/show" element={<ShowDataPage />} />
                    <Route path="/*" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
