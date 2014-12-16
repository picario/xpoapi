using System.Collections.Generic;

namespace PicarioXPO.RenderAPI.V2.DesignKeyExtractors
{
    internal abstract class DesignKey : UrlKey
    {
        public abstract string GetValues(IEnumerable<XpoUrlObject> designs);
    }
}
