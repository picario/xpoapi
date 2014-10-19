using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace PicarioXPO.RenderAPI.V2.DesignKeyExtractors
{
    internal class EntityNameDesignKey : DesignKey
    {
        public override string GetValues(IEnumerable<XpoUrlObject> designs)
        {
            var xpoUrlObjects = designs as XpoUrlObject[] ?? designs.ToArray();
            var max = xpoUrlObjects.GetMaxObjectNumber();
            
            for (var i = 0; i <= max; i++)
            {
                var urlObject = xpoUrlObjects.FirstOrDefault(x => x.Index == i);
                if (urlObject != null && !string.IsNullOrEmpty(urlObject.Design.EntityName))
                    AddToList(ConvertToBase64UrlString(urlObject.Design.EntityName));
                else if (i != max)
                    AddEmpty();
            }

            if (IsEmpty()) return "";

            return "p.tn=" + GetUrlValue();
        }

        private static string ConvertToBase64UrlString(string value)
        {
            return HttpUtility.UrlEncode(Convert.ToBase64String(Encoding.UTF8.GetBytes(value)));
        }
    }
}
