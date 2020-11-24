using {elte.grafmodellezo as gm} from '../db/schema';

service CatalogService {
    entity Tweets   as projection on gm.Tweets
    entity Users    as projection on gm.Users
    entity Places   as projection on gm.Places
    entity Hashtags as projection on gm.Hashtags
    entity Mentions as projection on gm.Mentions
}

annotate CatalogService.Tweets with @(UI : {
    HeaderInfo: {
        TypeName       : 'Tweet',
        TypeNamePlural : 'Tweets',
        Title          : {Value : id},
        Description    : {Value : text}
    },
    SelectionFields: [ id, text, user.name ],
    LineItem: [
        {Value : id},
        {Value : text},
        {Value : user.name},
        {Value : place.name},
        {Value : created_at}
    ],
    Facets           : [{
        $Type  : 'UI.CollectionFacet',
        Label  : 'Tweet Info',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Main',
            Label  : 'Main Facet'
        }]
    }],
    FieldGroup #Main : {Data : [
        {Value : id},
        {Value : text},
        {Value : user.name},
        {Value : place.name},
        {Value : created_at}
    ]}
});