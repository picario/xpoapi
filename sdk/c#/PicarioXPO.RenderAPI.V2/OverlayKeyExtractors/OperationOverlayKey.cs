﻿using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.OverlayKeyExtractors
{
    internal class OperationOverlayKey : OverlayKey
    {
        public override string GetValues(IEnumerable<XpoUrlOverlay> overlays)
        {
            var xpoUrlOverlays = overlays as XpoUrlOverlay[] ?? overlays.ToArray();
            var max = xpoUrlOverlays.GetMaxOverlayNumber();

            for (var i = 0; i <= max; i++)
            {
                var urlObject = xpoUrlOverlays.FirstOrDefault(x => x.Index == i);
                if (urlObject != null)
                    AddToList(urlObject.OverlayOperation);
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.oo=" + GetUrlValue();
        }
    }
}