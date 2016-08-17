cd ..
cd js\PicarioXPO.RenderAPI.V2

"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.4\tsc" --removeComments --target ES5 --out ..\compiledJS\PicarioXPO.RenderAPI.V2.js .\PicarioXPO.RenderAPI.V2.ts
"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.4\tsc" --declaration --out ..\compiledDTS\PicarioXPO.RenderAPI.V2.d.ts .\PicarioXPO.RenderAPI.V2.ts