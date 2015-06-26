using System.Globalization;
using System.Text;
using PicarioXPO.RenderAPI.V1.Extensions;

namespace PicarioXPO.RenderAPI.V1
{
    internal static class TextKeys
    {
        public const string Text = "st";
        public const string Color = "sc";
        public const string FontName = "sf";
        public const string FontSize = "ss";
        public const string Alignment = "sa";
        public const string Decoration = "sd";
        public const string DropX = "sdx";
        public const string DropY = "sdy";
        public const string PlacingPointX = "spx";
        public const string PlacingPointY = "spy";
        public const string Rotation = "srg";
        public const string Transformation = "stf1";

        public static StringBuilder Append(this StringBuilder stringBuilder, int index, XpoUrlText xpoUrlText)
        {
            if (xpoUrlText != null)
            {
                var americanCulture = new CultureInfo("en-US");

                stringBuilder
                    .Append(index, Text, xpoUrlText.Text)
                    .Append(index, Color, xpoUrlText.Color)
                    .Append(index, FontName, xpoUrlText.FontName)
                    .Append(index, FontSize, xpoUrlText.FontSize)
                    .Append(index, Alignment, xpoUrlText.Alignment)
                    .Append(index, Decoration, xpoUrlText.FontStyle.ToString().Replace(" ", "").ToLower())
                    .Append(index, DropX, ConvertNumberToCultureNumber(xpoUrlText.DropX,americanCulture))
                    .Append(index, DropY, ConvertNumberToCultureNumber(xpoUrlText.DropY, americanCulture))
                    .Append(index, PlacingPointX, ConvertNumberToCultureNumber(xpoUrlText.PlacingPointX,americanCulture))
                    .Append(index, PlacingPointY, ConvertNumberToCultureNumber(xpoUrlText.PlacingPointY,americanCulture))
                    .Append(index, Rotation, xpoUrlText.Rotation)
                    .Append(index, Transformation, xpoUrlText.Transformation);
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