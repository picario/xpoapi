﻿using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.TextKeyExtractors
{
    internal class TextTextKey : TextKey
    {
        public override string GetValues(IEnumerable<XpoUrlObject> texts)
        {
            var xpoUrlObjects = texts as XpoUrlObject[] ?? texts.ToArray();
            var max = xpoUrlObjects.GetMaxObjectNumber();

            for (var i = 0; i <= max; i++)
            {
                var urlObject = xpoUrlObjects.FirstOrDefault(x => x.Index == i);
                if (urlObject != null)
                    AddToList(urlObject.Text.Text, false);
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.text=" + GetUrlValue();
        }
    }
}
