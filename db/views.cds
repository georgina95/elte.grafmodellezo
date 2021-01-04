namespace views;

using elte.grafmodellezo as grafmodellezo from './data-model';


define view place_types as select distinct place_type as name from grafmodellezo.Places;

define view countries as
    select distinct
        country,
        country_code
    from grafmodellezo.Places;

define view graf1_nodes as
    select
    from (
        select text as id, text as text, COUNT( * ) as frequency : Integer
        from grafmodellezo.Hashtags
        group by text
    ) subquery
    {
        key id,
        text,
        frequency,
        case when frequency >= 20 then 'superpopular'
            when frequency < 20 AND frequency > 5 then 'popular'
            else 'unpopular'
            end AS frequency_group : String
    };


define view graf1_edges as
    SELECT EDGES1.from_text as source, EDGES1.to_text as target, (EDGES1.num + EDGES2.num)/2 AS value : Integer
    FROM (
        SELECT T1.text AS from_text, T2.text AS to_text, COUNT(*) AS num : Integer
        FROM 
            grafmodellezo.Hashtags AS T1
            INNER JOIN
            grafmodellezo.Hashtags AS T2
            ON T1.tweet_id = T2.tweet_id
        WHERE T1.text <> T2.text
        GROUP BY T1.text, T2.text
    ) AS EDGES1
    INNER JOIN (
        SELECT T1.text AS from_text, T2.text AS to_text, COUNT(*) AS num : Integer
        FROM 
            grafmodellezo.Hashtags AS T1
            INNER JOIN
            grafmodellezo.Hashtags AS T2
            ON T1.tweet_id = T2.tweet_id
        WHERE T1.text <> T2.text
        GROUP BY T1.text, T2.text
    ) AS EDGES2
    ON EDGES1.from_text = EDGES2.to_text
        AND EDGES1.to_text = EDGES2.from_text;

define view graf2_nodes as
    SELECT
    from (
        SELECT text as id, text, COUNT(*) AS frequency : Integer, 
                SUM(tweet.user.followers_count) as popularity : Integer
        FROM grafmodellezo.Hashtags 
        GROUP BY text
    ) subquery
    {
        key id,
        text,
        frequency,
        popularity,
        case when popularity >= 100000 then 'superpopular'
            when popularity < 100000 AND popularity > 1000 then 'popular'
            else 'unpopular'
            end AS popularity_group : String
    };




