using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PicarioXPO.RenderAPI.V2
{
    internal static class ColorKeys
    {
        public const string Color = "&p.c=";
        public const string ColorGloss = "&p.cg=";

        public static StringBuilder AppendColors(this StringBuilder stringBuilder, IEnumerable<XpoUrlObject> xpoUrlColors)
        {
            var xpoUrlObjects = xpoUrlColors as IList<XpoUrlObject> ?? xpoUrlColors.ToList();

            if (!xpoUrlObjects.Any())
                return stringBuilder;

            var colorBuilder = new StringBuilder();
            CreateStringForKey(colorBuilder,xpoUrlObjects,Color,color => color.Color);
            CreateStringForKey(colorBuilder,xpoUrlObjects,ColorGloss,color => color.Gloss);
            stringBuilder.Append(colorBuilder);
            return stringBuilder;
        }

        private static void CreateStringForKey(StringBuilder builder,IList<XpoUrlObject> objects ,string keyName, Func<XpoUrlColor, object> getProperty)
        {
            var max = objects.Select(x => x.Index).OrderByDescending(x => x).FirstOrDefault();
            builder.Append(keyName);
            for (var i = 0; i <= max; i++)
            {
                var colorObject = objects.LastOrDefault(x => x.Index == i);
                if (colorObject == null)
                    builder.Append(",");
                else
                {
                    builder.Append(getProperty(colorObject.Color));
                    builder.Append(",");
                }
            }
            builder.Remove(builder.Length - 1, 1);
        }
    }
}