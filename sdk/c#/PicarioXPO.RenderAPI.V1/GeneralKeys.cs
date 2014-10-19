using System.Globalization;
using System.Text;
using System.Web;
using PicarioXPO.RenderAPI.V1.Extensions;

namespace PicarioXPO.RenderAPI.V1
{
    internal static class GeneralKeys
    {
        public const string EntityType = "ft";
        public const string EntityName = "fn";
        public const string Width = "w";
        public const string Height = "h";
        public const string Debug = "debug";
        public const string BackgroundColor = "bg";
        public const string DesignCaching = "tc";
        public const string ResizeMethod = "sr";
        public const string OutputQuality = "q";
        public const string ImageType = "ot";
        public const string OutputType = "ot";
        public const string IsEntity = "si";
        public const string TransparencyColor = "tpc";
        public const string SceneThumbnailObjectNumber = "on";
        public const string HighlightObject = "ho";
        public const string AllColor = "ac";
        public const string Caching = "oc";
        public const string PrefillCaching = "co";
        public const string SessionId = "sui";
        public const string TemplateName = "tpl";
        public const string TemeplateParameter = "tpp";
        public const string Overlays = "oli";

        public static StringBuilder AppendRequest(this StringBuilder stringBuilder, XpoImageUrlRequest request)
        {
            var americanCulture = new CultureInfo("en-US");

            stringBuilder
                .Append(EntityName, HttpUtility.UrlEncode(request.PrimaryKey))
                .Append(Width, request.Width)
                .Append(BackgroundColor, request.BackgroundColor)
                .Append(Caching, request.Caching)
                .Append(Debug, request.Debug)
                .Append(Height, request.Height)
                .Append(DesignCaching, request.DesignCaching)
                .Append(ResizeMethod, request.ResizeMethod)
                .Append(OutputQuality, ConvertNumberToCultureNumber(request.OutputQuality, americanCulture))
                .Append(ImageType, request.ImageType)
                .Append(IsEntity, request.IsEntity)
                .Append(TransparencyColor, request.TransparencyColor)
                .Append(SceneThumbnailObjectNumber, request.SceneThumbnailObjectNumber)
                .Append(HighlightObject, request.HighlightObject)
                .Append(AllColor, request.AllColor)
                .Append(PrefillCaching, request.PrefillCaching)
                .Append(SessionId, request.SessionId)
                .Append(Overlays, request.Overlays.ToArray().Join(","))
                .Append(TemplateName, request.TemplateName)
                .AppendDictionary(request.CustomParameters);

            foreach (var templateParameter in request.TemplateParameters)
            {
                stringBuilder.Append(templateParameter.Index, TemeplateParameter, templateParameter.Value);
            }

            return stringBuilder;
        }

        public static StringBuilder AppendRequest(this StringBuilder stringBuilder, XpoCoordinatesUrlRequest request)
        {
            stringBuilder
                .Append(EntityName, HttpUtility.UrlEncode(request.PrimaryKey))
                .Append(OutputType, (int)request.OutputType)
                .Append(Width, request.Width)
                .Append(Height, request.Height)
                .Append(ResizeMethod, request.ResizeMethod)
                .AppendDictionary(request.CustomParameters);

            return stringBuilder;
        }

        private static string ConvertNumberToCultureNumber(double number, CultureInfo culture, bool omitIfDefault = true)
        {
            if (Equals(number, default(double)) && omitIfDefault)
            {
                return "";
            }
            return number.ToString(culture.NumberFormat);
        }
    }
}