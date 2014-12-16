using System.Collections.Generic;
using System.Linq;
using System.Text;
using PicarioXPO.RenderAPI.V2.OverlayKeyExtractors;

namespace PicarioXPO.RenderAPI.V2
{
    internal class OverlayKeysCollection
    {
        internal List<OverlayKey> Keys
        {
            get
            {
                return keys;
            }
        }

        private readonly List<OverlayKey> keys = new List<OverlayKey>
        {
            new NameOverlayKey(),
            new ModeOverlayKey(),
            new LocationOverlayKey(),
            new OperationOverlayKey(),
            new TimeOverlayKey()
        };
    }


    internal static class OverlayKeys
    {
        public static StringBuilder AppendOverlays(this StringBuilder stringBuilder, IEnumerable<XpoUrlOverlay> urlOverlays)
        {
            var xpoUrlOverlays = urlOverlays as XpoUrlOverlay[] ?? urlOverlays.ToArray();

            if (!xpoUrlOverlays.Any())
                return stringBuilder;

            var overlayKeys = new OverlayKeysCollection();

            foreach (var overlayKey in overlayKeys.Keys)
            {
                var keyValue = overlayKey.GetValues(xpoUrlOverlays);

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