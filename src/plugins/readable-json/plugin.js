/**
 * Created by bnaya on 4/3/17.
 */
QueryBuilder.define('readable-json', function(options) {
    var qb = this;
    console.debug('readable-json plugin loaded');
    this.on('ruleToJson.queryBuilder.filter', function (e, rule) {
        e.value.readableValue = rule.textValue || e.value.value;
        e.value.readableField = rule.filter.label || e.value.field;
        e.value.readableOperator = qb.lang.operators[e.value.operator] || e.value.operator;
    });
});
