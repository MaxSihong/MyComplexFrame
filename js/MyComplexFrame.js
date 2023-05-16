/**
 * 类似商品规格列表
 * <script src="/static/js/MyComplexFrame.js"></script>
 */

 (function ($) {
    $.fn.myComplexFrame = function (options) {
        console.log('============== ' + this.selector + ' myComplexFrame 加载.... ==============')

        // 默认选项
        var settings = $.extend({
            _dom_id: this.selector,
            _func: options._func,
            _keys: $.map(options._form_data, function(obj) {
                return obj._keys;
            }),
            _form_data: options._form_data,
        }, options)

        var _keys = settings._keys
        var _list = [
            _keys.reduce(function (obj, item) {
                obj[item] = "";
                return obj;
            }, {})
        ];
        reloadListHtml()

        // 重载列表html
        function reloadListHtml() {
            let str = '';

            _list.forEach((item, index) => {
                str += `<div style="display: flex">`
                settings._form_data.forEach((fd, key) => {

                    str += `
                        <div class="mcf-item">
                            <span>${fd.name}:</span>
                            <input class="mcf-input" type="${fd.type}" value='${item[fd._keys]}' placeholder="${fd.placeholder}">
                        </div>&nbsp;
                    `
                })

                // 第一个不展示删除按钮
                str += index
                    ? `<button class="mcf-btn mcf-item-del-but" onClick="${settings._func}.$publicMethods.delItem(${index})">删除</button> &nbsp;</div>`
                    : `</div>`
            })

            $(settings._dom_id).html(str)
        }

        // 获取所有Items
        function getAllItemsVal() {
            let items_list = [];
            let result = [];

            // 获取商品dom内的所有input信息
            $(settings._dom_id + ' input').each(function (index) {
                items_list.push($(this).val())
            });
            // 因为每组有n个，所以进行n个分割为一组进行重组【自动根据商品列表拥有的字段数进行分割】
            for (let i = 0; i < items_list.length; i += _keys.length) {
                result.push(items_list.slice(i, i + _keys.length));
            }

            // 重置并重新写入数据
            _list = [];
            result.forEach((item) => {
                let assignment_items = {}

                $.each(_keys, function (index, key) {
                    assignment_items[key] = item[index]
                })

                _list.push(assignment_items)
            })

            return _list
        }

        this.$publicMethods = {
            // 添加 Item
            addItem: function () {
                // 获取所有 Items
                getAllItemsVal();
                // 添加一组 item
                _list.push(
                    _keys.reduce(function (obj, item) {
                        obj[item] = "";
                        return obj;
                    }, {})
                )
                // 重载列表html
                reloadListHtml();
            },

            // 删除 Item
            delItem: function (index) {
                // 获取所有Items
                getAllItemsVal();
                // 根据小标删除 index-下标 1-删除数量
                _list.splice(index, 1)
                // 重载列表html
                reloadListHtml();
            },

            getAllItemsVal,
        }

        return this;
    };

}(jQuery));