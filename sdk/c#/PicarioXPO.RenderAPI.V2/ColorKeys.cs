using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PicarioXPO.RenderAPI.V2
{
    internal static class ColorKeys
    {
        public const string Color = "&p.c=";

        public static StringBuilder AppendColors(this StringBuilder stringBuilder, IEnumerable<XpoUrlObject> xpoUrlColors)
        {
            var xpoUrlObjects = xpoUrlColors as IList<XpoUrlObject> ?? xpoUrlColors.ToList();

            if (!xpoUrlObjects.Any())
                return stringBuilder;

            var max = xpoUrlObjects.Select(x => x.Index).OrderByDescending(x => x).FirstOrDefault();
            var colorBuilder = new StringBuilder(Color);

            for (var i = 0; i <= max; i++)
            {
                var colorObject = xpoUrlObjects.LastOrDefault(x => x.Index == i);
                if (colorObject == null)
                    colorBuilder.Append(",");
                else
                {
                    colorBuilder.Append(colorObject.Color.Color);
                    colorBuilder.Append(",");
                }
            }

            colorBuilder.Remove(colorBuilder.Length - 1, 1);
            stringBuilder.Append(colorBuilder);

            return stringBuilder;
        }
    }
}