using { CatalogService } from './cat-service';

// Re-run the following command after changing any @(requires: []) definition
// Run this from the root of the project.
// cds compile srv/ --to xsuaa,json > cds-security.json

annotate CatalogService with @(requires: ['system-user','Admin','User']);

annotate CatalogService.Tweets with @(restrict: [
  { grant: ['READ','DELETE'], to: 'Admin' }, 
  { grant: ['READ'], to: 'User' }
]);
annotate CatalogService.Users with @(restrict: [
  { grant: ['READ','DELETE'], to: 'Admin' }, 
  { grant: ['READ'], to: 'User' }
]);
annotate CatalogService.Places with @(restrict: [
  { grant: ['READ','DELETE'], to: 'Admin' }, 
  { grant: ['READ'], to: 'User' }
]);
annotate CatalogService.Hashtags with @(restrict: [
  { grant: ['READ','DELETE'], to: 'Admin' }, 
  { grant: ['READ'], to: 'User' }
]);
annotate CatalogService.Mentions with @(restrict: [
  { grant: ['READ','DELETE'], to: 'Admin' }, 
  { grant: ['READ'], to: 'User' }
]);

