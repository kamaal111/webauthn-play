import type { PrismaClient } from '@prisma/client';
import type { Request, Router } from 'express';

export interface AppRouter {
  path: string;
  router: Router;
  injectRouteContext: (context: { prisma: PrismaClient }) => void;
}

export type AppRequest<
  Params = Record<string, unknown>,
  ResponseBody = Record<string, unknown>,
  RequestBody = Record<string, unknown>,
  RequestQuery = qs.ParsedQs,
> = Request<Params, ResponseBody, RequestBody, RequestQuery>;
