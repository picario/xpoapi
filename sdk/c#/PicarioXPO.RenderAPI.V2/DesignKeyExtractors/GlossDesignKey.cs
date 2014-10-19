using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.DesignKeyExtractors
{
    internal class GlossDesignKey : DesignKey
    {
        public override string GetValues(IEnumerable<XpoUrlObject> designs)
        {
            var xpoUrlObjects = designs as XpoUrlObject[] ?? designs.ToArray();
            var max = xpoUrlObjects.GetMaxObjectNumber();
            
            for (var i = 0; i <= max; i++)
            {
                var urlObject = xpoUrlObjects.FirstOrDefault(x => x.Index == i);
                if (urlObject != null)
                    AddToList(urlObject.Design.Gloss);
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.tg=" + GetUrlValue();
        }
    }
}
