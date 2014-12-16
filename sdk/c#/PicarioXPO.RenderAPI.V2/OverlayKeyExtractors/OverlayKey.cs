using System.Collections.Generic;

namespace PicarioXPO.RenderAPI.V2.OverlayKeyExtractors
{
    internal abstract class OverlayKey : UrlKey
    {
        public abstract string GetValues(IEnumerable<XpoUrlOverlay> overlays);
    }
}
