# Shared packages

Packages contain code with more than one real consumer. Keep this directory intentionally small.

Initial candidate: contracts/, containing shared Zod schemas and transport types consumed by web and API.

Do not move code into a shared package merely because it could theoretically be reused. Avoid generic utils packages and backend persistence models in frontend code.
