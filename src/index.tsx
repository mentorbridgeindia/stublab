import * as Sentry from "@sentry/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import App from "./App";
import {
  GOOGLE_ANALYTICS_CODE,
  SENTRY_CONFIG,
  SENTRY_DSN,
} from "./constants/constants";
import ErrorBoundary from "./ErrorBoundary";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { PostHogProvider} from 'posthog-js/react'


ReactGA.initialize(GOOGLE_ANALYTICS_CODE);
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

Sentry.init({
  dsn: SENTRY_DSN,
  ...SENTRY_CONFIG,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PostHogProvider 
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY ??""}
      options={options}
    >
    </PostHogProvider>
    <ErrorBoundary>
      <App />
      <SpeedInsights />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
