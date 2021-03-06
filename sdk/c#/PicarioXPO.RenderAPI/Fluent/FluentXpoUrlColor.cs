﻿using PicarioXPO.RenderAPI.FluentInterface;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Used by FluentXPOUrlGenerator for object configuration
    /// </summary>
    public sealed class FluentXpoUrlColor : IFluentInterface
    {
        /// <summary>
        /// Returns the wrapped XpoUrlColor
        /// </summary>
        public XpoUrlColor XpoUrlColor { get; private set; }

        /// <summary>
        /// Creates a new instance of the FluentXpoUrlDesign
        /// </summary>
        public FluentXpoUrlColor(string color)
        {
            XpoUrlColor = new XpoUrlColor {Color = color};
        }

        /// <summary>
        /// Sets the gloss of this object
        /// </summary>
        public FluentXpoUrlColor SetGloss(double gloss)
        {
            XpoUrlColor.Gloss = gloss;

            return this;
        }
    }
}
