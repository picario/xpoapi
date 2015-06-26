using System.Collections.Generic;
using System.Linq;
using System.Text;
using PicarioXPO.RenderAPI.V2.TextKeyExtractors;

namespace PicarioXPO.RenderAPI.V2
{
    internal class TextKeysCollection
    {
        internal List<TextKey> Keys
        {
            get
            {
                return keys;
            }
        }

        private readonly List<TextKey> keys = new List<TextKey>
        {
            new TextTextKey(),
            new TextFontTextKey(),
            new TextColorTextKey(),
            new TextSizeTextKey(),
            new TextAlignmentTextKey(),
            new TextStyleTextKey(),
            new TextPlacingPointXTextKey(),
            new TextPlacingPointYTextKey(),
            new TextMultiplierTextKey(),
            new TextRotationTextKey()
        };
    }


    internal static class TextKeys
    {
        public static StringBuilder AppendTexts(this StringBuilder stringBuilder, IEnumerable<XpoUrlObject> xpoUrlTexts)
        {
            var xpoUrlObjects = xpoUrlTexts as XpoUrlObject[] ?? xpoUrlTexts.ToArray();

            if (!xpoUrlObjects.Any())
                return stringBuilder;

            var textKeys = new TextKeysCollection();

            foreach (var textKey in textKeys.Keys)
            {
                var keyValue = textKey.GetValues(xpoUrlObjects);

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
