using PicarioXPO.RenderAPI.FluentInterface;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Used by FluentXPOUrlGenerator for object configuration
    /// </summary>
    public sealed class FluentXpoUrlObject : IFluentInterface
    {
        /// <summary>
        /// Returns the wrapped XpoObject
        /// </summary>
        public XpoUrlObject XpoObject
        {
            get
            {
                return xpoObject;
            }
        }

        private XpoUrlObject xpoObject;

        /// <summary>
        /// Creates a new instance of the FluentXpoObject
        /// </summary>
        public FluentXpoUrlObject()
        {
            xpoObject = new XpoUrlObject();
        }

        /// <summary>
        /// Sets the index for this object
        /// </summary>
        public FluentXpoUrlObject SetIndex(int index)
        {
            xpoObject.Index = index;

            return this;
        }

        /// <summary>
        /// Specifies object as design
        /// </summary>
        public FluentXpoUrlDesign Design(string fileName)
        {
            xpoObject.ObjectType = XpoUrlObjectTypes.Design;

            var fluentXpoUrlDesign = new FluentXpoUrlDesign(fileName);

            xpoObject.Design = fluentXpoUrlDesign.XpoUrlDesign;

            return fluentXpoUrlDesign;
        }

        /// <summary>
        /// Specifies object as text
        /// </summary>
        public FluentXpoUrlText Text(string text)
        {
            var fluentXpoUrlText = new FluentXpoUrlText(text);

            xpoObject.Text = fluentXpoUrlText.XpoUrlText;

            return fluentXpoUrlText;
        }

        /// <summary>
        /// Specifies object as color
        /// </summary>
        public FluentXpoUrlColor Color(string color)
        {
            var fluentXpoUrlColor = new FluentXpoUrlColor(color);

            xpoObject.Color = fluentXpoUrlColor.XpoUrlColor;

            return fluentXpoUrlColor;
        }
    }
}