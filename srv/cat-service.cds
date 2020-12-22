using { elte.grafmodellezo } from '../db/data-model';

service CatalogService {
  entity Tweets @readonly as projection on grafmodellezo.Tweets;
  entity Users @readonly as projection on grafmodellezo.Users;
  entity Places @readonly as projection on grafmodellezo.Places;
  entity Hashtags @readonly as projection on grafmodellezo.Hashtags;
  entity Mentions @readonly as projection on grafmodellezo.Mentions;
}