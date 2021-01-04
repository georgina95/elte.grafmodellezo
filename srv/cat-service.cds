using { elte.grafmodellezo } from '../db/data-model';
using views as views from '../db/views';

service CatalogService {
    entity Tweets as projection on grafmodellezo.Tweets{     
        * ,
        place : redirected to Places,
        user : redirected to Users,
        hashtags : redirected to Hashtags,
        mentions : redirected to Mentions
    };
    entity Users as projection on grafmodellezo.Users{     
        * ,
        tweets : redirected to Tweets
    };
    entity Places as projection on grafmodellezo.Places{     
        * ,
        tweets : redirected to Tweets
    };
    entity Hashtags as projection on grafmodellezo.Hashtags{     
        * ,
        tweet : redirected to Tweets
    };
    entity Mentions as projection on grafmodellezo.Mentions{     
        * ,
        tweet : redirected to Tweets,
        mentioned : redirected to Users
    };

    //entity Graf1 as projection on views.Graf1;

    entity place_types as projection on views.place_types{
        *,
    	key name
    };

    entity countries as projection on views.countries{
        *,
    	key country_code
    };

    entity graf1_nodes as projection on views.graf1_nodes;

    entity graf1_edges as projection on views.graf1_edges{
        *,
    	key source,
        key target
    };

    entity graf2_nodes as projection on views.graf2_nodes;
}