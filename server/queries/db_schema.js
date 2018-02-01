
const sql = require('sql');

exports.users = sql.define({
    name: 'users',
    columns: [
        'id',
        'name',
        'email',
        'hash',
        'salt',
        'bio'
    ]
});

exports.activities = sql.define({
    name: 'activities',
    columns: [
        'id',
        'name',
        'points',
        'type',
        'units',
        'source'
    ]
});

exports.uad = sql.define({
    name: 'user_activity_day',
    columns: [
        'id',
        'user',
        'activity',
        'day',
        'amount',
        'active'
    ]
})

exports.activity_league = sql.define({
    name: 'activity_league',
    columns: [
        'id',
        'activity',
        'league'
    ]
})

exports.user_league = sql.define({
    name: 'user_league',
    columns: [
        'id',
        'user',
        'league',
        'security level'
    ]
})
