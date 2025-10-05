import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const PageContent = () => {
    return (
        <div className="page-content">
            <Routes>
                {routes.map((item, i) => {
                    return (
                        <Route
                            exact={true}
                            path={item.path}
                            key={i}
                            element={<item.component />}
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

export default PageContent;
