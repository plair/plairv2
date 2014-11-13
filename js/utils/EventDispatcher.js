define(['underscore', 'backbone'], function (_, Backbone) {
    var EventDispatcher = _.extend({}, Backbone.Events);
    return EventDispatcher;
});
