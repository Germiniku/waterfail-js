# waterfail-js

纯 javascript 版本 图片瀑布流实现

![avatar](https://github.com/Germiniku/waterfail-js/blob/main/show.png)

#### Demo 启动方式

```
cd server
yarn install
yarn start
```

#### 使用说明

```
<script type="text/javascript">
    new Waterfall('js-wrap',{ // 最外层div的classname
        column: 5, // 一行显示多少张图片
        gap: 10, // 图片间隙间隔
    }).init()
</script>
```
