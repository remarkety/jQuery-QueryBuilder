/**
 * @module BtSelectpickerPlugin
 * @descriptioon Applies Bootstrap Select on filters and operators combo-boxes.
 */

/**
 * @function init
 * @memberof module:BtSelectpickerPlugin
 * @param {object} [options]
 * @throws MissingLibraryError
 */
QueryBuilder.define('rm-datepicker', function(options) {
    var Selectors = QueryBuilder.selectors;
    if (!$.fn.datetimepicker || !$.fn.datetimepicker.constructor) {
        Utils.error('MissingLibrary', 'datetimepicker is required to use "rm-datepicker" plugin.');
    }

    this.on('afterCreateRuleInput', function(e, rule) {
        if(rule.filter.type === "date" || rule.filter.type === "datetime") {
            if(!rule.operator.input_type || rule.operator.input_type !== "integer"){
                var $inputs = rule.$el.find(Selectors.value_container).find('input');
                $inputs.datetimepicker(options);
                $inputs.on('dp.change', function(e){
                    $(this).trigger('change');
                });
            }
        }
    });

    this.on('afterUpdateRuleOperator', function(e, rule) {
        if(rule.filter.type === "date" || rule.filter.type === "datetime") {
            var $inputs = rule.$el.find(Selectors.value_container).find('input');
            console.log($inputs);
            $inputs.val('');
            if(!rule.operator.input_type || rule.operator.input_type !== "integer"){
                $inputs.datetimepicker(options);
                $inputs.on('dp.change', function(e){
                    $(this).trigger('change');
                });
            } else {

                $inputs.each(function(){
                    if($(this).data("DateTimePicker") && typeof $(this).data("DateTimePicker").destroy === "function"){
                        $(this).data("DateTimePicker").destroy();
                        $(this).val('');
                    };
                });
            }
        }
    });

}, {format: "YYYY-MM-DD"});
