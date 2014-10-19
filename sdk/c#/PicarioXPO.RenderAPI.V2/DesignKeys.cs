using System.Collections.Generic;
using System.Linq;
using System.Text;
using PicarioXPO.RenderAPI.V2.DesignKeyExtractors;

namespace PicarioXPO.RenderAPI.V2
{
    internal class DesignKeysCollection
    {
        internal List<DesignKey> Keys
        {
            get
            {
                return keys;
            }
        }

        private readonly List<DesignKey> keys = new List<DesignKey>
        {
            new EntityNameDesignKey(),
            new ContrastDesignKey(),
            new DropXDesignKey(),
            new DropYDesignKey(),
            new GlossDesignKey(),
            new HeightDesignKey(),
            new PlacingPointXDesignKey(),
            new PlacingPointYDesignKey(),
            new RepeatDesignKey(),
            new RotationDesignKey(),
            new WidthDesignKey(),
            new FlipDesignKey()
        };
    }


    internal static class DesignKeys
    {
        public static StringBuilder AppendDesigns(this StringBuilder stringBuilder, IEnumerable<XpoUrlObject> xpoUrlDesigns)
        {
            var xpoUrlObjects = xpoUrlDesigns as XpoUrlObject[] ?? xpoUrlDesigns.ToArray();

            if (!xpoUrlObjects.Any())
                return stringBuilder;

            var designKeys = new DesignKeysCollection();

            foreach (var designKey in designKeys.Keys)
            {
                var keyValue = designKey.GetValues(xpoUrlObjects);

                if (!string.IsNullOrEmpty(keyValue))
                {
                    stringBuilder.Append("&");
                    stringBuilder.Append(keyValue);
                }
            }
            
            return stringBuilder;
        }
    }
}