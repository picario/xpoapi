cd ..
cd js\PicarioXPO.RenderAPI.V2

"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.6\tsc" --removeComments --target ES5 --out ..\compiled\PicarioXPO.RenderAPI.V2.js .\PicarioXPO.RenderAPI.V2.ts
"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.6\tsc" --declaration --out ..\compiled\PicarioXPO.RenderAPI.V2.d.ts .\PicarioXPO.RenderAPI.V2.ts

cd ..
cd PicarioXPO.BabylonSDK

"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.6\tsc" --removeComments --target ES5 --out ..\compiled\PicarioXPO.BabylonSDK.js .\PicarioXPO.BabylonSDK.ts
"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.6\tsc" --declaration --out ..\compiled\PicarioXPO.BabylonSDK.d.ts .\PicarioXPO.BabylonSDK.ts