using System.Text;
using PicarioXPO.RenderAPI.V1.Extensions;

namespace PicarioXPO.RenderAPI.V1
{
    internal static class ColorKeys
    {
        public const string Color = "c";

        public static StringBuilder Append(this StringBuilder stringBuilder, int index, XpoUrlColor xpoUrlColor)
        {
            if (xpoUrlColor != null)
            {
                stringBuilder
                    .Append(index, Color, xpoUrlColor.Color);
            }
           

            return stringBuilder;
        }

    }
}