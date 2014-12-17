using PicarioXPO.RenderAPI.FluentInterface;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Used by FluentXPOUrlGenerator for overlay configuration
    /// </summary>
    public sealed class FluentXpoUrlOverlay : IFluentInterface
    {
        /// <summary>
        /// Returns the wrapped XpoObject
        /// </summary>
        public XpoUrlOverlay XpoUrlOverlay
        {
            get
            {
                return xpoUrlOverlay;
            }
        }

        private readonly XpoUrlOverlay xpoUrlOverlay;

        /// <summary>
        /// Creates a new instance of the FluentXpoObject
        /// </summary>
        public FluentXpoUrlOverlay()
        {
            xpoUrlOverlay = new XpoUrlOverlay();
        }

        /// <summary>
        /// Creates a new instance of the FluentXpoObject
        /// </summary>
        public FluentXpoUrlOverlay(string name)
        {
            xpoUrlOverlay = new XpoUrlOverlay { OverlayName = name };
        }

        /// <summary>
        /// Sets the index for this object
        /// </summary>
        public FluentXpoUrlOverlay SetIndex(int index)
        {
            xpoUrlOverlay.Index = index;

            return this;
        }

        /// <summary>
        /// Sets the location for this object
        /// </summary>
        public FluentXpoUrlOverlay SetLocation(XpoUrlOverlayLocation location)
        {
            xpoUrlOverlay.OverlayLocation = location;

            return this;
        }

        /// <summary>
        /// Sets the mode for this object
        /// </summary>
        public FluentXpoUrlOverlay SetMode(XpoUrlOverlayModes mode)
        {
            xpoUrlOverlay.OverlayMode = mode;

            return this;
        }

        /// <summary>
        /// Sets the name for this object
        /// </summary>
        public FluentXpoUrlOverlay SetName(string name)
        {
            xpoUrlOverlay.OverlayName = name;

            return this;
        }

        /// <summary>
        /// Sets the name for this object
        /// </summary>
        public FluentXpoUrlOverlay SetOperation(XpoUrlOverlayOperations operation)
        {
            xpoUrlOverlay.OverlayOperation = operation;

            return this;
        }

        /// <summary>
        /// Sets the time for this object
        /// </summary>
        public FluentXpoUrlOverlay SetTime(XpoUrlOverlayTimes time)
        {
            xpoUrlOverlay.OverlayTime = time;

            return this;
        }
    }
}