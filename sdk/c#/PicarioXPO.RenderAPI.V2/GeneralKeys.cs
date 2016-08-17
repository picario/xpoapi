using System.Text;
using PicarioXPO.RenderAPI.V2.Extensions;

namespace PicarioXPO.RenderAPI.V2
{
    internal static class GeneralKeys
    {
        public const string EntityName = "fn";
        public const string Width = "width";
        public const string Height = "height";
        public const string BackgroundColor = "bgcolor";
        public const string DesignCaching = "p.dc";
        public const string ResizeMethod = "mode";
        public const string TextureRepeat = "p.r";
        public const string OutputQuality = "quality";
        public const string ImageType = "format";
        public const string OutputType = "ot";
        public const string SceneThumbnailObjectNumber = "p.objectthumb";
        public const string HighlightObject = "p.highlight";
        public const string Caching = "Cache";
        public const string Coords = "p.coords";
        public const string Watermark = "watermark";
        public const string Frame = "p.frame";
        public const string RenderMode = "p.mode";
        public const string FastRender = "p.fastrender";

        public static StringBuilder AppendRequest(this StringBuilder stringBuilder, XpoUrlRequest request)
        {
            stringBuilder
                .Append("?1=1")
                .Append(Width, (request.Width == 0) ? -1 : request.Width) // Safety (0 is the default value)
                .Append(BackgroundColor, request.BackgroundColor)
                .Append(Caching, GetCachingMethod(request))
                .Append(Height, request.Height)
                .Append(DesignCaching, request.DesignCaching)
                .Append(ResizeMethod, GetResizeMethod(request))
                .Append(TextureRepeat, GetRepeatMethod(request))
                .Append(OutputQuality, request.OutputQuality)
                .Append(ImageType, GetFormat(request.ImageType))
                .Append(SceneThumbnailObjectNumber, request.SceneThumbnailObjectNumber)
                .Append(HighlightObject, request.HighlightObject)
                .Append(Watermark, request.WatermarkImage)
                .Append(Frame, request.Frame)
                .Append(RenderMode, request.SceneRenderMode)
                .Append(FastRender, request.FastRender)
                .AppendDictionary(request.CustomParameters);

            if (request is XpoCoordinatesUrlRequest)
            {
                stringBuilder.Append(Coords, true);
            }
                
            return stringBuilder;
        }

        private static string GetResizeMethod(XpoUrlRequest request)
        {
            switch (request.ResizeMethod)
            {
                case XpoUrlResizeMethods.KeepAspectMax:
                    return "max";
                case XpoUrlResizeMethods.Crop:
                    return "crop";
                case XpoUrlResizeMethods.Stretch:
                    return "stretch";
                case XpoUrlResizeMethods.Canvas:
                    return "canvas";
            }

            return "";
        }


        private static string GetFormat(XpoUrlImageTypes imageType)
        {
            switch (imageType)
            {
                case XpoUrlImageTypes.Bmp:
                    return "bmp";
                case XpoUrlImageTypes.Jpg:
                    return "jpg";
                case XpoUrlImageTypes.Png:
                    return "png";
                default:
                    return "jpg";
            }
        }

        private static string GetRepeatMethod(XpoUrlRequest request)
        {
            if (request.ResizeMethod == XpoUrlResizeMethods.Repeat && request.FileType == XpoUrlFileTypes.Design)
            {
                return "1";
            }
        
            return "";
        }

        private static string GetCachingMethod(XpoUrlRequest request)
        {
            return request.Caching ? "Default" : "No";
        }
    }
}