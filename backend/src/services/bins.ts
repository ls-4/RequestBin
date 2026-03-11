import { ApiError } from '../errors.js';
import type { Request } from 'express';
import type { CreateBinAPIResponse } from '../types/types.js';
import { nanoid } from 'nanoid';

import db from '../services/db/index.js';

export const createBin = async (bin_route: unknown): Promise<CreateBinAPIResponse> => {
  if (!bin_route) {
    throw new ApiError(400, 'Invalid JSON: "bin_route" is required.');
  }

  if (typeof bin_route !== 'string') {
    throw new ApiError(400, 'Invalid JSON: "bin_route" must be a string.');
  }

  const existing = await db.bins.getByRoute(bin_route);
  if (existing) {
    throw new ApiError(409, `Bin with route ${bin_route} already exists.`);
  }

  const token = nanoid();
  await db.bins.create(bin_route, token);

  return {
    bin_route,
    token
  };
}

export const deleteBin = async (binRoute: string, req: Request): Promise<void> => {
  const bin = await db.bins.getByRoute(binRoute);
  if (!bin) {
    throw new ApiError(404, `Bin with route ${binRoute} not found.`);
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new ApiError(401, 'Unauthorized: No token provided');
  }

  const [scheme, token] = authHeader.split(' ');
  const isAuthorized = scheme === 'Bearer' && token === bin.token;
  if (!isAuthorized) {
    throw new ApiError(401, 'Unauthorized: Token invalid');
  }

  const deleted = await db.bins.delete(bin.id);
  if (!deleted) {
    throw new ApiError(500, 'Failed to delete bin');
  }
}
