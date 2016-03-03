using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.OverlayKeyExtractors
{
    internal class LocationOverlayKey : OverlayKey
    {
        public override string GetValues(IEnumerable<XpoUrlOverlay> overlays)
        {
            var xpoUrlOverlays = overlays as XpoUrlOverlay[] ?? overlays.ToArray();
            var max = xpoUrlOverlays.GetMaxOverlayNumber();

            for (var i = 0; i <= max; i++)
            {
                var urlObject = xpoUrlOverlays.LastOrDefault(x => x.Index == i);
                if (urlObject != null)
                    AddToList(urlObject.OverlayLocation);
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.ol=" + GetUrlValue();
        }
    }
}
