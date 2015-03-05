
declare module System {
    interface IDisposable {
        Dispose(): void;
    }
    class SystemObject {
        ClassName: string;
    }
    interface IClass {
        _className: string;
        Class: any;
    }
}
declare module System {
    class Dictionary<K, V> {
        private keys;
        private values;
        constructor();
        Add(key: K, value: V): void;
        ContainsKey(key: K): boolean;
        Get(key: K): V;
        Set(key: K, value: V): void;
        Count: number;
    }
}
declare module System {
    class List<T> {
        private items;
        Items: T[];
        constructor();
        Add(value: T): void;
        AddRange(value: T[]): void;
        Get(index: number): T;
        Count: number;
        Where(predicate: (value: T) => boolean): T[];
        Clear(): void;
    }
}
declare module Pix2 {
    class Point {
        X: number;
        Y: number;
        constructor(x: number, y: number);
    }
}
declare module System {
    class Promise<T> {
        data: T;
        isDone: boolean;
        hasError: boolean;
        errorMessage: string;
        constructor();
        private complete;
        private success;
        private error;
        whenData(value: (data: T) => void): Promise<T>;
        whenError(value: (message: string) => void): Promise<T>;
        onComplete: () => void;
        onSuccess: (data: T) => void;
        onError: (message: string) => void;
        setData(data: T): void;
        setError(message: string): void;
        SyncWait(): T;
    }
}
declare module System {
    class PromiseManager {
        private counter;
        private donecount;
        private allDone;
        constructor();
        Promise: Promise<boolean>;
        Add(promise: Promise<any>, assignTo?: (ctx: any, v: any) => void, assignToContext?: any): void;
    }
}
declare module Pix2 {
    class Rect {
        Left: number;
        Right: number;
        Top: number;
        Bottom: number;
        Width: number;
        Height: number;
        Clone(): Rect;
        Outer(other: Rect): Rect;
        Equals(other: Rect): boolean;
        constructor(Left: number, Top: number, Right: number, Bottom: number);
    }
}
declare module System {
    class Dimension {
        private width;
        Width: number;
        private height;
        Height: number;
        CalcMaxDimension(maxWidth?: number, maxHeight?: number): Dimension;
        Equals(width: number, height: number): boolean;
        constructor(width: number, height: number);
    }
}
declare module Pix2 {
    class XmlHelp {
        static getElement(n: Node, name: string): Node;
        static getElements(n: Node, name: string): Node[];
        static ReadElementNumber(n: Node, name: string, defaultValue?: number): number;
        static ReadElementString(n: Node, name: string): string;
        static getAttribute(n: Node, name: string): Node;
        static ReadAttributeNumber(n: Node, name: string): number;
        static ReadAttributeString(n: Node, name: string): string;
    }
}
declare module Pix2 {
    interface ColorOrder {
        IndexR: number;
        IndexG: number;
        IndexB: number;
        IndexA: number;
    }
    class ColorOrderDefaults {
    }
}
declare module Pix2 {
    class Color {
        private static Order;
        a: number;
        r: number;
        g: number;
        b: number;
        static CreateGray(gray: number): Color;
        static CreateRgb(r: number, g: number, b: number): Color;
        constructor(a: number, r: number, g: number, b: number);
        static Create(ca: number[], order: ColorOrder): Color;
        static FromInt32(input: number): Color;
        ToArgb(): number;
        ToString(): string;
        ToGray(): number;
        Equals(other: Color): boolean;
        EqualsArray(PixelData: number[]): boolean;
        ToArray(BytesPerPixel: number): number[];
        isEmpty(): boolean;
        static RandomColor(): Color;
        static fromString(color: string): Color;
    }
}
declare module Pix2 {
    class DibmapData {
        Data: Uint8Array;
        Width: number;
        Height: number;
        BytesPerPixel: number;
        Stride: number;
        Order: ColorOrder;
        Release: () => void;
        SaveData: (bound?: Rect) => void;
        constructor(dibmap: IDibmap);
        Dispose(): void;
        SetPixelSafeColor(x: number, y: number, c: Color): void;
        SetPixelSafeGrayPoint(p: Point, gray: number): void;
        SetPixelSafeGray(x: number, y: number, gray: number): void;
        SetPixelSafeArray(x: number, y: number, p: number[]): void;
        GetPixelSafe(x: number, y: number): number[];
        GetPixelSafeColor(x: number, y: number): Color;
    }
}
declare module Pix2 {
    interface IDibmap {
        Width: number;
        Height: number;
        BytesPerPixel: number;
        Create(Width: number, Height: number, BytesPerPixel: number): IDibmap;
        Clone(): IDibmap;
        GetData(): DibmapData;
    }
}
declare module Pix2 {
    interface IFileContainer {
        Exists(Filename: string): System.Promise<boolean>;
        GetData(Filename: string): System.Promise<ArrayBuffer>;
        GetImage(Filename: string): System.Promise<IDibmap>;
        GetString(Filename: string): System.Promise<String>;
        GetXML(Filename: string): System.Promise<Document>;
        Dispose(): void;
    }
}
declare module Pix2 {
    interface IFileSystem {
        Exists(fileName: string): boolean;
        GetFullPath(fileName: string): string;
        CreateZipContainer(fileName: string): IFileContainer;
        CreateDirContainer(pathName: string): IFileContainer;
    }
}
declare module Pix2 {
    interface IContext {
        CreateDibmap(Width: number, Height: number, BytesPerPixel: number): IDibmap;
        LoadDibmap(filename: string): System.Promise<IDibmap>;
        FileSystem: IFileSystem;
    }
}
declare module Pix2 {
    class Context {
        private static isInitialized;
        private static current;
        static Current: IContext;
        static SetContext(ctx: IContext): void;
    }
}
declare module Pix2 {
    class TypeScriptColorOrder implements ColorOrder {
        IndexA: number;
        IndexR: number;
        IndexG: number;
        IndexB: number;
    }
}
declare module Pix2 {
    class TypeScriptDibmapData extends DibmapData {
        private ctx;
        private imageData;
        private owner;
        /**
         * TypescriptDibmapData
         * @constructor
         */
        constructor(dibmap: TypeScriptDibmap);
        private LockData();
        CopyTo(other: TypeScriptDibmapData): void;
    }
}
declare module Pix2 {
    class TypeScriptDibmap implements IDibmap {
        canvas: HTMLCanvasElement;
        private dibmapData;
        Width: number;
        Height: number;
        BytesPerPixel: number;
        constructor(width: number, height: number);
        Create(Width: number, Height: number, BytesPerPixel: number): IDibmap;
        static fromImageElement(elementID: string): TypeScriptDibmap;
        static fromURL(url: string): System.Promise<IDibmap>;
        static fromCanvasElement(canvas: HTMLCanvasElement): IDibmap;
        toImageElement(elementID: string): void;
        Clone(): IDibmap;
        Rescale(scale: number): IDibmap;
        Resize(dim: System.Dimension): IDibmap;
        SetDimension(dim: System.Dimension): void;
        GetData(): DibmapData;
        private setWidth(width);
        private setHeight(height);
    }
}
declare module Pix2 {
    class UriContainer implements IFileContainer {
        private baseUrl;
        constructor(baseUrl: string);
        GetImage(Filename: string): System.Promise<IDibmap>;
        GetString(Filename: string): System.Promise<String>;
        GetXML(Filename: string): System.Promise<Document>;
        GetData(Filename: string): System.Promise<ArrayBuffer>;
        Exists(Filename: string): System.Promise<boolean>;
        private Request(CompleteURL, callback, responseType?);
        Dispose(): void;
    }
}
declare module Pix2 {
    class ZipContainer implements IFileContainer {
        private baseUrl;
        private zipFile;
        private zipLoaded;
        constructor(baseUrl: string);
        GetZipFolder(url: any): System.Promise<boolean>;
        GetImage(Filename: string): System.Promise<IDibmap>;
        GetString(Filename: string): System.Promise<String>;
        GetXML(Filename: string): System.Promise<Document>;
        GetData(Filename: string): System.Promise<ArrayBuffer>;
        Exists(Filename: string): System.Promise<boolean>;
        private Request(CompleteURL, callback, responseType?);
        Dispose(): void;
    }
}
declare module Pix2 {
    class TypeScriptFileSystem implements IFileSystem {
        Exists(fileName: string): boolean;
        GetFullPath(fileName: string): string;
        CreateZipContainer(fileName: string): IFileContainer;
        CreateDirContainer(pathName: string): IFileContainer;
    }
}
declare module Pix2 {
    class TypeScriptContext implements IContext {
        private filesystem;
        CreateDibmap(Width: number, Height: number, BytesPerPixel: number): IDibmap;
        LoadDibmap(filename: string): System.Promise<IDibmap>;
        FileSystem: IFileSystem;
    }
}
declare module Pix2 {
    class GrayTable {
        private static GRAY_COMP_R;
        private static GRAY_COMP_G;
        private static GRAY_COMP_B;
        static r: number[];
        static g: number[];
        static b: number[];
        static InitGrayTable(): void;
    }
}
declare module Pix2 {
}
declare module Pix2 {
    enum PicImageFormat {
        bmp = 0,
        jpg = 1,
        png = 2,
        gif = 3,
    }
}
declare module Pix2 {
    class GLWorkspace implements IWorkSpace, System.IDisposable {
        gl: WebGLRenderingContext;
        private perspectiveMatrix;
        private mvMatrix;
        private shadowTexture;
        private backgroundShaderProgram;
        private surfaceShaderProgram;
        private background;
        private textureCoordAttribute;
        private vertexPositionAttribute;
        private canvas;
        private workspaceObjects;
        private surfaces;
        private scale;
        private renderSceneLoaded;
        private renderScene;
        RenderScene: GlRenderScene;
        private options;
        Options: WorkspaceOptions;
        private renderResult;
        private needsfirstRender;
        Canvas: HTMLCanvasElement;
        constructor(element?: any);
        setSize(width: number, height: number): void;
        getObject(index: number): GLWorkspaceObject;
        getObjectByCoordinates(x: number, y: number, frameID?: number): System.Promise<IWorkspaceObject>;
        loadScene(sceneFileName: string, scale: number): System.Promise<boolean>;
        getCanvas(): HTMLCanvasElement;
        addToElement(element: any): void;
        private renderSceneChanged();
        render(frameID?: number): System.Promise<IDibmap>;
        private postRender(frame);
        private drawBackground();
        private drawGrid(grid);
        private initShaders();
        private getShader(shaderCode, shaderType);
        private initTextures();
        private handleTextureLoaded(canvas, texture);
        private initWebGL();
        Dispose(): void;
    }
}
declare module Pix2 {
    class RenderTexture {
        Image: IDibmap;
        WidthInMM: number;
        HeightInMM: number;
        Repeat: boolean;
        Scale: number;
        private IntegralData;
        static CreateFromImage(filename: string, widthmm: number, heightmm: number): System.Promise<RenderTexture>;
        private CalcIntegralData();
        static GetIntegralRectMean(context: RenderTexture, x1: number, y1: number, w: number, h: number): number[];
    }
}
declare module Pix2 {
    interface IRenderSettings {
        Color: Color;
        Texture: RenderTexture;
        PlacingPointX: number;
        PlacingPointY: number;
        Repeat: boolean;
        DropX: number;
        DropY: number;
        Rotation: number;
    }
}
declare module Pix2 {
    class FacetCoord {
        IndexX: number;
        IndexY: number;
        X: number;
        Y: number;
        Tx: number;
        Ty: number;
        private static NearZero;
        private static NearOne;
        static dXdY(c0: FacetCoord, c1: FacetCoord): number;
        static Lerp2Y(c0: FacetCoord, c1: FacetCoord, Y: number): FacetCoord;
        static Lerp2X(c0: FacetCoord, c1: FacetCoord, X: number): FacetCoord;
    }
}
declare module Pix2 {
    interface GetXCoordsResults {
        Cb: FacetCoord;
        Ce: FacetCoord;
    }
    class Quad {
        static HVDECIDE: number;
        p0: FacetCoord;
        p1: FacetCoord;
        p2: FacetCoord;
        p3: FacetCoord;
        Ori: number;
        constructor(P0: FacetCoord, P1: FacetCoord, P2: FacetCoord, P3: FacetCoord);
        GetXCoords(Yb: number): GetXCoordsResults;
    }
}
declare module Pix2 {
    class FacetSequence {
        IndexX: number;
        IndexY: number;
        constructor(indexX: number, indexY: number);
    }
}
declare module Pix2 {
    class FacetXMLReader {
        private doc;
        private root;
        private CountX;
        private CountY;
        private Coords;
        private Sequence;
        private Quads;
        constructor(xml: Document);
        getCoords(): FacetCoord[][];
        getQuads(): Quad[];
        private ReadFacetCoordinates(root);
        private ReadFacetSequence(root);
        private GenerateQuads();
        private ReadCoordFromXML(element);
    }
}
declare module Pix2 {
    class UVMap implements IGrid {
        Width: number;
        Height: number;
        Data: Float32Array;
        constructor();
        Rescale(scale: number): UVMap;
        static fromBin(source: ArrayBuffer): UVMap;
        static fromDibmap12bit(source: IDibmap): UVMap;
        static fromFacetXml(w: number, h: number, xml: Document): UVMap;
        static fromQuads(w: number, h: number, Quads: Quad[]): UVMap;
    }
}
declare module Pix2 {
    interface IPixelShader {
        Shade(Context: any, Color: Color, Intens: number): Color;
    }
}
declare module Pix2 {
    class RenderParams {
        frameData: DibmapData;
        maskData: MinimalMask;
        shadowData: DibmapData;
        shader: IPixelShader;
        uvMap: UVMap;
        WidthInMM: number;
        HeightInMM: number;
        settings: IRenderSettings;
        destination: DibmapData;
        setFrame(frameData: DibmapData): void;
        setMask(maskData: MinimalMask): void;
        setShading(shadowData: DibmapData, shader: IPixelShader): void;
        setUV(uvMap: UVMap, WidthInMM: number, HeightInMM: number): void;
        Validate(): boolean;
    }
}
declare module Pix2 {
    interface ISurfaceRender {
        Render(rparams: RenderParams): any;
    }
}
declare module Pix2 {
    class ColorSurfaceRender implements ISurfaceRender {
        Render(rp: RenderParams): void;
    }
}
declare module Pix2 {
    enum RenderTypes {
        None = 0,
        Color = 1,
        Texture = 2,
    }
    class RenderTypeFinder {
        static GetRenderType(HasColor: boolean, HasTexture: boolean, IsColorOnly: boolean): RenderTypes;
    }
}
declare module Pix2 {
    class TextureSurfaceRender implements ISurfaceRender {
        Render(rparams: RenderParams): void;
    }
}
declare module Pix2 {
    class RenderScene {
        private scene;
        SceneFile: ISceneFile;
        Scale: number;
        Width: number;
        Height: number;
        GetFrame(FrameID: number): Frame;
        private backGroundImage;
        getBackgroundImage(frame: Frame): System.Promise<DibmapData>;
        constructor(scene: ISceneFile, scale?: number);
    }
}
declare module Pix2 {
    class WorkspaceOptions {
        UseRenderSceneManager: boolean;
    }
}
declare module Pix2 {
    class Workspace implements IWorkSpace, System.IDisposable {
        private WorkspaceObjects;
        private renderScene;
        RenderScene: RenderScene;
        private renderSceneLoaded;
        private RenderSceneChanged();
        private options;
        Options: WorkspaceOptions;
        texturePromiseManager: System.PromiseManager;
        private csr;
        private tsr;
        private renderResult;
        private needsfirstRender;
        Canvas: HTMLCanvasElement;
        Scale: number;
        constructor(element?: any);
        setSize(width: number, height: number): void;
        getObject(index: number): WorkspaceObject;
        getObjectByCoordinates(x: number, y: number, frameID?: number): System.Promise<IWorkspaceObject>;
        loadScene(sceneFileName: string, scale: number): System.Promise<boolean>;
        static CreateFromFile(sceneFilename: string): System.Promise<Workspace>;
        getCanvas(): HTMLCanvasElement;
        addToElement(element: any): void;
        private PostRender(frame);
        private RenderStep2(FrameID, promise);
        render(FrameID?: number): System.Promise<IDibmap>;
        Dispose(): void;
    }
}
declare module Pix2 {
    interface IWorkSpace {
        setSize(width: number, height: number): any;
        getCanvas(): HTMLCanvasElement;
        getObjectByCoordinates(x: number, y: number, frameID?: number): System.Promise<IWorkspaceObject>;
        getObject(index: number): IWorkspaceObject;
        render(frameID?: number): System.Promise<IDibmap>;
        addToElement(element: any): any;
        loadScene(sceneFileName: string, scale: number): System.Promise<boolean>;
    }
}
declare module Pix2 {
    class WorkspaceObject implements IRenderSettings, IWorkspaceObject {
        private workSpace;
        isDirty: boolean;
        needsLoading: boolean;
        RenderType(surfaceType: SurfaceTypes): RenderTypes;
        Gloss: number;
        Contrast: number;
        private repeat;
        Repeat: boolean;
        private dropX;
        DropX: number;
        private dropY;
        DropY: number;
        private placingPointX;
        PlacingPointX: number;
        private placingPointY;
        PlacingPointY: number;
        private rotation;
        Rotation: number;
        Width: number;
        Height: number;
        Name: string;
        private internaltexture;
        Texture: RenderTexture;
        setTexture(ctx: WorkspaceObject, value: RenderTexture): void;
        LoadTextureImage(filename: string, widthmm: number, heightmm: number): void;
        ClearTextureImage(): void;
        private color;
        Color: Color;
        isActive: boolean;
        Clear(): void;
        constructor(workSpace: Workspace);
    }
}
declare module Pix2 {
    interface IWorkspaceObject {
        Contrast: number;
        PlacingPointX: number;
        PlacingPointY: number;
        LoadTextureImage(imgSrc: string, width: number, height: number): any;
    }
}
declare module Pix2 {
    class WorkspaceFactory {
        static getWorkspace(element?: string): IWorkSpace;
        private static webGLAvailable();
    }
}
declare module Pix2 {
    class GLWorkspaceObject implements IRenderSettings, IWorkspaceObject {
        private workSpace;
        isDirty: boolean;
        needsLoading: boolean;
        RenderType(surfaceType: SurfaceTypes): RenderTypes;
        Gloss: number;
        Contrast: number;
        private repeat;
        Repeat: boolean;
        private dropX;
        DropX: number;
        private dropY;
        DropY: number;
        private placingPointX;
        PlacingPointX: number;
        private placingPointY;
        PlacingPointY: number;
        private rotation;
        Rotation: number;
        Width: number;
        Height: number;
        Name: string;
        private internaltexture;
        Texture: RenderTexture;
        private internalGlTexture;
        GlTexture: WebGLTexture;
        setTexture(ctx: WorkspaceObject, value: RenderTexture): void;
        LoadTextureImage(filename: string, widthmm: number, heightmm: number): System.Promise<any>;
        handleTextureLoaded(image: any, texture: WebGLTexture): void;
        ClearTextureImage(): void;
        private color;
        Color: Color;
        isActive: boolean;
        Clear(): void;
        constructor(workSpace: IWorkSpace);
    }
}
declare module Pix2 {
    class Background {
        private vertexBuffer;
        private vertexIndexBuffer;
        private textureCoordinateBuffer;
        private vertices;
        private vertexIndices;
        private textureCoordinates;
        private texture;
        private gl;
        constructor(width: number, heigth: number, gl: WebGLRenderingContext);
        loadTextureFromFile(fileName: string): void;
        private isPowerOfTwo(x);
        loadTextureFromCanvas(canvas: HTMLCanvasElement): void;
        draw(vertexPositionAttribute: number, textureCoordAttribute: number, shaderProgram: WebGLProgram, perspectiveMatrix: LinearAlgebraUtils.Matrix, mvMatrix: LinearAlgebraUtils.Matrix): void;
        private handleTextureLoaded(image, texture);
        private loadVertexInfo(width, heigth);
        private loadGlBuffers();
    }
}
declare module Pix2 {
    class GlRenderScene {
        private scene;
        SceneFile: ISceneFile;
        Scale: number;
        Width: number;
        Height: number;
        GetFrame(FrameID: number): Frame;
        constructor(scene: ISceneFile, scale?: number);
    }
}
declare module Pix2 {
    class VertexCountBoundary {
        count: number;
        indexOffset: number;
        vertexOffset: number;
    }
    class GlSurface implements IGrid {
        texture: WebGLTexture;
        repeatTexture: boolean;
        vertexBuffer: WebGLBuffer;
        vertexIndexBuffer: WebGLBuffer;
        textureCoordinateBuffer: WebGLBuffer;
        private buffers;
        private vertexCountBoundaries;
        private mask;
        blackSettings: number[];
        greySettings: number[];
        whiteSettings: number[];
        width: number;
        height: number;
        private gl;
        textureScale: number;
        textureOriginalWidth: number;
        textureOriginalHeight: number;
        textureOffsetX: number;
        textureOffsetY: number;
        contrast: number;
        private maskOffsetX;
        private maskOffsetY;
        private maskWidth;
        private maskHeight;
        constructor();
        loadFacetXml(w: number, h: number, xml: Document): void;
        loadMaskFromRenderMask(mask: GLMask): void;
        isPowerOfTwo(x: number): boolean;
        loadGlBuffers(gl: WebGLRenderingContext): void;
        draw(vertexPositionAttribute: number, textureCoordAttribute: number, shaderProgram: WebGLProgram, perspectiveMatrix: LinearAlgebraUtils.Matrix, mvMatrix: LinearAlgebraUtils.Matrix): void;
        private handleTextureLoaded(image, texture);
    }
}
declare module Pix2 {
    class GLSurfaceBuffers {
        vertices: number[];
        vertexIndices: number[];
        textureCoordinates: number[];
        verticeRowWidths: number[];
        startingWidth: number;
        height: number;
        tesselatedOnDistance: number;
        constructor();
        tessellate(maxDistance: number): void;
    }
}
declare module Pix2 {
    class ImageResizer {
        static resizeImageToPowerOfTwo(image: HTMLImageElement): HTMLCanvasElement;
        static resizeCanvasToPowerOfTwo(canvas: HTMLCanvasElement): HTMLCanvasElement;
        private static isPowerOfTwo(x);
    }
}
declare module Pix2.LinearAlgebraUtils {
    function makePerspective(fovy: any, aspect: any, znear: any, zfar: any): Matrix;
    function makeFrustum(left: any, right: any, bottom: any, top: any, znear: any, zfar: any): Matrix;
    class Matrix {
        private elements;
        private width;
        private heigth;
        constructor(elements: number[], width: number, height: number);
        multiply(m: Matrix): void;
        flatten(): number[];
        expandTo4X4(): Matrix;
        static createTranslation(v: Vector): Matrix;
        static createSquareIdentity(size: number): Matrix;
    }
    class Vector {
        elements: number[];
        constructor(elements: number[]);
        flatten: () => any;
    }
}
declare module Pix2 {
    class FragmentShaders {
        static getBackgroundShader(): string;
        static getSurfaceShader(): string;
    }
    class VertexShaders {
        static getBasicShader(): string;
    }
}
declare module Pix2 {
    enum GridTypes {
        UNKNOWN = 0,
        FACETXML = 1,
        QUADXML = 2,
        QUADBIN = 3,
        UVXML = 4,
        UVIMG = 5,
        UVIMG8 = 6,
        UVIMG16 = 7,
        UVBIN = 8,
    }
}
declare module Pix2 {
    interface IIndexedItem {
        Index: number;
    }
}
declare module Pix2 {
    class Grid implements IIndexedItem, System.IClass {
        _className: string;
        Class: any;
        Index: number;
        FileName: string;
        GridType: GridTypes;
        Width: number;
        Height: number;
        constructor();
    }
}
declare module Pix2 {
    enum SurfaceTypes {
        Unknown = 0,
        Color = 1,
        Grid = 2,
        Overlay = 3,
    }
}
declare module Pix2 {
    class Surface implements IIndexedItem {
        private frame;
        Index: number;
        Name: string;
        SurfaceType: SurfaceTypes;
        WidthMM: number;
        HeightMM: number;
        Transparancy: number;
        DesignPointX: number;
        DesignPointY: number;
        private shadingIndex;
        ShadingIndex: number;
        private maskIndex;
        MaskIndex: number;
        private gridIndex;
        GridIndex: number;
        private shadowIndex;
        ShadowIndex: number;
        constructor(frame: Frame);
        private shading;
        Shading: Shading;
        private tempShading;
        shadingProvider: Providers.ShadingProvider;
        getShading(container: IFileContainer): System.Promise<IPixelShader>;
        private mask;
        Mask: Mask;
        private tempMask;
        maskProvider: Providers.IMaskProvider;
        getMask(container: IFileContainer): System.Promise<IMask>;
        private grid;
        Grid: Grid;
        private tempGrid;
        gridProvider: Providers.IGridProvider;
        getGrid(container: IFileContainer): System.Promise<IGrid>;
        private shadow;
        Shadow: Shadow;
        tempShadow: IDibmap;
        shadowProvider: Providers.ShadowProvider;
        getShadow(container: IFileContainer): System.Promise<IDibmap>;
        private GetByIndex<T>(collection, searchIndex);
    }
}
declare module Pix2 {
    class SceneObject implements IIndexedItem {
        private frame;
        Index: number;
        Name: string;
        Surfaces: number[];
        constructor(frame: Frame);
        private surfaceReferences;
        SurfaceReferences: Surface[];
        setMaskProvider(provider: Providers.IMaskProvider): void;
        setGridProvider(provider: Providers.IGridProvider): void;
        isOnCoordinate(x: number, y: number, container: IFileContainer): System.Promise<boolean>;
        private GetByIndex<T>(collection, searchIndex);
    }
}
declare module Pix2 {
    class ShadingTones {
        static Black: number;
        static Gray: number;
        static White: number;
        static All: number[];
    }
}
declare module Pix2 {
    class ShadingSetting {
        Tone: number;
        Gloss: number;
        Shadow: number;
        Brightness: number;
        Highlight: number;
        Equals(other: ShadingSetting): boolean;
    }
}
declare module Pix2 {
    enum ShadingTypes {
        Unknown = 0,
        Direct = 1,
        File = 2,
    }
}
declare module Pix2 {
    class Shading implements IIndexedItem, System.IClass {
        _className: string;
        Class: any;
        Index: number;
        ShadingType: ShadingTypes;
        FileName: string;
        Type: any;
        Settings: System.List<ShadingSetting>;
        constructor();
        EqualsSettings(other: ShadingSetting[]): boolean;
    }
}
declare module Pix2 {
    enum MaskTypes {
        UNKNOWN = 0,
        IMAGE = 1,
    }
}
declare module Pix2 {
    interface IIndexedItem {
    }
    class Mask implements IIndexedItem, System.IClass {
        _className: string;
        Class: any;
        Index: number;
        MaskType: MaskTypes;
        FileName: string;
        PosX: number;
        PosY: number;
        MaskColor: Color;
        Intensity: number;
        constructor();
    }
}
declare module Pix2 {
    enum ShadowTypes {
        UNKNOWN = 0,
        IMGFILE = 1,
        CALCULATE = 2,
    }
}
declare module Pix2 {
    class Shadow implements IIndexedItem, System.IClass {
        _className: string;
        Class: any;
        Index: number;
        FileName: string;
        ShadowType: ShadowTypes;
        constructor();
    }
}
declare module Pix2 {
    class Frame implements IIndexedItem, System.IClass {
        _className: string;
        Class: any;
        Index: number;
        FileName: string;
        Shadows: System.List<Shadow>;
        Masks: System.List<Mask>;
        Shadings: System.List<Shading>;
        Surfaces: System.List<Surface>;
        SceneObjects: System.List<SceneObject>;
        Grids: System.List<Grid>;
        constructor();
    }
}
declare module Pix2 {
    class Global {
        Width: number;
        Height: number;
    }
}
declare module Pix2 {
    class SceneConfig {
        Global: Global;
        Frames: System.List<Frame>;
        constructor();
        ClearConfig(): void;
    }
}
declare module Pix2 {
    interface ISceneFile {
        Container: IFileContainer;
        Config: SceneConfig;
    }
}
declare module Pix2 {
    class SceneConfigXmlReader {
        static fromXML(doc: Document): SceneConfig;
        private static ReadGlobal(n);
        private static ReadFrame(frameNode, globalWidth, globalHeight);
        private static ReadMask(maskNode);
        private static ReadShadow(shadowNode);
        private static ReadShading(shadingNode);
        private static ReadSetting(settingNode);
        private static ReadSurface(surfaceNode, frame);
        private static ReadGrid(gridNode, defaultWidth, defaultHeight);
        private static ReadSceneObject(sceneObjectNode, frame);
    }
}
declare module Pix2 {
    class SceneFile implements ISceneFile {
        private SceneFileExtension;
        private container;
        private configTree;
        Config: SceneConfig;
        Container: IFileContainer;
        constructor(cont: IFileContainer);
        static Create(storage: IFileSystem, fileName: string): System.Promise<ISceneFile>;
        static LoadFromFile(fileName: string): System.Promise<ISceneFile>;
        private LoadConfig();
        Save(): void;
    }
}
declare module Pix2 {
    class ShadingTable {
        private FAST_SHIFT;
        private MAXEXP;
        private EXPSC;
        private ISTEP;
        private _shadow;
        private _brightness;
        private _highlight;
        private _contrast;
        data: number[][];
        constructor(Shadow: number, Brightness: number, Highlight: number, Contrast: number);
        private Generate2(Contrast);
        private Fast_DIVCONV(d);
        private Fast_DIVCONV1(d);
        private Fast_DIVCONV1NEG(d);
        private Fast_DIV(a, d);
    }
}
declare module Pix2 {
    class ShadingPixelShader implements IPixelShader {
        private static BlackIndex;
        private static GrayIndex;
        private static WhiteIndex;
        private ShadingTables;
        private Black;
        private Gray;
        private White;
        private _Gloss;
        Gloss: number;
        private _Contrast;
        Contrast: number;
        private shadingSettings;
        constructor(shadingSettings: System.List<ShadingSetting>);
        private InitShading();
        Shade(Context: ShadingPixelShader, aColor: Color, nIntens: number): Color;
        private GenerateTables();
    }
}
declare module Pix2 {
    interface IMask {
        width: number;
        height: number;
        posX: number;
        posY: number;
        isOnCoordinate(x: number, y: number): boolean;
    }
}
declare module Pix2.Providers {
    interface IMaskProvider {
        generate(container: IFileContainer, input: Mask): System.Promise<IMask>;
    }
}
declare module Pix2 {
    class MinimalMask implements IMask {
        data: Uint8Array;
        width: number;
        height: number;
        posX: number;
        posY: number;
        constructor(width: number, height: number, posx: number, posy: number);
        isOnCoordinate(x: number, y: number): boolean;
    }
}
declare module Pix2.Providers {
    class MinimalMaskProvider implements IMaskProvider {
        generate(container: IFileContainer, input: Mask, scale?: number): System.Promise<MinimalMask>;
    }
}
declare module Pix2 {
    class GLMask implements IMask {
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
        posX: number;
        posY: number;
        constructor(width: number, height: number, posx: number, posy: number, canvas: HTMLCanvasElement);
        isOnCoordinate(x: number, y: number): boolean;
    }
}
declare module Pix2.Providers {
    class GLMaskProvider implements IMaskProvider {
        generate(container: IFileContainer, input: Mask, scale?: number): System.Promise<GLMask>;
    }
}
declare module Pix2 {
    interface IGrid {
    }
}
declare module Pix2.Providers {
    interface IGridProvider {
        generate(container: IFileContainer, input: Grid): System.Promise<IGrid>;
    }
}
declare module Pix2.Providers {
    class GLGridProvider implements IGridProvider {
        generate(container: IFileContainer, input: Grid): System.Promise<GlSurface>;
    }
}
declare module Pix2.Providers {
    class UVMapGridProvider implements IGridProvider {
        generate(container: IFileContainer, input: Grid, scale?: number): System.Promise<UVMap>;
    }
}
declare module Pix2.Providers {
    class ShadowProvider {
        generate(container: IFileContainer, input: Shadow, scale?: number): System.Promise<IDibmap>;
    }
}
declare module Pix2.Providers {
    class FrameProvider {
        generate(container: IFileContainer, input: Frame, scale?: number): System.Promise<IDibmap>;
    }
}
declare module Pix2.Providers {
    class ShadingProvider {
        generate(container: IFileContainer, input: Shading, scale?: number): System.Promise<IPixelShader>;
    }
}
declare module Pix2 {
    class XmlUtils {
    }
}
