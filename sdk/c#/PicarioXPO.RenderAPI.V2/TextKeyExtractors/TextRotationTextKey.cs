using System;
using System.Collections.Generic;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.TextKeyExtractors
{
    internal class TextRotationTextKey : TextKey
    {
        public override string GetValues(IEnumerable<XpoUrlObject> texts)
        {
            var xpoUrlObjects = texts as XpoUrlObject[] ?? texts.ToArray();
            if(xpoUrlObjects.Any(x => x.Text.Rotation != 0))
                throw new NotImplementedException();

            return "";
        }
    }
}
