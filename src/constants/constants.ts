import * as Sentry from "@sentry/react";

export const SENTRY_DSN =
  "https://0866ef6ab90ee5bc68d6a96d2a5d30ee@o4508454618071040.ingest.de.sentry.io/4508454619512912";

export const SENTRY_CONFIG = {
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
};

export const POSTHOG_API_KEY =
  "phc_HZAi3RQrfrpoW2iE57JPVoaehhHth4kpLvgUSK0vO8o";

export const POSTHOG_CONFIG = {
  api_host: "https://eu.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
};
