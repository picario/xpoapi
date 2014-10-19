using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2
{
    internal static class XpoUrlObjectExtensions
    {
        internal static int GetMaxObjectNumber(this IEnumerable<XpoUrlObject> xpoUrlObjects)
        {
            return xpoUrlObjects.Max(x => x.Index);
        }
    }
}
