using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace PicarioXPO.RenderAPI.V2.OverlayKeyExtractors
{
    internal class NameOverlayKey : OverlayKey
    {
        public override string GetValues(IEnumerable<XpoUrlOverlay> overlays)
        {
            var urlOverlays = overlays as XpoUrlOverlay[] ?? overlays.ToArray();
            var max = urlOverlays.GetMaxOverlayNumber();

            for (var i = 0; i <= max; i++)
            {
                var urlOverlay = urlOverlays.FirstOrDefault(x => x.Index == i);
                if (urlOverlay != null && !string.IsNullOrEmpty(urlOverlay.OverlayName))
                    AddToList(ConvertToBase64UrlString(urlOverlay.OverlayName));
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.on=" + GetUrlValue();
        }

        private static string ConvertToBase64UrlString(string value)
        {
            return HttpUtility.UrlEncode(Convert.ToBase64String(Encoding.UTF8.GetBytes(value)));
        }
    }
}
