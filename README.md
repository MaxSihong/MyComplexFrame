<h1 align="left"><a href="https://github.com/MaxSihong/MyComplexFrame">类似商品规格列表</a></h1>

📦 一个表单功能的小组件

<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/MaxSihong/MyComplexFrame"></img>
<img alt="license" src="https://img.shields.io/badge/license-MIT-blue"></img>

## 在线体验
[Link](https://htmlpreview.github.io/?https://github.com/MaxSihong/MyComplexFrame/blob/master/index.html)

## 示例

![img](https://github.com/MaxSihong/MyComplexFrame/blob/master/images/example.gif)

## 使用方式

1. 添加样式
   ```css
    .mcf-panel-body {
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .mcf-item {
        width: 230px;
    }

    .mcf-label {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .mcf-label label {
        font-weight: bold;
        margin-right: 10px;
    }

    .mcf-btn {
        border: solid 1px #ddd;
        background: transparent;
        border-radius: 4px;
        font-size: 14px;
        padding: 6px 15px;
        margin: 0;
        display: inline-block;
        line-height: 20px;
        transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1) 0s
    }

    .mcf-btn:hover {
        background-color: grey;
    }

    .mcf-input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-right: 10px;
        width: 100%;
        max-width: 200px;
    }

    .mcf-item-del-but {
        width: 60px;
        padding: 0;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        margin-top: 28px;
    }
   ```

2. 添加 `div` 盒子、添加按钮、还有主要的表单列表 `id="items_list"` ;注意 `onclick` 内的 `ComplexFrame` 为js实例化赋值的变量名
    ```html
    <div class="mcf-panel-body">
        <div class="mcf-label">
            <label>下单商品：</label>
            <button class="mcf-btn" onclick="ComplexFrame.$publicMethods.addItem()">添加</button>
        </div>

        <div>
            <div id="itesm_list">
            </div>
        </div>

        <p><button class="mcf-btn" onclick="placeOrder()">下单</button></p>
    </div>
    ```

3. 引入`jQuery`和`组件的jQuery`
   ```html
    <script src="js/jquery.js"></script>
    <script src="js/MyComplexFrame.js"></script>
   ```

4. 实例化组件
   ```javascript
   var ComplexFrame = $('#items_list').myComplexFrame({
        '_func': 'ComplexFrame', // 当前定义的变量，方便渲染时进行调用内部方法
        '_form_data': [{
                'name': '微店商品订单ID', // item 名称
                'type': 'text', // 表单类型
                'placeholder': '字段：sub_order_id', // 输入框提示
                '_keys': 'sub_order_id', // name名称
            },
            {
                'name': '商品编码',
                'type': 'text',
                'placeholder': '字段：merchant_code',
                '_keys': 'item_code',
            },
        ]
    });

    // 多个则直接另外实例化即可，主要列表id和赋值的变量名要传入
   var ComplexFrame2 = $('#items_list2').myComplexFrame({
        '_func': 'ComplexFrame2', // 当前定义的变量，方便渲染时进行调用内部方法
        '_form_data': [{
                'name': '微店商品订单ID', // item 名称
                'type': 'text', // 表单类型
                'placeholder': '字段：sub_order_id', // 输入框提示
                '_keys': 'sub_order_id', // name名称
            },
            {
                'name': '商品编码',
                'type': 'text',
                'placeholder': '字段：merchant_code',
                '_keys': 'item_code',
            },
        ]
    });
   ```

5. 表单提交获取参数
   ```javascript
   function placeOrder() {
        ComplexFrame.$publicMethods.getAllItemsVal();
        let data = {
            items: ComplexFrame.$publicMethods.getAllItemsVal()
        }

        console.log('下单数据', data)
    }
   ```

## License

MIT
