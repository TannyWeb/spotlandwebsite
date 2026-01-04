// Export all schemas for Sanity Studio
import { serviceSchema } from './service';
import { navigationSchema } from './navigation';
import { postSchema } from './post';

export const schemaTypes = [serviceSchema, navigationSchema, postSchema];

