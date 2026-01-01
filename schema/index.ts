// Export all schemas for Sanity Studio
import { serviceSchema } from './service';
import { newsItemSchema } from './newsItem';
import { navigationSchema } from './navigation';

export const schemaTypes = [serviceSchema, newsItemSchema, navigationSchema];

