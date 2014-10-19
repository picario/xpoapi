using System.Globalization;
using System.Text;
using System.Web;
using PicarioXPO.RenderAPI.V1.Extensions;

namespace PicarioXPO.RenderAPI.V1
{
    internal static class DesignKeys
    {
        public const string EntityName = "tn";
        public const string Width = "tw";
        public const string Height = "th";
        public const string Repeat = "tr";
        public const string Contrast = "tc";
        public const string Gloss = "tg";
        public const string DropX = "tdx";
        public const string DropY = "tdy";
        public const string PlacingPointX = "tpx";
        public const string PlacingPointY = "tpy";
        public const string SameIndex = "ts";
        public const string Rotation = "trg";
        public const string Transformation = "tt1";

        public static StringBuilder Append(this StringBuilder stringBuilder, int index, XpoUrlDesign xpoUrlDesign)
        {
            if (xpoUrlDesign != null)
            {
                var americanCulture = new CultureInfo("en-US");

                stringBuilder
                    .Append(index, EntityName, HttpUtility.UrlEncode(xpoUrlDesign.EntityName))
                    .Append(index, Width, xpoUrlDesign.Width)
                    .Append(index, Height, xpoUrlDesign.Height)
                    .Append(index, Repeat, xpoUrlDesign.Repeat, false)
                    .Append(index, Contrast, ConvertNumberToCultureNumber(xpoUrlDesign.Contrast, americanCulture))
                    .Append(index, Gloss, ConvertNumberToCultureNumber(xpoUrlDesign.Gloss, americanCulture))
                    .Append(index, DropX, ConvertNumberToCultureNumber(xpoUrlDesign.DropX, americanCulture))
                    .Append(index, DropY, ConvertNumberToCultureNumber(xpoUrlDesign.DropY, americanCulture))
                    .Append(index, PlacingPointX, ConvertNumberToCultureNumber(xpoUrlDesign.PlacingPointX, americanCulture, false), false)
                    .Append(index, PlacingPointY, ConvertNumberToCultureNumber(xpoUrlDesign.PlacingPointY, americanCulture, false), false)
                    .Append(index, Rotation, xpoUrlDesign.Rotation)
                    .Append(index, Transformation, xpoUrlDesign.Transformation)
                    .Append(index, SameIndex, xpoUrlDesign.SameIndex);
            }

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