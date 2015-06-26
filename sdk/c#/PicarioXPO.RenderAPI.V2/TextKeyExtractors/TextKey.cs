using System.Collections.Generic;

namespace PicarioXPO.RenderAPI.V2.TextKeyExtractors
{
    internal abstract class TextKey : UrlKey
    {
        public abstract string GetValues(IEnumerable<XpoUrlObject> texts);
    }
}
