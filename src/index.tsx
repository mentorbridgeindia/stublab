import * as Sentry from "@sentry/react";
import posthog, { PostHogConfig } from "posthog-js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

import {
  POSTHOG_API_KEY,
  POSTHOG_CONFIG,
  SENTRY_CONFIG,
  SENTRY_DSN,
} from "./constants/constants";

Sentry.init({
  dsn: SENTRY_DSN,
  ...SENTRY_CONFIG,
});

posthog.init(POSTHOG_API_KEY, POSTHOG_CONFIG as Partial<PostHogConfig>);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
