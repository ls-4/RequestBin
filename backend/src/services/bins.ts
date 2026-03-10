import { nanoid } from 'nanoid';
import { ApiError } from '../errors.js';
import type { Request } from 'express';
import type { CreateBinAPIResponse } from '../types/types.js';

import db from '../services/db/index.js';

export const createBin = async (): Promise<CreateBinAPIResponse> => {
  const bin_route = nanoid(8);
  const token = nanoid(32);

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
