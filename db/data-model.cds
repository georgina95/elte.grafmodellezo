namespace elte.grafmodellezo;

entity config {
  key name : String(12);
  value    : String(24);
}

entity Tweets {
    key id          : String          @title : 'TWEET ID';
        created_at  : Date          @title : 'CREATED';
        text        : String        @title : 'TWEET TEXT';
        sensitive   : Boolean       @title : 'SENSITIVE';

        place_id    : String          @title : 'PLACE';
        user_id     : String          @title : 'USER';

        place : Association[1..1] to Places on place.id = place_id;
        user : Association[1..1] to Users on user.id = user_id;
        hashtags : Association[*] to Hashtags on hashtags.tweet_id = id;
        mentions : Association[*] to Mentions on mentions.tweet_id = id;
}

entity Users {
    key id          : String          @title : 'USER ID';
        created_at  : Date          @title : 'CREATED';
        name        : String        @title : 'USERNAME';
        screen_name : String        @title : 'SCREEN_NAME';
        description : String        @title : 'DESCRIPTION';
        followers_count : Integer   @title : 'FOLLOWERS';
        statuses_count  : Integer   @title : 'STATUSES';
        location    : String        @title : 'LOCATION';

        tweets : Association[*] to Tweets on tweets.user_id = id;
}

entity Places {
    key id          : String          @title : 'PLACE ID';
        name        : String        @title : 'PLACE NAME';
        full_name   : String        @title : 'FULL NAME';
        country     : String        @title : 'COUNTRY';
        country_code: String        @title : 'COUNTRY CODE';
        place_type  : String        @title : 'PLACE TYPE';

        tweets : Association[*] to Tweets on tweets.place_id = id;
}

entity Hashtags {
    key text        : String        @title : 'TEXT';
    key tweet_id    : String          @title : 'TWEET';

    tweet : Association[1..1] to Tweets on tweet.id = tweet_id;
}

entity Mentions {
    key mentioned_user_id   : String          @title : 'MENTIONED_USER';
    key tweet_id            : String          @title : 'TWEET';

    tweet : Association[1..1] to Tweets on tweet.id = tweet_id;
    mentioned: Association[1..1] to Users on mentioned.id = mentioned_user_id;
}