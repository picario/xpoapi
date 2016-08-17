cd ..
cd js\PicarioXPO.RenderAPI.V2

tsc --removeComments --target ES5 --out ..\compiledJS\PicarioXPO.RenderAPI.V2.js .\PicarioXPO.RenderAPI.V2.ts
tsc --declaration --out ..\compiledDTS\PicarioXPO.RenderAPI.V2.d.ts .\PicarioXPO.RenderAPI.V2.ts