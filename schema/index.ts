// Export all schemas for Sanity Studio
import { serviceSchema } from './service';
import { navigationSchema } from './navigation';
import { postSchema } from './post';
import { teamMemberSchema } from './teamMember';
import { partnerSchema } from './partner';
import { aboutPageSchema } from './aboutPage';

export const schemaTypes = [
  serviceSchema,
  navigationSchema,
  postSchema,
  teamMemberSchema,
  partnerSchema,
  aboutPageSchema,
];

