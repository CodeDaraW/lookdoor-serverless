# 守望领域一键开门 Node.js Serverless 版本
![](https://vercelbadge.vercel.app/api/codedaraw/lookdoor-serverless)  

## 参考
[利用AWS Lambda和iOS捷径实现手机一键开小区门禁 - 知乎](https://zhuanlan.zhihu.com/p/423812476)

## 本地调试
新建 `.env` 环境变量配置文件，参考上文配置这四个环境变量：
```
DEVICE_ID="xxxxxxxx"
PHONE="xxxxxxxx"
PASSWORD_MD5="xxxxxxxx"
EQUIPMENT_ID="xxxxxxxx"
```

`yarn vercel-dev` 启动本地开发服务，参考输出日志访问本地接口 `http://localhost:{port}/api/index`，看到如下 Response 即成功调通：

``` JSON
{
    "code": 200,
    "message": "成功",
    "data": true
}
```


## 线上部署
线上托管在 Vercel，具体部署方式参考 [Vercel Serverless Functions 文档](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js)。  
需要注意两点：  
1. Vercel 项目设置中需要和本地调试时一样配置四个环境变量
2. Vercel 默认项目域名无法在中国大陆地区正常访问，需要配置自己的域名并 CNAME 解析到中国大陆专用的 DNS 域名，具体配置方式可以自行谷歌解决。
